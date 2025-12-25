#!/bin/bash

# Setup script for auto-deploy on server
# Run this once on your server after first clone

echo "🔧 Setting up auto-deploy configuration..."

# Install git hook
if [ -d .git ]; then
    echo "📌 Installing git post-merge hook..."
    cp .git-hooks/post-merge .git/hooks/post-merge
    chmod +x .git/hooks/post-merge
    echo "✅ Git hook installed"
else
    echo "❌ Not a git repository"
    exit 1
fi

# Create logs directory
mkdir -p logs
echo "✅ Logs directory created"

# Test docker-compose
if command -v docker-compose &> /dev/null; then
    echo "✅ docker-compose found"
else
    echo "⚠️  docker-compose not found. Please install Docker and docker-compose"
    exit 1
fi

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "✅ Auto-deploy setup complete!"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "Usage on server:"
echo ""
echo "  1. Initial deploy:"
echo "     ./deploy.sh"
echo ""
echo "  2. Future updates (automatic):"
echo "     git pull"
echo "     → Will auto-rebuild and restart container"
echo ""
echo "  3. Check status:"
echo "     docker-compose ps"
echo "     docker-compose logs -f"
echo ""
echo "  4. Manual restart:"
echo "     docker-compose restart"
echo ""
echo "═══════════════════════════════════════════════════════════════"
