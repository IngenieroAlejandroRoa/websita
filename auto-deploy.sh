#!/bin/bash
# Auto-deploy script for LXC server
# Run this after git pull on your server

set -e

echo "🚀 Starting auto-deploy..."

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin main

# Stop and remove existing containers
echo "🛑 Stopping existing containers..."
docker-compose down || true

# Rebuild and start
echo "🔨 Building and starting containers..."
docker-compose up -d --build

# Show logs
echo "📋 Container logs:"
docker-compose logs --tail=50

echo "✅ Deploy complete! Website available at http://localhost:8080"
