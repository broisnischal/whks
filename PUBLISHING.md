# Publishing Guide

## How the Release Workflow Works

The release workflow (`.github/workflows/release.yml`) uses `sxzz/workflows` which automatically:
1. Detects version changes from git tags
2. Builds the package
3. Publishes to npm
4. Creates GitHub releases

## Why Release Didn't Run

The release workflow **only triggers when you push a git tag** that matches `v*` (e.g., `v0.0.1`). It does NOT run on regular commits or pushes.

## How to Publish

### Prerequisites

1. **NPM Token Setup**: You need to add an NPM token to GitHub Secrets:
   - Go to your GitHub repository → Settings → Secrets and variables → Actions
   - Add a new secret named `NPM_TOKEN` with your npm access token
   - To get an npm token: `npm login` then `npm token create --read-only=false`

2. **Build the package** (optional, will auto-build):
   ```bash
   pnpm run build
   ```

### Publishing Steps

1. **Update the version** in `packages/whks/package.json`:
   ```json
   "version": "0.0.1"
   ```

2. **Commit and push your changes**:
   ```bash
   git add .
   git commit -m "chore: prepare for release v0.0.1"
   git push origin main
   ```

3. **Create and push a git tag**:
   ```bash
   git tag v0.0.1
   git push origin v0.0.1
   ```

4. **The release workflow will automatically**:
   - Trigger on the tag push
   - Build the package
   - Publish to npm
   - Create a GitHub release

### Verify Publishing

- Check GitHub Actions: https://github.com/broisnischal/whks/actions
- Check npm: https://www.npmjs.com/package/whks

## Manual Publishing (Alternative)

If you want to publish manually without using the workflow:

```bash
cd packages/whks
pnpm run build
pnpm publish --access public
```

## Version Bumping

For future releases, update the version following [Semantic Versioning](https://semver.org/):
- **Patch** (0.0.1 → 0.0.2): Bug fixes
- **Minor** (0.0.1 → 0.1.0): New features, backward compatible
- **Major** (0.0.1 → 1.0.0): Breaking changes

Then follow the same tag and push process.

