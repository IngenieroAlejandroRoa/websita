# Auto-Deploy Configuration for Alejandro Roa Portfolio

This directory contains git hooks for automatic deployment.

## Setup on Server

Run once on your server:

```bash
./setup-server.sh
```

This will:
- Install the post-merge git hook
- Configure automatic deployment on `git pull`
- Verify Docker installation

## How It Works

After setup, when you run `git pull` on the server:

1. Git post-merge hook triggers (`post-merge`)
2. Calls `deploy.sh` in background
3. Docker rebuilds the container
4. Old container stops
5. New container starts automatically

## Files

- `post-merge` - Git hook that runs after git pull/merge
- Template for git hook installation

## Manual Deployment

If you prefer manual control:

```bash
# Disable auto-deploy
rm .git/hooks/post-merge

# Deploy manually
./deploy.sh
```
