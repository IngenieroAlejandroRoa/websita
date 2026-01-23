# 🤖 Chatbot RAG con Extracción Automática de Datos

Sistema de chatbot inteligente con RAG (Retrieval-Augmented Generation) que extrae automáticamente información de tu CV y contenido web para responder preguntas sobre tu perfil profesional.

---

## 📋 Tabla de Contenidos

1. [¿Qué es este Chatbot?](#qué-es-este-chatbot)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Inicio Rápido](#inicio-rápido)
4. [Actualización de Datos](#actualización-de-datos)
5. [Fuentes de Información](#fuentes-de-información)
6. [Endpoints de la API](#endpoints-de-la-api)
7. [Comandos Útiles](#comandos-útiles)
8. [Solución de Problemas](#solución-de-problemas)
9. [Configuración Técnica](#configuración-técnica)
10. [Estructura de Archivos](#estructura-de-archivos)

---

## 🎯 ¿Qué es este Chatbot?

Un asistente virtual inteligente que:

- **Responde preguntas** sobre tu perfil profesional, experiencia, habilidades y proyectos
- **Extrae información automáticamente** desde tus CVs (LaTeX) y contenido web (TypeScript)
- **Se actualiza con un comando** cuando modificas tu CV o página web
- **Usa RAG** (Retrieval-Augmented Generation) para respuestas contextuales y precisas
- **Funciona con LLaMA 3** (8B modelo) localmente via Ollama

### ✨ Características Principales

- ✅ **Sin configuración manual de datos** - Todo se extrae automáticamente
- ✅ **Bilingüe** - Extrae de CVs en español e inglés
- ✅ **Actualización simple** - Un solo comando para regenerar la base de datos
- ✅ **Respuestas contextuales** - Usa embeddings vectoriales + LLM
- ✅ **Privado y local** - Todo corre en tu máquina, no envía datos externos

---

## 🏗️ Arquitectura del Sistema

### Diagrama de Flujo

```
┌─────────────────────────────────────────────────────────────┐
│                    FUENTES DE DATOS                         │
│  - CV/Spanish/cv.tex                                        │
│  - CV/English/cv.tex                                        │
│  - src/contexts/LanguageContext.tsx                         │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────┐
│              EXTRACCIÓN (extract_data.py)                   │
│  - Parse de LaTeX (CVs)                                     │
│  - Parse de TypeScript (Web)                                │
│  - Limpieza y estructuración                                │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────┐
│           CHUNKING SEMÁNTICO (ingest.py)                    │
│  - Genera ~35 chunks únicos                                 │
│  - Elimina duplicados                                       │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────┐
│        EMBEDDINGS (SentenceTransformer)                     │
│  Modelo: all-MiniLM-L6-v2                                   │
│  Convierte texto → vectores de 384 dimensiones              │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────┐
│          BASE DE DATOS VECTORIAL (ChromaDB)                 │
│  Almacena: documentos + embeddings + metadata               │
│  Persistencia: ./api/chroma_db/                             │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                  API RAG (FastAPI)                          │
│  1. Recibe pregunta del usuario                             │
│  2. Vectoriza pregunta                                      │
│  3. Busca top-3 chunks relevantes (similitud coseno)        │
│  4. Construye prompt: SYSTEM + CONTEXT + PREGUNTA           │
│  5. Envía a LLM (LLaMA 3)                                   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────┐
│            LLM GENERADOR (Ollama + LLaMA 3)                 │
│  Modelo: llama3:8b-instruct-q4_0                            │
│  Genera respuesta basada en contexto                        │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                  RESPUESTA AL USUARIO                       │
│  Via API HTTP → Frontend React                              │
└─────────────────────────────────────────────────────────────┘
```

### Componentes del Sistema

| Componente | Tecnología | Puerto | Descripción |
|------------|------------|--------|-------------|
| **Frontend** | React + Vite | 8080 | Interfaz de usuario |
| **API Backend** | FastAPI | 8000 | Endpoints REST |
| **LLM** | LLaMA 3 8B + Ollama | 11434 (interno) | Generación de respuestas |
| **Vector DB** | ChromaDB | - | Búsqueda semántica |
| **Embeddings** | SentenceTransformers | - | Vectorización |

---

## 🚀 Inicio Rápido

### 🏠 Desarrollo Local

```bash
cd ~/Documents/websita/Chat
./start-chatbot.sh
```

### 🚀 Producción (LXC)

**IMPORTANTE:** En producción necesitas dos pasos:

```bash
cd /websita/Chat

# 1. Iniciar servicios
./start-chatbot.sh

# 2. Generar base de datos (CRÍTICO)
./generate-database.sh
```

**Primera vez:**
- Descarga modelo LLaMA 3 8B (~5GB, toma 10-15 min)
- Extrae información de tus CVs y web
- Genera base de datos vectorial (~35 chunks)
- Inicia servicios Docker

**Ejecuciones posteriores:**
- Verifica y levanta servicios
- Reutiliza modelo y base de datos existente

### ✅ Verificar que funciona

```bash
# Debe mostrar: "collection_ready": true
curl http://localhost:8000/health

# Si muestra "collection_ready": false, ejecuta:
./generate-database.sh
```

**Opción A - Desde la web:**
- Abre http://localhost:8080
- Navega a la sección "Chat"
- Haz preguntas como:
  - "¿Qué experiencia tiene Alejandro?"
  - "¿Cuáles son sus habilidades técnicas?"
  - "¿En qué universidad estudió?"

**Opción B - Desde terminal (testing):**
```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"question":"¿Qué proyectos destacados tiene Alejandro?"}'
```

---

## 🔄 Actualización de Datos

### ¿Cuándo actualizar?

Cuando modifiques:
- **CV en español:** `~/Documents/websita/CV/Spanish/cv.tex`
- **CV en inglés:** `~/Documents/websita/CV/English/cv.tex`
- **Contenido web:** `~/Documents/websita/src/contexts/LanguageContext.tsx`

### Comando de actualización

```bash
cd ~/Documents/websita/Chat
./update-chatbot-data.sh
```

**Proceso automático:**
1. ✅ Extrae información actualizada de CVs y web
2. ✅ Genera nuevos chunks semánticos
3. ✅ Crea nuevos embeddings vectoriales
4. ✅ Actualiza ChromaDB
5. ✅ Reinicia API para cargar nueva data

**Tiempo:** ~30-60 segundos

### Ejemplo de workflow

```bash
# 1. Editar CV
vim ~/Documents/websita/CV/Spanish/cv.tex
# (Agregar nueva experiencia laboral)

# 2. Actualizar chatbot
cd ~/Documents/websita/Chat
./update-chatbot-data.sh

# 3. Probar
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"question":"¿Cuál es la experiencia más reciente de Alejandro?"}'
```

---

## 📚 Fuentes de Información

### 1. CV en LaTeX (Español e Inglés)

**Ubicación:**
- `~/Documents/websita/CV/Spanish/cv.tex`
- `~/Documents/websita/CV/English/cv.tex`

**Información extraída:**
- ✅ Nombre completo
- ✅ Email y teléfono
- ✅ Enlaces (GitHub, LinkedIn, Portfolio)
- ✅ Perfil profesional
- ✅ Educación (títulos, instituciones, fechas)
- ✅ Proyectos de grado
- ✅ Experiencia laboral (empresa, puesto, período, descripción)
- ✅ Habilidades técnicas
- ✅ Proyectos destacados
- ✅ Idiomas
- ✅ Competencias y hackathons

### 2. Contenido Web (TypeScript)

**Ubicación:**
- `~/Documents/websita/src/contexts/LanguageContext.tsx`

**Información extraída:**
- ✅ Enfoque profesional
- ✅ Descripción personal ("sobre mí")
- ✅ Servicios ofrecidos
- ✅ Detalles de proyectos destacados (Corto Circuito, Robot Angel)

### 3. Extractor (`extract_data.py`)

**Técnicas de extracción:**
- Regex patterns para LaTeX
- Regex patterns para TypeScript/JSX
- Limpieza de formato (LaTeX commands, newlines, etc.)
- Eliminación de duplicados
- Generación de chunks semánticos

**Ejemplo de chunk generado:**
```
"Experiencia: Research Intern en Innovation and Transfer Management, Universidad EAN, Bogotá, Colombia (Present). Developing an environmental monitoring system with real-time visualization and prediction for Universidad EAN's research management"
```

---

## 🔌 Endpoints de la API

### Base URL
```
http://localhost:8000
```

### 1. Health Check

**Endpoint:** `GET /health`

**Descripción:** Verifica el estado del servicio

**Respuesta:**
```json
{
  "status": "ok",
  "collection_ready": true,
  "ollama_host": "http://ollama:11434"
}
```

**Ejemplo:**
```bash
curl http://localhost:8000/health
```

### 2. Chat

**Endpoint:** `POST /chat`

**Descripción:** Envía una pregunta y recibe respuesta del chatbot

**Request Body:**
```json
{
  "question": "¿Qué experiencia tiene Alejandro en robótica?"
}
```

**Respuesta:**
```json
{
  "answer": "Alejandro tiene experiencia en robótica a través de su proyecto de grado Robot Angel, un IDE de código abierto dedicado a la robótica..."
}
```

**Ejemplo:**
```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"question":"¿Cuáles son las habilidades de Alejandro?"}'
```

### 3. Documentación Interactiva

**Endpoint:** `GET /docs`

**Descripción:** Swagger UI para probar la API

**URL:** http://localhost:8000/docs

---

## 🛠️ Comandos Útiles

### Gestión de Servicios

```bash
# Iniciar chatbot
cd ~/Documents/websita/Chat
./start-chatbot.sh

# Detener servicios
docker compose down

# Reiniciar solo la API
docker compose restart api

# Ver logs en tiempo real
docker compose logs -f api

# Ver estado de contenedores
docker compose ps
```

### Testing y Debugging

```bash
# Verificar salud
curl http://localhost:8000/health

# Probar extracción de datos
docker exec rag-api python extract_data.py

# Ver chunks en ChromaDB
docker exec rag-api python -c "
import chromadb
client = chromadb.PersistentClient(path='./chroma_db')
collection = client.get_collection('portfolio')
print(f'Total documentos: {collection.count()}')
"

# Verificar archivos montados
docker exec rag-api ls -la /app/cv_data/Spanish/
docker exec rag-api ls -la /app/web_data/

# Verificar modelo descargado
docker exec ollama ollama list
```

### Mantenimiento

```bash
# Actualizar datos
cd ~/Documents/websita/Chat
./update-chatbot-data.sh

# Resetear todo desde cero
docker compose down
rm -rf api/chroma_db
./start-chatbot.sh

# Ver logs de un servicio específico
docker compose logs ollama
docker compose logs api
```

---

## ⚠️ Solución de Problemas

### Problema: "El chatbot no responde" o timeouts

**Síntomas:**
```json
{"detail": "Error al conectar con Ollama: Read timed out"}
```

**Solución:**
```bash
# 1. Verificar que Ollama esté corriendo
docker compose ps

# 2. Ver logs
docker compose logs -f ollama

# 3. Verificar modelo descargado
docker exec ollama ollama list

# 4. Reiniciar servicios
docker compose restart
```

### Problema: "Base de datos vectorial no inicializada"

**Síntomas:**
```json
{"detail": "Base de datos vectorial no inicializada"}
```

**Solución:**
```bash
# Crear base de datos
cd ~/Documents/websita/Chat
docker exec rag-api python ingest.py
docker compose restart api
```

### Problema: "No encuentra archivos CV o web"

**Síntomas:**
```
⚠️ No se encontró /app/cv_data/Spanish/cv.tex
```

**Solución:**
```bash
# Verificar montajes
docker inspect rag-api | grep -A 10 Mounts

# Reconstruir con volúmenes
docker compose down
docker compose up -d --build
```

### Problema: Respuestas lentas (>30 segundos)

**Causa:** El modelo LLaMA 3 8B puede tardar en CPU

**Solución:**
- El timeout está configurado en 60s
- Para respuestas más rápidas, considera usar GPU
- O reducir `num_predict` en `main.py` (línea ~82)

### Problema: "Frontend dice 'couldn't connect to chatbot service'"

**Solución:**
```bash
# 1. Verificar que API esté corriendo
curl http://localhost:8000/health

# 2. Verificar proxy de Vite (debe estar configurado)
cat ~/Documents/websita/vite.config.ts | grep -A 5 proxy

# 3. Reiniciar frontend
cd ~/Documents/websita
# Ctrl+C para detener npm run dev
npm run dev
```

### Problema: Modelo LLaMA descarga interrumpida

**Solución:**
```bash
# Eliminar modelo corrupto y volver a descargar
docker exec ollama ollama rm llama3:8b-instruct-q4_0
docker exec ollama ollama pull llama3:8b-instruct-q4_0
```

---

## ⚙️ Configuración Técnica

### Especificaciones del Sistema

| Parámetro | Valor | Ubicación |
|-----------|-------|-----------|
| **Timeout LLM** | 60s | `api/main.py` línea 86 |
| **Max tokens respuesta** | 256 | `api/main.py` línea 83 |
| **Temperatura** | 0.2 | `api/main.py` línea 84 |
| **Top-K chunks** | 3 | `api/main.py` línea 60 |
| **Embedding dimensions** | 384 | all-MiniLM-L6-v2 |
| **Puerto API** | 8000 | `docker-compose.yml` |
| **Puerto Frontend** | 8080 | `vite.config.ts` |

### Modelos Utilizados

**LLM (Generación):**
- Modelo: `llama3:8b-instruct-q4_0`
- Tamaño: ~5 GB
- Cuantización: Q4_0 (4-bit)
- Proveedor: Ollama

**Embeddings (Vectorización):**
- Modelo: `all-MiniLM-L6-v2`
- Tamaño: ~80 MB
- Dimensiones: 384
- Proveedor: SentenceTransformers

### Variables de Entorno

**En `docker-compose.yml`:**
```yaml
environment:
  - OLLAMA_HOST=http://ollama:11434  # Host de Ollama
  - OMP_NUM_THREADS=4                 # Threads para Ollama
```

### Volúmenes Docker

```yaml
volumes:
  - ./api/data:/app/data                    # Datos adicionales
  - ./api/chroma_db:/app/chroma_db          # Base vectorial (persistente)
  - ../CV:/app/cv_data:ro                   # CVs (solo lectura)
  - ../src/contexts:/app/web_data:ro        # Contenido web (solo lectura)
```

---

## 📁 Estructura de Archivos

```
Chat/
│
├── api/                          # Código Python del backend
│   ├── extract_data.py           # Extractor automático de CVs y web
│   ├── ingest.py                 # Generador de base vectorial
│   ├── main.py                   # API FastAPI
│   ├── requirements.txt          # Dependencias Python
│   ├── Dockerfile                # Imagen Docker de la API
│   ├── data/                     # Datos adicionales (opcional)
│   └── chroma_db/                # Base de datos ChromaDB (auto-generada)
│       ├── chroma.sqlite3        # SQLite con metadata
│       └── ...                   # Archivos de vectores
│
├── docker-compose.yml            # Orquestación de servicios
├── start-chatbot.sh             # Script de inicio
├── update-chatbot-data.sh       # Script de actualización
└── README.md                     # Este archivo
```

### Archivos Clave

**`extract_data.py`:**
- Función: Extrae información de CVs LaTeX y LanguageContext.tsx
- Input: Archivos montados en `/app/cv_data/` y `/app/web_data/`
- Output: Lista de chunks (strings)
- Ejecución: `docker exec rag-api python extract_data.py`

**`ingest.py`:**
- Función: Genera embeddings y crea/actualiza ChromaDB
- Input: Chunks de `extract_data.py`
- Output: Base de datos en `./chroma_db/`
- Ejecución: `docker exec rag-api python ingest.py`

**`main.py`:**
- Función: API REST con endpoints /health y /chat
- Puerto: 8000
- CORS: Habilitado para `*` (localhost development)
- Ejecución: Automática via Docker

**`docker-compose.yml`:**
- Define 2 servicios: `ollama` y `api`
- Red interna: `chatbot-network`
- Volúmenes persistentes: `ollama`, `chroma_db`

---

## 🔍 Detalles de Implementación

### Proceso RAG (Retrieval-Augmented Generation)

1. **Usuario envía pregunta** → API recibe POST /chat
2. **Vectorización de pregunta** → SentenceTransformer genera embedding
3. **Búsqueda semántica** → ChromaDB encuentra top-3 chunks similares
4. **Construcción de prompt:**
   ```
   SYSTEM: Eres el asistente del portafolio de Alejandro Roa...
   
   CONTEXTO:
   - Chunk 1 relevante
   - Chunk 2 relevante  
   - Chunk 3 relevante
   
   PREGUNTA: ¿Qué experiencia tiene Alejandro?
   ```
5. **Generación** → LLaMA 3 procesa prompt y genera respuesta
6. **Respuesta** → JSON con campo "answer"

### System Prompt

```python
SYSTEM_PROMPT = """
Eres el asistente del portafolio de Alejandro Roa.
Responde SOLO con la información proporcionada.
Si no hay información suficiente, responde:
"No tengo información sobre eso."
"""
```

Este prompt asegura que:
- El chatbot no invente información
- Solo use el contexto recuperado
- Sea honesto cuando no sepa algo

### CORS Configuration

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En desarrollo: permite todos los orígenes
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**Nota:** En producción, cambiar `["*"]` por tu dominio específico.

---

## 📊 Métricas de Rendimiento

| Operación | Tiempo Promedio |
|-----------|-----------------|
| Inicio primera vez | 10-15 min (descarga modelo) |
| Inicio subsecuente | 5-10 seg |
| Actualización de datos | 30-60 seg |
| Respuesta del chatbot | 5-30 seg (según complejidad) |
| Extracción de datos | 1-2 seg |

---

## 🤝 Contribuir

### Mejorar el Extractor

Para añadir nueva información extraída:

1. Edita `api/extract_data.py`
2. Añade patrones regex en `extract_from_tex()` o `extract_from_language_context()`
3. Prueba:
   ```bash
   docker exec rag-api python extract_data.py
   ```
4. Actualiza la base:
   ```bash
   ./update-chatbot-data.sh
   ```

### Ajustar Parámetros del LLM

Edita `api/main.py`:

```python
"options": {
    "num_predict": 256,      # Tokens máximos de respuesta
    "temperature": 0.2       # 0-1, menor = más determinístico
}
```

---

## 📝 Notas Finales

- **Privacidad:** Todo corre localmente, ningún dato se envía a servidores externos
- **Bilingüe:** Funciona en español e inglés (según la pregunta)
- **Actualizable:** Base de datos se regenera automáticamente desde tus archivos fuente
- **Extensible:** Fácil añadir nuevas fuentes de datos editando `extract_data.py`

---

**Desarrollado por:** Alejandro Roa  
**Última actualización:** Enero 2026  
**Stack:** Python, FastAPI, LLaMA 3, ChromaDB, Docker, React
