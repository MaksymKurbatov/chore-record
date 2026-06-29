# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

```
Chore-record/
├── prisma/
│   └── schema.prisma        # Database schema (PostgreSQL)
├── prisma.config.ts         # Prisma configuration (reads DATABASE_URL)
├── package.json             # Root — only contains prisma dev dependency
├── app-record/
│   └── server/              # NestJS backend
│       └── src/
│           ├── main.ts      # Entry point — port 4200, global prefix /api, CORS enabled
│           ├── app.module.ts
│           ├── app.controller.ts
│           └── app.service.ts
└── generated/
    └── prisma/              # Generated Prisma client (gitignored)
```

## Commands

All server commands run from `app-record/server/`:

```bash
npm run start:dev     # development with watch mode
npm run start:prod    # production (requires build first)
npm run build         # compile TypeScript
npm run lint          # lint and auto-fix
npm run test          # unit tests (*.spec.ts in src/)
npm run test:e2e      # e2e tests
npm run test:cov      # coverage report
```

Prisma commands run from the **root** (where `prisma.config.ts` lives):

```bash
npx prisma generate       # regenerate client after schema changes
npx prisma migrate dev    # create and apply a migration
npx prisma studio         # GUI to inspect the database
```

## Environment

Requires a `.env` file at the project root with:

```
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

## Architecture

The backend is a **NestJS 11** app using the standard module/controller/service pattern. It serves all routes under the `/api` prefix.

**Database**: PostgreSQL accessed via **Prisma** (schema-first). The Prisma schema lives at the repo root (`prisma/schema.prisma`), separate from the NestJS server. The generated client outputs to `generated/prisma/` (root-relative). When adding new models or changing the schema, always run `npx prisma generate` from the root before working in the server.

Current schema has a single `User` model with cuid-based IDs, unique email and name, and optional avatar/phone fields.
