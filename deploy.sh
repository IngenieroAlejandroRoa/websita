#!/bin/bash

# Script para desplegar en producción

echo "🚀 Desplegando aplicación..."

# 1. Verificar que existe .env.backend
if [ ! -f .env.backend ]; then
    echo "❌ Error: .env.backend no encontrado"
    echo "📝 Crea el archivo .env.backend con las credenciales SMTP"
    exit 1
fi

# 2. Detener contenedores existentes
echo "📦 Deteniendo contenedores existentes..."
docker compose down

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
