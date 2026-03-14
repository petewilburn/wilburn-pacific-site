# Deployment Monitoring

## Scope

This runbook covers post-push monitoring for the public repository and production site:

- Repository: `petewilburn/wilburn-pacific-site`
- Production URL: `https://www.wilburnpacific.com`
- Workflow: `Azure Static Web Apps CI/CD`

## What Runs After A Push

The workflow file is:

- `.github/workflows/azure-static-web-apps-wonderful-sea-0add7801e.yml`

On pushes to `main`, GitHub Actions runs the `Build and Deploy Job`, which:

- checks out the repository
- builds the static frontend from the repo root
- deploys the frontend artifact from `dist`
- deploys the Azure Functions API from `api`

The workflow now ignores `docs/**` and `legacy/**` changes so documentation or archived-code-only commits do not trigger a deployment.

## VS Code Monitoring

Recommended extensions already installed:

- `GitHub Actions`
- `GitHub Pull Requests`

After pushing:

1. Open the `GitHub Actions` view in VS Code.
2. Find the latest run for `Azure Static Web Apps CI/CD`.
3. Open `Build and Deploy Job`.
4. Inspect the `Build And Deploy` step for the full Oryx and deployment logs.

You can also use `GitHub Pull Requests` to watch status checks on the branch or pull request.

## GitHub CLI Setup

GitHub CLI is installed on this machine. Authenticate with the following command if needed on a new machine or shell profile.

Recommended login command:

```powershell
gh auth login --hostname github.com --web --git-protocol https
```

What to choose during login:

1. `GitHub.com`
2. `HTTPS`
3. `Login with a web browser`

After login, verify with:

```powershell
gh auth status
```

Current local status at the time of writing: authenticated as `petewilburn` against `github.com` with `repo` and `workflow` scopes.

## GitHub CLI Monitoring Commands

List recent runs for this workflow:

```powershell
gh run list -R petewilburn/wilburn-pacific-site --workflow "Azure Static Web Apps CI/CD" --limit 5
```

Watch the latest run interactively:

```powershell
gh run watch -R petewilburn/wilburn-pacific-site <run-id>
```

Open detailed logs for a run:

```powershell
gh run view -R petewilburn/wilburn-pacific-site <run-id> --log
```

Get structured run details:

```powershell
gh run view -R petewilburn/wilburn-pacific-site <run-id> --json status,conclusion,url,jobs,headBranch,headSha,displayTitle
```

## Fast Post-Push Flow

```powershell
git push
gh run list -R petewilburn/wilburn-pacific-site --workflow "Azure Static Web Apps CI/CD" --limit 1
gh run watch -R petewilburn/wilburn-pacific-site <run-id>
```

## What Success Looks Like

- The workflow run finishes with a green check.
- `Build and Deploy Job` completes successfully.
- The production site updates shortly afterward at `https://www.wilburnpacific.com`.

## What Failure Usually Means

Most likely failure categories for this repository:

- missing or invalid `AZURE_STATIC_WEB_APPS_API_TOKEN_WONDERFUL_SEA_0ADD7801E`
- incorrect `app_location`, `api_location`, or `output_location`
- Azure Functions packaging or runtime issues under `api/contact`
- npm install or build errors surfaced by the Azure Static Web Apps Oryx build process

## First Places To Check When A Run Fails

1. The `Build And Deploy` step log in the GitHub Actions run.
2. The repository Actions tab for the latest failed run.
3. The Azure Static Web App deployment logs in the Azure portal if GitHub shows only partial detail.

## Notes

- The workflow uses `actions/checkout@v4`.
- Concurrency is enabled so older in-progress runs on the same ref are cancelled when newer pushes arrive.
- The root `package.json` now pins `node` to `20.x`, which helps keep Azure build behavior more predictable.