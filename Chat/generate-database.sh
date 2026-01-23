#!/bin/bash
set -e

echo "🔧 Generando base de datos vectorial..."
echo ""

# Verificar que los contenedores estén corriendo
if ! docker ps | grep -q "rag-api"; then
    echo "❌ Error: rag-api no está corriendo"
    echo "Ejecuta primero: docker compose up -d"
    exit 1
fi

if ! docker ps | grep -q "ollama"; then
    echo "❌ Error: ollama no está corriendo"
    echo "Ejecuta primero: docker compose up -d"
    exit 1
fi

echo "✅ Contenedores activos"
echo ""

# Verificar modelo
echo "📦 Verificando modelo LLaMA..."
if ! docker exec ollama ollama list 2>/dev/null | grep -q "llama3:8b-instruct-q4_0"; then
    echo "⬇️  Descargando modelo (esto puede tomar 10-15 minutos)..."
    docker exec ollama ollama pull llama3:8b-instruct-q4_0
fi
echo "✅ Modelo listo"
echo ""

# Verificar archivos de datos
echo "📁 Verificando archivos de datos..."
if docker exec rag-api test -f /app/cv_data/Spanish/cv.tex; then
    echo "✅ CV Español encontrado"
else
    echo "⚠️  CV Español no encontrado (continuando de todos modos)"
fi

if docker exec rag-api test -f /app/cv_data/English/cv.tex; then
    echo "✅ CV Inglés encontrado"
else
    echo "⚠️  CV Inglés no encontrado (continuando de todos modos)"
fi

if docker exec rag-api test -f /app/web_data/LanguageContext.tsx; then
    echo "✅ Contexto web encontrado"
else
    echo "⚠️  Contexto web no encontrado (continuando de todos modos)"
fi
echo ""

# Limpiar base de datos existente
echo "🗑️  Limpiando base de datos anterior..."
docker exec rag-api rm -rf /app/chroma_db/* 2>/dev/null || true
echo ""

# Generar nueva base de datos
echo "💾 Generando base de datos vectorial..."
docker exec rag-api python ingest.py

if [ $? -eq 0 ]; then
    echo "✅ Base de datos generada exitosamente"
    echo ""
    
    # Reiniciar API para cargar la nueva base
    echo "🔄 Reiniciando API..."
    docker compose restart api
    sleep 5
    
    # Verificar
    echo ""
    echo "✅ Verificando estado..."
    curl -s http://localhost:8000/health | python3 -m json.tool 2>/dev/null || curl -s http://localhost:8000/health
    echo ""
    echo ""
    echo "🎉 ¡Listo! El chatbot debería funcionar ahora."
    echo "📍 Pruébalo en: http://localhost:8000/docs"
else
    echo "❌ Error al generar base de datos"
    echo "Ver logs: docker logs rag-api"
    exit 1
fi
