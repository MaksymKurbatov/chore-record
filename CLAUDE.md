# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

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

## Environment

`.env` file at `app-record/server/` (where `prisma.config.ts` reads it):

```
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=your_secret_here
```

## Architecture

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
