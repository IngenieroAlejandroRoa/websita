#!/bin/bash

# Auto-deploy script for Alejandro Roa Portfolio
# This script rebuilds and restarts the Docker container

set -e

echo "🚀 Starting auto-deploy..."

# Stop and remove existing container
echo "⏹️  Stopping existing container..."
docker-compose down 2>/dev/null || true

# Remove old images to force rebuild
echo "🗑️  Cleaning old images..."
docker-compose rm -f 2>/dev/null || true

# Build and start new container
echo "🔨 Building new image..."
docker-compose build --no-cache

echo "▶️  Starting container..."
docker-compose up -d

# Show status
echo "✅ Deploy completed!"
echo ""
docker-compose ps

# Show logs
echo ""
echo "📋 Recent logs:"
docker-compose logs --tail=20
