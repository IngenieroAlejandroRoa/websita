#!/bin/bash

# Script para desplegar en producción

echo "🚀 Desplegando aplicación..."

# 1. Detener contenedores existentes
echo "📦 Deteniendo contenedores existentes..."
docker compose down

# 2. Cargar variables de entorno del backend
if [ -f .env.backend ]; then
    export $(cat .env.backend | grep -v '^#' | xargs)
    echo "✅ Variables de entorno cargadas"
else
    echo "❌ Error: .env.backend no encontrado"
    exit 1
fi

# 3. Construir imágenes
echo "🔨 Construyendo imágenes Docker..."
docker compose build --no-cache

# 4. Iniciar servicios
echo "🚀 Iniciando servicios..."
docker compose up -d

# 5. Verificar estado
echo "🔍 Verificando estado de los servicios..."
sleep 5
docker compose ps

echo ""
echo "✅ Despliegue completado!"
echo "📍 Frontend: http://localhost:8080"
echo "📍 Backend API: http://localhost:3001/api/health"
echo ""
echo "Ver logs:"
echo "  docker compose logs -f website"
echo "  docker compose logs -f backend"
