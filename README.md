# Wilburn Pacific Site

Public website for Wilburn Pacific.

Live site:

- https://www.wilburnpacific.com

## Overview

This repository contains the current codebase for the Wilburn Pacific marketing site and contact workflow. The active application is a Vite-powered React frontend deployed with Azure Static Web Apps, with an Azure Function under `api/` handling contact form submissions.

The site is designed to present Wilburn Pacific's services, project work, and company information in a clean, industrial-themed portfolio format.

## Current Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui and Radix UI
- Framer Motion
- Azure Static Web Apps
- Azure Functions
- Azure Communication Services Email

## Repository Structure

```text
client/   React frontend
api/      Azure Function endpoints
shared/   Active shared frontend-safe types
legacy/   Archived backend code from an earlier full-stack version
```

## Development

Install dependencies:

```bash
npm install
```

Run the frontend locally:

```bash
npm run dev
```

Type-check the project:

```bash
npm run check
```

Build for production:

```bash
npm run build
```

## Deployment

Deployments are handled through GitHub Actions and Azure Static Web Apps. Pushes to `main` trigger the production deployment workflow.

## Notes For Collaborators

- The active app is frontend plus serverless API only.
- Older Express, Drizzle, and PostgreSQL code has been quarantined under `legacy/` for reference and is not part of the active deployment path.
- Internal or personal documentation is intentionally kept out of version control.

## Contact

For project inquiries or collaboration discussions, use the live site contact form.