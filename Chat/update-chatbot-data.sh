#!/bin/bash
# Script para actualizar automáticamente la base de datos vectorial
# cuando se modifica el CV o el contenido de la web

set -e

echo "🔄 Actualizando base de datos vectorial del chatbot..."
echo ""

# Cambiar al directorio del proyecto
cd "$(dirname "$0")"

# Verificar que los servicios estén corriendo
if ! docker compose ps | grep -q "Up"; then
    echo "⚠️  Los servicios no están corriendo. Iniciando..."
    ./start-chatbot.sh
    exit 0
fi

# Regenerar base de datos
echo "📊 Regenerando base de datos desde CV y web..."
docker exec rag-api python ingest.py

# Reiniciar API para cargar los nuevos datos
echo "🔄 Reiniciando API..."
docker compose restart api

echo ""
echo "✅ Base de datos actualizada!"
echo "📍 API: http://localhost:8000"
echo ""
echo "💡 Prueba el chatbot con:"
echo "   curl -X POST http://localhost:8000/chat \\"
echo "     -H 'Content-Type: application/json' \\"
echo "     -d '{\"question\":\"¿Cuál es tu experiencia?\"}'"
echo ""
