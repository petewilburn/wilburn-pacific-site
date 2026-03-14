# Portfolio Builder Project Summary

## Overview

Portfolio Builder is a portfolio and lead-generation website for Wilburn Pacific, an industrial engineering business focused on crane design, modernization, fabrication, and field service work. In its current form, the deployed app is best understood as a static React site hosted through Azure Static Web Apps, with a single Azure Function handling contact form delivery.

The repository still contains an older Express, Drizzle, and PostgreSQL implementation path, but that stack has now been quarantined under `legacy/` because it does not appear to power the currently deployed experience. Most page content is now embedded directly in the frontend, while the contact flow routes through the serverless `api/contact` function.

## Goals

- Present Wilburn Pacific's services and project work in a modern portfolio format.
- Capture new business inquiries through a contact workflow.
- Support a clean Azure Static Web Apps deployment path with serverless contact handling.
- Leave room for cloud deployment through Azure Static Web Apps and Azure Functions.

## Current Architecture

### Frontend

The frontend lives under `client/src` and is built with React, TypeScript, and Vite. Routing is handled on the client with Wouter. The UI is styled with Tailwind CSS and a shadcn/ui component setup built on top of Radix UI primitives.

Primary frontend responsibilities:

- Render the marketing pages and navigation shell.
- Display services and projects from static in-file content.
- Animate key sections with Framer Motion.
- Submit contact requests.

Core frontend entry points:

- `client/src/main.tsx`
- `client/src/App.tsx`
- `client/src/pages/Home.tsx`
- `client/src/pages/Contact.tsx`

### Deployed Backend Surface

The only clearly active backend surface in the deployed app is the Azure Function under `api/contact`.

Current deployed backend responsibilities:

- Accept contact payloads.
- Route emergency requests differently from standard inquiries.
- Send email using Azure Communication Services Email.

Supporting files:

- `api/contact/index.js`
- `api/contact/function.json`
- `api/host.json`

### Legacy Or Local-Only Backend Path

The repository still contains an Express 5 backend under `legacy/server`, plus archived Drizzle and PostgreSQL configuration under `legacy/`. That path has been quarantined from the active app surface and is not part of the current Azure Static Web Apps deployment model.

Legacy or local-only backend responsibilities:

- Expose service, project, and inquiry endpoints.
- Seed database records when local tables are empty.
- Serve the frontend in a Node-hosted deployment model.

Core files in that path:

- `legacy/server/index.ts`
- `legacy/server/routes.ts`
- `legacy/server/storage.ts`
- `legacy/server/db.ts`
- `legacy/server/static.ts`
- `legacy/server/vite.ts`

### Shared Code

The project still uses shared TypeScript modules under `shared`, but their current role is mixed.

- `shared/types.ts` now provides frontend-safe shared types for active components.
- `legacy/shared/schema.ts` and `legacy/shared/routes.ts` preserve the older Express-backed contract and database schema.

This shared layer now looks partly transitional: some pieces are still useful, while others mainly support backend code that is no longer part of the deployed app.

### Database And ORM Status

PostgreSQL and Drizzle ORM are still preserved in the repository archive, but they do not appear to back the current deployed UI.

Configured tables:

- `services`
- `projects`
- `inquiries`

Current status:

- `DATABASE_URL` is still expected by the archived legacy server path.
- Drizzle is still used by the Express storage layer.
- The current frontend pages do not fetch services or projects from this database.

### Deployment Model

The current deployment path is aligned with Azure Static Web Apps:

- the frontend is built to static assets through Vite
- the `api` folder is deployed as Azure Functions
- SPA routing is handled through `client/public/staticwebapp.config.json`

The Express backend is not part of that deployment flow.

## Tools and Frameworks Used

### Core Runtime and Language

- Node.js
- TypeScript
- JavaScript

### Actively Used In The Current App

- React 18
- Vite
- Wouter
- Tailwind CSS
- Framer Motion
- Lucide React
- React Hook Form
- TanStack React Query
- Azure Functions
- Azure Communication Services Email
- Azure Static Web Apps configuration

### UI Component System

- shadcn/ui
- Radix UI
- class-variance-authority
- clsx
- tailwind-merge

### Present In The Repository, But Not Central To The Current Deployment

- Express 5
- Drizzle ORM
- PostgreSQL
- Zod

These technologies remain preserved in the archived legacy implementation under `legacy/`, but they are no longer part of the active root toolchain.

### Developer Tooling

- PostCSS
- Autoprefixer
- GitHub Actions
- GitHub CLI

## Project Structure

```text
client/       Frontend app built with React and Vite
legacy/       Quarantined archive of the former Express/Drizzle backend path
shared/       Active frontend-safe shared types
api/          Azure Function for contact email processing
docs/         Project documentation
attached_assets/  Input/reference assets used during design and build
```

## Notable Implementation Details

- The frontend uses a polished industrial visual direction with animation and custom sections rather than a plain starter template.
- Services and project content are currently embedded directly in the frontend pages rather than loaded from a live backend.
- The contact workflow is serverless and routes through Azure Functions.
- The former Express/Drizzle/Postgres stack has been quarantined under `legacy/` rather than deleted outright.
- Static Web App routing support is already configured through `client/public/staticwebapp.config.json`.

## Current State Versus Legacy Components

Clearly active today:

- Static frontend pages rendered from `client/src`.
- Azure Function contact handling at `/api/contact`.
- Azure Static Web Apps deployment workflow.
- Frontend-safe shared types in `shared/types.ts`.

Likely legacy or local-only:

- Archived Express server under `legacy/server/`.
- Archived Drizzle and PostgreSQL configuration under `legacy/`.
- Archived shared route contracts under `legacy/shared/`.
- Archived unused React Query hooks under `legacy/client/src/hooks/use-wilburn.ts`.

This split likely reflects the project's earlier Replit-based full-stack origin before the site was reshaped into its current static-plus-serverless form. The quarantine keeps that history accessible without leaving it in the active application surface.

## Environment and Configuration

Known environment requirements include:

- `ACS_CONNECTION_STRING` for Azure Communication Services Email.
- `SENDER_ADDRESS` for outbound email sending.

Legacy or optional local-only requirements:

- `DATABASE_URL` for the archived PostgreSQL-backed implementation.
- `PORT` for the archived Express server, defaulting to `5000`.

## How the App Runs Today

Current deployment-oriented flow:

- `npm run build` builds the Vite frontend.
- Azure Static Web Apps deploys the built frontend and the `api` folder.

Local or legacy backend flow still present in the repo:

- `npm run check` runs the TypeScript compiler.

The archived backend code remains under `legacy/`, but it is no longer part of the default root scripts.

## Summary

This project is currently best described as a static marketing and inquiry platform built around a React frontend and a serverless Azure contact function. The older Express, Drizzle, and PostgreSQL backend path has now been quarantined under `legacy/`, preserving the prior implementation without keeping it wired into the active codebase.