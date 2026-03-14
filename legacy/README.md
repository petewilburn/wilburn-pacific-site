# Legacy Archive

This folder contains the pre-quarantine full-stack implementation path that came from the earlier Express, Drizzle, and PostgreSQL version of the project.

Archived contents:

- `legacy/server/` contains the Express server path.
- `legacy/shared/` contains the older shared schema and route contract files.
- `legacy/script/` contains the old server build script.
- `legacy/drizzle.config.ts` contains the archived Drizzle configuration.
- `legacy/client/src/hooks/use-wilburn.ts` contains the unused React Query hooks that targeted the archived Express API.

This code is intentionally not part of the active frontend build, TypeScript check, or deployment flow.

Reason for quarantine:

- The current app is deployed as a static frontend plus Azure Function contact endpoint.
- The Express, Drizzle, and PostgreSQL path was retained in the repository but was no longer part of the deployed architecture.
- Quarantining preserves the prior implementation while reducing confusion in the active codebase.

If this backend path ever needs to be restored, treat it as an archived snapshot and re-validate all scripts, imports, environment variables, and deployment assumptions before reuse.