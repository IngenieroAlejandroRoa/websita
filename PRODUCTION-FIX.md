# 🔧 Solución: Chatbot no conecta en producción

## ❌ Problema

Al levantar el frontend con Docker (`docker compose up -d`), el navegador muestra:
```
Sorry, I couldn't connect to the chatbot service.
```

## ✅ Solución Aplicada

### 1. **Proxy Nginx actualizado**
   - Agregado proxy `/chat` → `rag-api:8000`
   - Agregado proxy `/health` → `rag-api:8000`
   - Timeouts extendidos a 90s para respuestas del LLM

### 2. **Redes Docker conectadas**
   - Frontend ahora conectado a `chat_chatbot-network`
   - Permite comunicación entre Nginx y rag-api

### 3. **Orden de inicio correcto**
   - ⚠️ **CRÍTICO:** Chatbot PRIMERO, luego frontend

---

## 🚀 Pasos en Producción (LXC)

### 1️⃣ Actualizar código

```bash
cd /websita
git pull origin master
```

### 2️⃣ Detener servicios actuales

```bash
# Detener frontend y backend
docker compose down

# Detener chatbot
cd Chat
docker compose down
```

### 3️⃣ Iniciar en orden correcto

```bash
# PRIMERO: Chatbot (crea la red chat_chatbot-network)
cd /websita/Chat
./start-chatbot.sh

# Esperar a que inicie completamente
# Ver logs: docker logs -f rag-api
# Debe mostrar: "Application startup complete"
```

En **otra terminal SSH**:

```bash
# SEGUNDO: Frontend + Backend
cd /websita
./deploy.sh

# O manualmente:
docker compose build --no-cache
docker compose up -d
```

### 4️⃣ Verificar servicios

```bash
# Ver todos los contenedores
docker ps

# Deberías ver:
# - alejandroroa-websita (puerto 8080)
# - alejandroroa-backend (puerto 3001)
# - rag-api (puerto 8000)
# - ollama (sin puerto expuesto)

# Verificar endpoints
curl http://localhost:8080
curl http://localhost:3001/api/health
curl http://localhost:8000/health

# Probar chatbot desde el navegador
# https://alejandroroa.engineer → ir a sección Chat
```

---

## 🔍 Verificación de Redes

```bash
# Ver redes Docker
docker network ls

# Deberías ver:
# - websita_website_network
# - chat_chatbot-network

# Inspeccionar red del chatbot
docker network inspect chat_chatbot-network

# Debe mostrar:
# - Container: ollama
# - Container: rag-api
# - Container: alejandroroa-websita ← IMPORTANTE
```

---

## 🐛 Troubleshooting

### Error: "network chat_chatbot-network not found"

**Causa:** Frontend intentó iniciar antes que el chatbot.

**Solución:**
```bash
# 1. Iniciar chatbot primero
cd /websita/Chat
./start-chatbot.sh

# 2. Esperar 30 segundos

# 3. Iniciar frontend
cd /websita
docker compose up -d
```

### Error: "Sorry, I couldn't connect to the chatbot service"

**Verificar:**

```bash
# 1. ¿Está corriendo rag-api?
docker ps | grep rag-api

# 2. ¿Responde el endpoint?
curl http://localhost:8000/health
# Debe retornar: {"status":"healthy"}

# 3. ¿Está el frontend en la red correcta?
docker inspect alejandroroa-websita | grep -A 5 Networks
# Debe mostrar: chat_chatbot-network

# 4. Ver logs del frontend
docker logs alejandroroa-websita

# 5. Ver logs del chatbot
docker logs rag-api
```

### El chatbot responde lento

**Normal:** Las respuestas pueden tardar 30-60 segundos para preguntas complejas.

El timeout de Nginx está configurado a 90s. Si tarda más:

```bash
# Ver logs en tiempo real
docker logs -f rag-api
```

---

## 📋 Checklist Post-Deploy

- [ ] `docker ps` muestra 4 contenedores corriendo
- [ ] `curl http://localhost:8000/health` retorna `{"status":"healthy"}`
- [ ] `curl http://localhost:8080` retorna HTML
- [ ] `curl http://localhost:3001/api/health` retorna JSON
- [ ] Frontend accesible en https://alejandroroa.engineer
- [ ] Chat funciona desde el navegador (sin error de conexión)
- [ ] Formulario de contacto funciona
- [ ] No hay errores en `docker logs rag-api`
- [ ] No hay errores en `docker logs alejandroroa-websita`

---

## 🎯 Resumen Técnico

### Cambios Realizados

**Archivo:** `frontend/nginx.conf`
- Agregado `location /chat` → proxy a rag-api
- Agregado `location /health` → proxy a rag-api
- Timeouts: 90s

**Archivo:** `docker-compose.yml`
- Website conectado a `chat_chatbot-network` (external)
- Permite comunicación frontend ↔ chatbot

**Archivo:** `README.md`
- Documentado orden correcto de inicio
- Advertencia sobre iniciar chatbot primero

### Arquitectura de Red

```
┌─────────────────────────────────────────┐
│         website_network                 │
│  ┌──────────────┐   ┌──────────────┐   │
│  │   website    │───│   backend    │   │
│  │  (Nginx)     │   │  (Express)   │   │
│  └──────┬───────┘   └──────────────┘   │
│         │                                │
│         │ (también conectado a)          │
│         │                                │
│         │                                │
└─────────┼────────────────────────────────┘
          │
          │
┌─────────┼────────────────────────────────┐
│         │   chat_chatbot-network         │
│         │                                 │
│  ┌──────▼───────┐   ┌──────────────┐    │
│  │   website    │   │   rag-api    │    │
│  │  (Nginx)     ├───│  (FastAPI)   │    │
│  └──────────────┘   └──────┬───────┘    │
│                             │             │
│                      ┌──────▼───────┐    │
│                      │   ollama     │    │
│                      │   (LLaMA 3)  │    │
│                      └──────────────┘    │
└─────────────────────────────────────────┘
```

### Flujo de Petición

1. Usuario → `https://alejandroroa.engineer/#chatbot`
2. JavaScript → `fetch('/chat', { ... })`
3. Nginx (frontend) → proxy `/chat` → `http://rag-api:8000/chat`
4. rag-api → procesa con ChromaDB + LLaMA 3
5. rag-api → responde JSON
6. Nginx → reenvía respuesta
7. JavaScript → muestra en UI

---

**Fecha de fix:** 2026-01-23  
**Versión:** v1.1.0
