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

**Database**: PostgreSQL via **Prisma 6**. Schema at `app-record/server/prisma/schema.prisma`. Generated client outputs to `app-record/server/generated/prisma/` — always run `npx prisma generate` after schema changes before working in the server.

### Auth module (`src/auth/`)

JWT-based auth using `@nestjs/jwt` + `passport-jwt`. Endpoints:

- `POST /api/auth/register` — creates user; name/avatar/phone are faker-generated
- `POST /api/auth/login` — returns `{ user, accessToken, refreshToken }`
- `POST /api/auth/login/access-token` — rotates tokens (requires `@Auth()` guard)

Token lifetimes: access = 1 day, refresh = 7 days. Passwords hashed with **argon2**.

> Note: `JwtStrategy` sets `ignoreExpiration: true`, so token expiry is only enforced via explicit `verifyAsync` calls (e.g. in `getNewToken`), not in the Passport guard itself.

**Decorators** (`src/auth/decorators/`):
- `@Auth()` — applies `AuthGuard('jwt')` to a route
- `@CurrentUser(field?)` — extracts the full `User` object or a specific field from the request

**`PrismaService`** is a thin `PrismaClient` wrapper provided in both `AppModule` and `AuthModule`.
