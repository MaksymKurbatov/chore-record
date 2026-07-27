# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

This is a monorepo with two independent apps that are **not yet wired together** — the front-end has no API client and does not call the server:

- `app-record/server/` — NestJS 11 + Prisma backend (see below)
- `app-record/front/` — Expo (React Native) mobile app (see below)

## Backend (`app-record/server/`)

### Commands

All commands run from `app-record/server/`:

```bash
npm run start:dev     # development with watch mode
npm run build         # compile TypeScript
npm run lint          # lint and auto-fix
npm run test          # unit tests (*.spec.ts)
npm run test:watch    # watch mode
npm run test:e2e      # e2e tests
npm run test:cov      # coverage report
```

Prisma commands also run from `app-record/server/` (where `prisma.config.ts` lives):

```bash
npx prisma generate       # regenerate client after schema changes
npx prisma migrate dev    # create and apply a migration
npx prisma studio         # GUI to inspect the database
```

### Environment

`.env` file at `app-record/server/` (where `prisma.config.ts` reads it):

```
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=your_secret_here
```

### Architecture

**NestJS 11** backend. All routes served under `/api`. Swagger UI at `/docs`.

**Database**: PostgreSQL via **Prisma 6**. Schema at `app-record/server/prisma/schema.prisma`. Generated client outputs to `app-record/server/generated/prisma/` — always import from there, never from `@prisma/client`. Always run `npx prisma generate` after schema changes.

### Module structure

```
src/
├── prisma/          # @Global() PrismaModule — never add PrismaService to other modules' providers
├── auth/            # JWT auth (register / login / token rotation)
├── config/          # jwt.config.ts — JwtModule factory
├── user/            # user profile + favorites
├── product/         # product CRUD + search + category filter
├── category/        # category CRUD; exported so ProductModule can inject CategoryService
└── utils/           # generateSlug()
```

### PrismaModule

Marked `@Global()` — `PrismaService` is available in every module without being listed in their `providers`. New modules only need to inject it in the constructor.

### Auth module (`src/auth/`)

JWT-based auth using `@nestjs/jwt` + `passport-jwt`. Endpoints:

- `POST /api/auth/register` — creates user; name/avatar/phone are faker-generated
- `POST /api/auth/login` — returns `{ user, accessToken, refreshToken }`
- `POST /api/auth/login/access-token` — rotates tokens (requires `@Auth()` guard)

Token lifetimes: access = 1 day, refresh = 7 days. Passwords hashed with **argon2**.

> Note: `JwtStrategy` sets `ignoreExpiration: true`, so token expiry is only enforced via explicit `verifyAsync` calls (e.g. in `getNewToken`), not in the Passport guard itself.

**Decorators** (`src/auth/decorators/`):
- `@Auth()` — applies `AuthGuard('jwt')` to a route
- `@CurrentUser(field?)` — extracts the full `User` object or a specific field from `req.user`

### Select objects pattern

Each domain module has a `return-*.ts` file that defines a `Prisma.*Select` constant (e.g. `returnProductObject`, `returnUserObject`). These are passed to `select:` in Prisma queries to keep response shapes consistent. Always import from the correct module — spreading `returnProductObject` into a `UserSelect` will cause a runtime validation error.

### Slug generation

`src/utils/generate-slug.ts` — `generateSlug(text)` lowercases, strips non-alphanumeric characters, and replaces spaces with `-`. Called in `category.service.ts` and `product.service.ts` on create/update.

### Category ↔ Product dependency

`ProductModule` imports `CategoryModule` (which exports `CategoryService`) so that `ProductService` can validate `categoryId` via `CategoryService.getById()` before connecting a product to a category.

### Adding a new module

1. Create `src/<name>/<name>.module.ts` with only own providers — no `PrismaService`
2. Register it in `AppModule.imports`
3. Inject `PrismaService` directly in the service constructor
4. Add a `return-<name>-object.ts` with a `Prisma.<Name>Select` constant for consistent response shapes

## Frontend (`app-record/front/`)

> Before writing any Expo-specific code, read `app-record/front/AGENTS.md` — it points at the versioned Expo docs (v57) because Expo's APIs changed since older training data.

### Commands

All commands run from `app-record/front/`:

```bash
npm run start      # expo start (Metro bundler, choose platform interactively)
npm run android    # expo start --android
npm run ios        # expo start --ios
npm run web        # expo start --web
npm run lint       # eslint .
```

### Stack

**Expo SDK 57** (React Native 0.86, React 19). Navigation via `@react-navigation/native` + `native-stack`. UI components from `react-native-paper`. Forms via `react-hook-form`. No API/HTTP client is wired up yet — screens use local state/stubs only.

Path alias: `@/*` maps to `app-record/front/app/*` (configured in `tsconfig.json`).

### Directory structure

```
app/
├── components/screen/   # one folder per screen (Auth, Home, Search, Favorites, Explore, Profile)
├── navigation/           # stack navigator, route list, param types
├── providers/auth/       # AuthContext (user state)
├── hooks/                # useAuth, useTypedNavigation
├── theme/                # react-native-paper theme (light/dark) + ThemeContext
├── ui/                   # shared components (Field, StyledButton, Loader, bottomMenu)
└── types/                # shared interfaces (user, auth, icon)
```

### Navigation (`app/navigation/`)

- `routes.ts` — the flat list of `{ name, component }` entries (`IRoute[]`), driven by `TypeRootStackParamsList` in `navigation.type.ts`. Add a new screen by adding both a key to `TypeRootStackParamsList` and an entry to `routes`.
- `Navigation.tsx` — the root component, rendered directly from `App.tsx`. It owns a `useNavigationContainerRef<TypeRootStackParamsList>()` — **always pass the `TypeRootStackParamsList` generic explicitly**; leaving it off makes `getCurrentRoute()` resolve to `never` and breaks call sites like `.name`. The ref must also be passed to `<NavigationContainer ref={navRef}>` or navigation methods won't be attached.
- Tracks the active route name via `navRef.addListener('state', ...)` into local state, which feeds the bottom tab bar (`ui/layout/bottomMenu`).
- `PrivateNavigation.tsx` exists as an auth-gated variant of the stack (renders `Auth` screen when `user` is falsy, the full `routes` list otherwise) but is **not currently used** by `App.tsx` — `App.tsx` renders `Navigation` directly.
- `useTypedNavigation()` (`app/hooks/`) wraps `useNavigation()` with the `TypeRootStackParamsList` generic — prefer it over the untyped hook inside screens.

### Auth state (`app/providers/auth/`)

`AuthProvider` holds `user` in React state (`AuthContext`), consumed via the `useAuth()` hook. There is currently no token/session restoration logic — `user` starts `null` and nothing sets it — so anything gated on `user` (e.g. `PrivateNavigation`) stays on the logged-out branch until that's implemented.

### Refs during render (ESLint `react-hooks/refs`)

Do not read properties off `navRef` (or any nav ref) directly inside JSX/render — `useNavigationContainerRef()` exposes its methods (`.navigate`, `.getCurrentRoute`, ...) as getters over `ref.current`, and reading them during render trips the `react-hooks/refs` lint rule. Wrap the access in a callback (`useCallback`) so the ref is only read when the callback actually runs (event handler), not at render time.

### Styling

Plain `StyleSheet.create` per component (no styled-components/tailwind). `DimensionValue` percentages must be strings like `'20%'`, not bare numbers or numeric strings — e.g. the 5-item bottom menu uses `width: '20%'` per item.
