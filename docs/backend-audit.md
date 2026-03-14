# Backend Audit

## Objective

This audit identifies which backend-related files are actively used by the current application, which are only available for local development, and which appear to be legacy artifacts from an earlier full-stack version of the project.

## Executive Summary

The current deployed architecture is best described as:

- static React frontend deployed through Azure Static Web Apps
- one active serverless endpoint at `api/contact`
- legacy Express, Drizzle, and PostgreSQL code still present in the repository

The Express backend is still runnable locally through `npm run dev`, but it is not part of the current Azure Static Web Apps deployment path. The Drizzle/PostgreSQL stack is not feeding the current UI, and the only clearly active deployed backend behavior is the Azure Function used by the contact form.

## Audit Method

The audit was based on:

- client-side import and usage tracing
- API call tracing from the current pages and hooks
- build and deployment script review
- backend import graph review

## Key Findings

### 1. The deployed app does not ship the Express server

The Azure deployment workflow uploads the frontend plus the `api` folder, which means Azure Static Web Apps and Azure Functions are the current deployment surface.

Evidence:

- `.github/workflows/azure-static-web-apps-wonderful-sea-0add7801e.yml` sets `app_location: "/"`, `api_location: "api"`, and `output_location: "dist"`.
- No workflow step builds or deploys the Express server from `server/`.

### 2. The only active client-to-backend call in the current app is the contact function

The contact page posts to `/api/contact`, which matches the Azure Function.

Evidence:

- `client/src/pages/Contact.tsx` posts to `/api/contact`.
- `api/contact/function.json` defines an HTTP POST trigger.
- `api/contact/index.js` handles email delivery through Azure Communication Services Email.

### 3. Services and projects are currently static in the frontend

The user-facing pages that display services and projects are populated from local arrays, not from the Express API.

Evidence:

- `client/src/pages/Home.tsx` contains inline `services` and `projects` arrays.
- `client/src/pages/Services.tsx` contains an inline `services` array.
- `client/src/pages/Projects.tsx` contains an inline `projects` array.

### 4. The React Query backend hooks are currently dead code

The repository still contains hooks for `/api/services`, `/api/projects`, and `/api/inquiries`, but they are not imported anywhere in the current client.

Evidence:

- `client/src/hooks/use-wilburn.ts` defines `useServices`, `useProjects`, `useProject`, and `useCreateInquiry`.
- No client files import `use-wilburn.ts`.

### 5. The server build path is present, but not wired into the default build or deployment flow

There is a server bundling script that outputs `dist/index.cjs`, and `npm start` expects that file. However, the root `build` script only runs `vite build`.

Evidence:

- `package.json` has `build: "vite build"`.
- `package.json` has `start: "NODE_ENV=production node dist/index.cjs"`.
- `script/build.ts` bundles `server/index.ts` to `dist/index.cjs`.
- Nothing in `package.json` invokes `script/build.ts`.

This means the production Express path exists conceptually, but it is not consistently wired as part of the normal build process.

## Classification Matrix

### Active In Current Deployed App

#### `api/contact/index.js`

Status: Active

Reason:

- Handles the current contact submission path.
- Sends email through Azure Communication Services.

#### `api/contact/function.json`

Status: Active

Reason:

- Defines the HTTP trigger for `/api/contact`.

#### `api/host.json`

Status: Active

Reason:

- Azure Functions host configuration for the deployed function app surface.

#### `client/src/pages/Contact.tsx`

Status: Active

Reason:

- Posts directly to the serverless contact endpoint.

#### `client/public/staticwebapp.config.json`

Status: Active

Reason:

- Supports SPA routing and MIME handling for Azure Static Web Apps.

#### `.github/workflows/azure-static-web-apps-wonderful-sea-0add7801e.yml`

Status: Active

Reason:

- Defines the actual deployment path used by the repository.

### Used In Current Frontend, But Only As Shared Types

#### `shared/schema.ts`

Status: Partially active

Reason:

- Backend table definitions are not used by the deployed app.
- Frontend components still import `Service` and `Project` types from this file.

Evidence:

- `client/src/components/ProjectCard.tsx`
- `client/src/components/ServiceCard.tsx`

Assessment:

- Not fully dead.
- Over-scoped for its current role because client components only need lightweight domain types, not the full Drizzle table schema source.

### Runnable Locally, But Not Used In Current Deployment

#### `server/index.ts`

Status: Local/dev only

Reason:

- Started by `npm run dev`.
- Not deployed by the Azure Static Web Apps workflow.

#### `server/routes.ts`

Status: Local/dev only

Reason:

- Provides Express API routes for services, projects, and inquiries.
- Those routes are not used by the current deployed frontend.

#### `server/storage.ts`

Status: Local/dev only

Reason:

- Used by Express routes for database reads and inquiry creation.
- Not used by the deployed frontend path.

#### `server/db.ts`

Status: Local/dev only

Reason:

- Required by the Express storage layer.
- Not part of the current Azure deployment path.

#### `server/static.ts`

Status: Local/dev only

Reason:

- Used by the Express server to serve built frontend files in a Node-hosted deployment model.
- Not part of the Static Web Apps deployment flow.

#### `server/vite.ts`

Status: Local/dev only

Reason:

- Provides Vite middleware integration for the Express development path.

### Likely Legacy Or Orphaned Artifacts

#### `client/src/hooks/use-wilburn.ts`

Status: Unused

Reason:

- Defines data hooks for Express-backed endpoints.
- Not imported anywhere in the current client.

#### `shared/routes.ts`

Status: Mostly legacy

Reason:

- Used by `server/routes.ts` and `client/src/hooks/use-wilburn.ts`.
- Since `use-wilburn.ts` is unused and the Express server is not deployed, this contract layer is currently inactive in the deployed app.

#### `drizzle.config.ts`

Status: Legacy or optional local-only artifact

Reason:

- Supports a database workflow that is not part of the deployed app.
- Still usable if the team chooses to revive the Postgres-backed server path.

#### `package.json` backend scripts and dependencies

Status: Mixed; several are likely legacy

Reason:

- `dev`, `start`, and `db:push` support a Node/Express/Postgres model.
- The current Azure deployment path does not require them.

#### `script/build.ts`

Status: Orphaned implementation path

Reason:

- Builds a production Express bundle.
- Not referenced by default scripts or the Azure deployment workflow.

## Backend Dependency Assessment

The following backend-oriented packages appear to support the legacy or local-only backend path rather than the currently deployed app:

- `express`
- `drizzle-orm`
- `drizzle-zod`
- `drizzle-kit`
- `pg`
- `express-session`
- `connect-pg-simple`
- `passport`
- `passport-local`
- `memorystore`

Not all of these are guaranteed removable without cleanup work, because some remain in type or script paths, but they are not required for the current static-plus-function deployment shape.

## Recommended Actions

### Immediate

- Update project documentation to describe the app as a static Azure Static Web App with a serverless contact function.
- Mark the Express/Drizzle/Postgres path as local-only or legacy.

### Near-Term

- Remove or quarantine `client/src/hooks/use-wilburn.ts`.
- Reduce `shared/schema.ts` to client-safe shared types, or split database schema from frontend type definitions.
- Decide whether the Express backend should be kept as a supported local mode or retired entirely.

### If The Team Chooses Cleanup

- Remove or archive `server/`, `drizzle.config.ts`, and the Express/Postgres build path.
- Remove backend-only dependencies from `package.json`.
- Keep only the Azure Function and frontend deployment model.

## Final Conclusion

The repository still contains a coherent Express + Drizzle + PostgreSQL backend, but it is not the backend that powers the current deployed application. In the app as it exists today, that stack is best understood as a retained local or historical implementation path, while the live architecture is a static frontend with one serverless Azure Function for contact handling.