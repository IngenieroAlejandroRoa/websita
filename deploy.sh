#!/bin/bash
set -e

echo "🔄 Rebuilding and restarting containers..."

# Rebuild and restart
docker-compose up -d --build

echo "✅ Website deployed successfully!"
echo "🌐 Available at: http://localhost:8080"
