#!/bin/bash
set -e

echo "🤖 Iniciando Chatbot RAG..."
echo ""

# Iniciar servicios
docker compose up -d

# Esperar a que Ollama esté listo
echo "⏳ Esperando servicios..."
sleep 8

# Verificar y descargar modelo si es necesario
if ! docker exec ollama ollama list 2>/dev/null | grep -q "llama3:8b-instruct-q4_0"; then
    echo "📦 Descargando modelo (10-15 min)..."
    docker exec ollama ollama pull llama3:8b-instruct-q4_0
fi

# Crear base de datos vectorial si no existe
if ! docker exec rag-api test -d /app/chroma_db 2>/dev/null || [ -z "$(docker exec rag-api ls -A /app/chroma_db 2>/dev/null)" ]; then
    echo "💾 Creando base de datos..."
    docker exec rag-api python ingest.py
    echo "🔄 Reiniciando API..."
    docker compose restart api
    sleep 3
fi

echo ""
echo "✅ Chatbot listo!"
echo "📍 API: http://localhost:8000"
echo "📚 Docs: http://localhost:8000/docs"
echo ""
echo "💡 Inicia tu frontend con: npm run dev"
echo ""
