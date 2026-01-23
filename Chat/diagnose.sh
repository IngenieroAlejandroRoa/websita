#!/bin/bash

echo "🔍 DIAGNÓSTICO DEL CHATBOT"
echo "=========================="
echo ""

echo "1️⃣ Estado de contenedores:"
docker ps --filter "name=ollama" --filter "name=rag-api" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
echo ""

echo "2️⃣ Verificando modelo LLaMA:"
docker exec ollama ollama list 2>/dev/null || echo "❌ No se puede conectar a Ollama"
echo ""

echo "3️⃣ Verificando archivos CV montados:"
echo "CV Español:"
docker exec rag-api ls -lh /app/cv_data/Spanish/ 2>/dev/null || echo "❌ No montado"
echo "CV Inglés:"
docker exec rag-api ls -lh /app/cv_data/English/ 2>/dev/null || echo "❌ No montado"
echo "Web context:"
docker exec rag-api ls -lh /app/web_data/ 2>/dev/null || echo "❌ No montado"
echo ""

echo "4️⃣ Verificando base de datos vectorial:"
docker exec rag-api ls -lh /app/chroma_db/ 2>/dev/null || echo "❌ No existe chroma_db"
echo ""

echo "5️⃣ Health check de la API:"
curl -s http://localhost:8000/health | python3 -m json.tool 2>/dev/null || echo "❌ API no responde"
echo ""

echo "6️⃣ Logs recientes de rag-api:"
docker logs --tail 20 rag-api
echo ""

echo "=========================="
echo "🔧 SOLUCIÓN:"
echo ""
echo "Si collection_ready=false, ejecuta:"
echo "  docker exec rag-api python ingest.py"
echo "  docker compose restart api"
echo ""
