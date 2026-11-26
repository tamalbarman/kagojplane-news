# The Kagojplane (দ্য কাগজপ্লেন) — Project & Git Command Guide

A single reference file for running the website locally, fetching news, managing the Admin Studio, and working with the `developer` and `master` branches.

---

## 1. Running the Website Locally

| Command | Description |
| :--- | :--- |
| `npm install` | Install all project dependencies (run once after cloning or pulling `package.json` changes). |
| `npm run dev` | Start the Astro local development server at `http://localhost:4321/` with hot reload. |
| `npx netlify dev` | Start both Astro and Netlify Functions locally (needed to test `/api/publish-post` locally). |
| `npm run build` | Build the production static site into `dist/` and verify there are no build errors. |
| `npm run preview` | Preview the production `dist/` build locally. |
| `npm run fetch:news` | Manually run `scripts/fetch-news.cjs` to fetch the latest RSS news into `src/content/news/`. |

> **Windows PowerShell tip:** If Astro telemetry throws an `EPERM` error in restricted environments, prefix the command with:
> ```powershell
> $env:ASTRO_TELEMETRY_DISABLED=1; npm run dev
> ```

---

## 2. Admin Studio (`/admin/`) Setup on Netlify

The Admin Studio at `/admin/` uses the Netlify Function `netlify/functions/publish-post.mts` (`/api/publish-post`) to publish posts directly to GitHub.

Set these **Environment Variables** in **Netlify Dashboard → Site configuration → Environment variables** (scope: **Functions**):

| Variable | Required | Description |
| :--- | :---: | :--- |
| `ADMIN_PASSWORD` | Yes | Password used to log in to `/admin/`. |
| `GITHUB_TOKEN` | Yes | GitHub Personal Access Token with **Contents: Read & Write** permission on `tamalbarman/kagojplane-news`. |
| `GITHUB_BRANCH` | No | Target branch for published posts (defaults to `master`). |
| `GITHUB_REPO` | No | Target GitHub repo (defaults to `tamalbarman/kagojplane-news`). |

---

## 3. Git Branching Workflow (`developer` & `master`)

- **`master`**: Production-ready branch (auto-deployed by Netlify & updated by the automated news fetcher).
- **`developer`**: Active development branch where all new features, UI tweaks, and fixes are built and tested.

### A. Daily Work on `developer`
```powershell
# 1. Switch to developer and pull latest changes
git checkout developer
git pull origin developer

# 2. Check which files were modified
git status

# 3. Stage, commit, and push your changes
git add .
git commit -m "Describe your change clearly"
git push origin developer
```

### B. Sync `developer` with Latest `master` (Auto-Fetched News)
Because the GitHub Actions news bot commits fresh articles to `master`, sync `developer` with `master` before starting new work:
```powershell
git checkout developer
git fetch origin
git merge origin/master
git push origin developer
```

### C. Merge `developer` into `master` (Release to Production)
When your changes on `developer` are tested (`npm run build` passes) and ready for live production:
```powershell
# 1. Switch to master and pull latest production commits
git checkout master
git pull origin master

# 2. Merge developer into master
git merge developer --no-ff -m "Release: merge developer into master"

# 3. Push master to trigger Netlify production deploy
git push origin master

# 4. Switch back to developer for your next task
git checkout developer
```

### D. Useful Git Inspection & Recovery Commands
```powershell
# View current branch and uncommitted changes
git status

# View recent commit history
git log -n 10 --oneline

# Discard uncommitted edits in a specific file
git checkout -- path/to/file

# Temporarily save uncommitted work before switching branches
git stash
git stash pop
```
