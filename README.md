# 🌐 Portafolio Alejandro Roa - Website Personal

Sitio web profesional con portafolio interactivo, sistema de contacto y chatbot inteligente con RAG. Todo corriendo localmente en un contenedor LXC dentro de Proxmox con tunneling de Cloudflare.

---

## 📋 Tabla de Contenidos

1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Arquitectura General](#arquitectura-general)
3. [Componentes del Sistema](#componentes-del-sistema)
4. [Stack Tecnológico](#stack-tecnológico)
5. [Infraestructura](#infraestructura)
6. [Inicio Rápido](#inicio-rápido)
7. [Estructura del Proyecto](#estructura-del-proyecto)
8. [Deployment](#deployment)
9. [Configuración](#configuración)
10. [URLs y Endpoints](#urls-y-endpoints)

---

## 🎯 Descripción del Proyecto

Portafolio web profesional completo que incluye:

- **Frontend interactivo** con React + Vite + shadcn/ui
- **Sistema de contacto** con backend Node.js + SMTP
- **Chatbot inteligente con RAG** que responde preguntas sobre el perfil profesional
- **Deployment automatizado** con Docker Compose
- **Infraestructura auto-hospedada** en Proxmox LXC con Cloudflare Tunnel

### ✨ Características Principales

✅ **Portafolio profesional** - Proyectos destacados, experiencia, habilidades  
✅ **Formulario de contacto funcional** - Envío de emails via SMTP con rate limiting  
✅ **Chatbot RAG** - Responde preguntas usando LLaMA 3 + ChromaDB  
✅ **Bilingüe** - Español e Inglés  
✅ **Responsive** - Optimizado para móvil, tablet y escritorio  
✅ **SEO friendly** - Meta tags, sitemap, optimizado para búsqueda  
✅ **Auto-hospedado** - Sin dependencias de servicios externos  

---

## 🏗️ Arquitectura General

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLOUDFLARE                              │
│                    (Tunnel + DNS + SSL)                         │
└────────────────────────┬────────────────────────────────────────┘
                         │ HTTPS
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                    PROXMOX HOST SERVER                          │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              LXC CONTAINER (Ubuntu)                       │  │
│  │                                                           │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │           DOCKER COMPOSE NETWORK                    │ │  │
│  │  │                                                     │ │  │
│  │  │  ┌──────────────┐  ┌──────────────┐  ┌──────────┐ │ │  │
│  │  │  │   Frontend   │  │   Backend    │  │  Chatbot │ │ │  │
│  │  │  │  (Nginx)     │  │  (Express)   │  │   RAG    │ │ │  │
│  │  │  │  Port 8080   │  │  Port 3001   │  │ Port 8000│ │ │  │
│  │  │  └──────┬───────┘  └──────┬───────┘  └────┬─────┘ │ │  │
│  │  │         │                  │                │       │ │  │
│  │  │         └─────────┬────────┴────────────────┘       │ │  │
│  │  │                   │                                 │ │  │
│  │  │            Docker Network Bridge                    │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  │                                                           │  │
│  │  Additional Services:                                    │  │
│  │  - Ollama (LLM): Port 11434 (interno)                   │  │
│  │  - ChromaDB: Persistente en volumen                     │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🧩 Componentes del Sistema

### 1. **Frontend** (React + Vite)

**Descripción:** Interfaz de usuario del portafolio

**Tecnologías:**
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS + shadcn/ui
- React Router para navegación
- Internacionalización (ES/EN)

**Puerto:** 8080  
**Servidor:** Nginx (dentro de Docker)

**Secciones:**
- Hero / Landing
- Proyectos destacados (carrusel)
- Sobre mí
- Experiencia laboral
- Competencias y hackathons
- Habilidades técnicas
- Insignias y certificaciones
- Todos los proyectos
- **Chatbot** (integrado)
- Formulario de contacto

### 2. **Backend de Contacto** (Node.js + Express)

**Descripción:** API REST para el formulario de contacto

**Tecnologías:**
- Node.js + Express
- Nodemailer (SMTP)
- Helmet.js (seguridad)
- Rate limiting
- CORS configurado

**Puerto:** 3001  
**Endpoints:**
- `POST /api/contact` - Enviar email
- `GET /api/health` - Health check

**Características:**
- ✅ Envío de emails via SMTP (Gmail/Outlook/etc)
- ✅ Rate limiting: 10 requests por 10 minutos
- ✅ Honeypot anti-spam
- ✅ Validación de inputs
- ✅ CORS configurado para dominio específico

### 3. **Chatbot RAG** (Python + FastAPI + LLaMA 3)

**Descripción:** Chatbot inteligente que responde preguntas sobre el portafolio usando RAG (Retrieval-Augmented Generation)

**Tecnologías:**
- FastAPI (API REST)
- LLaMA 3 8B (vía Ollama)
- ChromaDB (base vectorial)
- SentenceTransformers (embeddings)
- Docker Compose

**Puerto:** 8000  
**Endpoints:**
- `POST /chat` - Enviar pregunta al chatbot
- `GET /health` - Health check

**Características:**
- ✅ **Extracción automática** de datos desde CVs (LaTeX) y web (TypeScript)
- ✅ **Actualización automática** de base vectorial con `./update-chatbot-data.sh`
- ✅ **Respuestas contextuales** usando top-3 chunks relevantes
- ✅ **Bilingüe** (español/inglés)
- ✅ **Sin datos externos** - Todo corre localmente

**Documentación detallada:** Ver `Chat/CHATBOT-DOCS.md`

---

## 🛠️ Stack Tecnológico

### Frontend
| Tecnología | Versión | Uso |
|------------|---------|-----|
| React | 18.3 | Framework UI |
| TypeScript | 5.8 | Type safety |
| Vite | 5.4 | Build tool |
| Tailwind CSS | 3.4 | Styling |
| shadcn/ui | Latest | Componentes UI |
| React Router | 6.30 | Navegación |
| Lucide React | Latest | Iconos |

### Backend (Contacto)
| Tecnología | Versión | Uso |
|------------|---------|-----|
| Node.js | 20+ | Runtime |
| Express | 4.21 | Framework web |
| Nodemailer | 6.9 | SMTP client |
| Helmet | 8.0 | Security headers |
| CORS | 2.8 | CORS middleware |

### Backend (Chatbot)
| Tecnología | Versión | Uso |
|------------|---------|-----|
| Python | 3.11 | Runtime |
| FastAPI | Latest | Framework API |
| LLaMA 3 | 8B Instruct | LLM |
| Ollama | Latest | LLM server |
| ChromaDB | Latest | Vector DB |
| SentenceTransformers | Latest | Embeddings |

### Infraestructura
| Tecnología | Uso |
|------------|-----|
| Docker | Containerización |
| Docker Compose | Orquestación |
| Nginx | Reverse proxy + static server |
| LXC | Container en Proxmox |
| Proxmox VE | Hypervisor |
| Cloudflare Tunnel | Túnel seguro HTTPS |
| Cloudflare DNS | DNS + CDN |

---

## 🌐 Infraestructura

### Servidor Proxmox

**Host:** Servidor físico con Proxmox VE  
**Container:** LXC Ubuntu  
**Recursos asignados:**
- CPU: Variable (compartido)
- RAM: Configurado según necesidades
- Storage: Almacenamiento persistente

### Networking

```
Internet
   ↓
Cloudflare (CDN + DNS)
   ↓
Cloudflare Tunnel (cloudflared)
   ↓
Proxmox Host
   ↓
LXC Container
   ↓
Docker Containers
```

**Ventajas:**
- ✅ No necesita puerto forwarding en router
- ✅ SSL automático via Cloudflare
- ✅ DDoS protection de Cloudflare
- ✅ CDN global gratuito
- ✅ IP del servidor protegida

### Dominio

**URL Producción:** https://alejandroroa.engineer

**Configurado en Cloudflare:**
- DNS apunta a Cloudflare Tunnel
- SSL/TLS: Full (strict)
- Always Use HTTPS: On

---

## 🚀 Inicio Rápido

### Desarrollo Local

#### 1. Frontend

```bash
cd ~/Documents/websita

# Instalar dependencias
npm install

# Iniciar dev server
npm run dev
# → http://localhost:8080
```

#### 2. Backend de Contacto

```bash
cd ~/Documents/websita/backend/contact

# Configurar variables de entorno
cp .env .env.local
nano .env.local  # Agregar credenciales SMTP

# Instalar dependencias
npm install

# Iniciar servidor
node server.js
# → http://localhost:3001
```

#### 3. Chatbot RAG

```bash
cd ~/Documents/websita/Chat

# Iniciar servicios (descarga modelo primera vez)
./start-chatbot.sh
# → API en http://localhost:8000

# Actualizar datos después de modificar CV o web
./update-chatbot-data.sh
```

### Producción (Docker Compose)

```bash
cd ~/Documents/websita

# Configurar variables de entorno
cp .env.backend.example .env.backend
nano .env.backend  # Agregar credenciales SMTP reales

# Deploy automático
./deploy.sh

# O manual
docker compose up -d --build

# Verificar
docker compose ps
curl http://localhost:8080
curl http://localhost:3001/api/health
curl http://localhost:8000/health
```

---

## 📁 Estructura del Proyecto

```
websita/
│
├── frontend/                     # Frontend React (TODO EL FRONTEND AQUÍ)
│   ├── src/                      # Código fuente React
│   │   ├── components/           # Componentes React
│   │   │   ├── Navbar.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── ProjectsCarousel.tsx
│   │   │   ├── ChatbotSection.tsx
│   │   │   ├── ContactSection.tsx
│   │   │   └── ...
│   │   ├── contexts/             # Contextos React
│   │   │   └── LanguageContext.tsx  # Internacionalización
│   │   ├── pages/                # Páginas
│   │   ├── assets/               # Imágenes, videos
│   │   └── App.tsx               # Componente principal
│   │
│   ├── public/                   # Assets estáticos
│   │   ├── cv-alejandro-roa-en.pdf
│   │   ├── cv-alejandro-roa-es.pdf
│   │   └── ...
│   │
│   ├── dist/                     # Build de producción (generado)
│   ├── package.json              # Dependencies frontend
│   ├── vite.config.ts            # Configuración Vite
│   ├── tailwind.config.ts        # Configuración Tailwind
│   ├── tsconfig.json             # TypeScript config
│   ├── index.html                # HTML principal
│   ├── nginx.conf                # Config Nginx para Docker
│   └── Dockerfile                # Build del frontend
│
├── backend/                      # Backend Node.js
│   └── contact/
│       ├── server.js             # API Express
│       ├── package.json
│       ├── Dockerfile
│       └── .env                  # Variables locales (git-ignored)
│
├── Chat/                         # Chatbot RAG
│   ├── api/
│   │   ├── main.py               # FastAPI server
│   │   ├── extract_data.py       # Extractor de CVs y web
│   │   ├── ingest.py             # Generador de base vectorial
│   │   ├── requirements.txt
│   │   ├── Dockerfile
│   │   └── chroma_db/            # Base de datos (auto-generada)
│   ├── docker-compose.yml        # Ollama + API
│   ├── start-chatbot.sh          # Script de inicio
│   ├── update-chatbot-data.sh    # Script de actualización
│   └── CHATBOT-DOCS.md           # Documentación completa
│
├── CV/                           # CVs en LaTeX (fuente de datos)
│   ├── English/cv.tex
│   └── Spanish/cv.tex
│
├── docker-compose.yml            # Orquestación principal (frontend + backend)
├── .env.backend                  # Variables backend (git-ignored)
├── .env.backend.example          # Template de variables
├── deploy.sh                     # Script de deployment
├── .gitignore                    # Git ignore rules
└── README.md                     # Este archivo
```

---

## 🚢 Deployment

### Opción 1: Script Automático

```bash
./deploy.sh
```

**El script hace:**
1. Carga variables de `.env.backend`
2. Construye imágenes Docker
3. Levanta servicios con Docker Compose
4. Verifica health checks

### Opción 2: Manual

```bash
# 1. Asegurar que .env.backend existe
cp .env.backend.example .env.backend
nano .env.backend

# 2. Construir y levantar servicios
docker compose up -d --build

# 3. Verificar
docker compose ps
docker compose logs -f
```

### Docker Compose Services

```yaml
services:
  website:      # Frontend + Nginx (puerto 8080)
  backend:      # API de contacto (puerto 3001)
```

**Nota:** El chatbot RAG tiene su propio `docker-compose.yml` en `Chat/`

---

## ⚙️ Configuración

### Variables de Entorno

#### Backend de Contacto (`.env.backend`)

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-app-password-aqui

# Email Configuration
EMAIL_FROM=tu-email@gmail.com
EMAIL_TO=tu-email-destino@gmail.com

# Server Configuration
PORT=3001
ALLOWED_ORIGIN=https://alejandroroa.engineer
```

**Nota:** Para Gmail necesitas generar un "App Password" en:  
https://myaccount.google.com/apppasswords

#### Frontend (vite.config.ts)

```typescript
server: {
  host: "::",
  port: 8080,
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true,
    },
    '/chat': {
      target: 'http://localhost:8000',
      changeOrigin: true,
    }
  }
}
```

#### Chatbot (docker-compose.yml en Chat/)

```yaml
environment:
  - OLLAMA_HOST=http://ollama:11434
  - OMP_NUM_THREADS=4
```

---

## 🌐 URLs y Endpoints

### Producción

| Servicio | URL |
|----------|-----|
| **Website** | https://alejandroroa.engineer |
| **API Contacto** | https://alejandroroa.engineer/api/contact |
| **Health Backend** | https://alejandroroa.engineer/api/health |
| **Chatbot** | https://alejandroroa.engineer/chat |

### Desarrollo Local

| Servicio | URL |
|----------|-----|
| **Frontend** | http://localhost:8080 |
| **Backend Contacto** | http://localhost:3001 |
| **Chatbot API** | http://localhost:8000 |
| **Chatbot Docs** | http://localhost:8000/docs |

### Endpoints API

#### Backend de Contacto

**POST /api/contact**
```json
Request:
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "message": "Hola, me interesa contactar"
}

Response:
{
  "message": "Email sent successfully"
}
```

**GET /api/health**
```json
Response:
{
  "status": "ok",
  "timestamp": "2026-01-23T06:00:00.000Z"
}
```

#### Chatbot RAG

**POST /chat**
```json
Request:
{
  "question": "¿Qué experiencia tiene Alejandro?"
}

Response:
{
  "answer": "Alejandro tiene experiencia como Research Intern en..."
}
```

**GET /health**
```json
Response:
{
  "status": "ok",
  "collection_ready": true,
  "ollama_host": "http://ollama:11434"
}
```

---

## 🔧 Comandos Útiles

### Docker Compose

```bash
# Ver estado de servicios
docker compose ps

# Ver logs
docker compose logs -f
docker compose logs -f backend
docker compose logs -f website

# Reiniciar servicios
docker compose restart
docker compose restart backend

# Detener servicios
docker compose down

# Reconstruir servicios
docker compose up -d --build
```

### Chatbot

```bash
# Iniciar chatbot
cd Chat && ./start-chatbot.sh

# Actualizar datos
cd Chat && ./update-chatbot-data.sh

# Ver logs
cd Chat && docker compose logs -f api
```

### Frontend

```bash
# Desarrollo
cd ~/Documents/websita/frontend
npm run dev

# Build
npm run build

# Preview build
npm run preview
```

---

## 🔒 Seguridad

### Implementado

✅ **CORS** - Configurado para dominio específico  
✅ **Rate Limiting** - 10 requests por 10 minutos en contacto  
✅ **Helmet.js** - Security headers en backend  
✅ **Honeypot** - Anti-spam en formulario  
✅ **Input Validation** - Validación de inputs  
✅ **HTTPS** - SSL via Cloudflare  
✅ **Environment Variables** - Credenciales en .env (git-ignored)  
✅ **DDoS Protection** - Cloudflare  

### Cloudflare Tunnel

**Ventajas de seguridad:**
- No expone IP del servidor
- No requiere abrir puertos en firewall
- SSL/TLS automático
- Protección DDoS incluida
- WAF disponible

---

## 📊 Características Técnicas

### Performance

- **Lazy Loading** - Imágenes y componentes
- **Code Splitting** - Vite chunks automáticos
- **Optimización de assets** - Compresión de imágenes/videos
- **CDN** - Cloudflare CDN global
- **Caching** - Headers optimizados

### SEO

- **Meta tags** - Title, description, OG tags
- **Sitemap** - XML sitemap
- **Robots.txt** - Configurado
- **Schema.org** - Markup estructurado
- **URLs semánticas** - React Router

### Accesibilidad

- **ARIA labels** - Componentes accesibles
- **Keyboard navigation** - Tab navigation
- **Contraste** - WCAG AA compliant
- **Responsive** - Mobile-first design

---

## 🐛 Troubleshooting

### Backend no envía emails

```bash
# Verificar variables de entorno
docker compose exec backend env | grep SMTP

# Ver logs
docker compose logs backend

# Test manual
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Test"}'
```

### Chatbot no responde

```bash
# Ver documentación completa
cat Chat/CHATBOT-DOCS.md

# Verificar servicios
cd Chat && docker compose ps

# Actualizar datos
cd Chat && ./update-chatbot-data.sh
```

### Frontend no carga

```bash
# Verificar que nginx esté corriendo
docker compose ps website

# Ver logs
docker compose logs website

# Reconstruir
docker compose up -d --build website
```

---

## 📝 Mantenimiento

### Actualizar CV

```bash
# 1. Editar CV
vim CV/Spanish/cv.tex

# 2. Recompilar PDF
cd CV/Spanish && pdflatex cv.tex

# 3. Actualizar chatbot
cd ../../Chat && ./update-chatbot-data.sh
```

### Actualizar Contenido Web

```bash
# 1. Editar contenido
vim src/contexts/LanguageContext.tsx

# 2. Rebuild frontend
npm run build

# 3. Actualizar chatbot
cd Chat && ./update-chatbot-data.sh

# 4. Redesplegar (si producción)
./deploy.sh
```

### Backup

**Datos importantes a respaldar:**
- `CV/` - CVs en LaTeX
- `src/` - Código fuente
- `backend/contact/` - Backend
- `Chat/api/chroma_db/` - Base de datos vectorial
- `.env.backend` - Variables de entorno
- Configuración Cloudflare Tunnel

---

## 📚 Documentación Adicional

- **Chatbot RAG:** Ver `Chat/CHATBOT-DOCS.md` para documentación completa del chatbot
- **shadcn/ui:** https://ui.shadcn.com/
- **Vite:** https://vitejs.dev/
- **Cloudflare Tunnel:** https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/

---

## 🤝 Contribuir

Este es un proyecto personal, pero si encuentras bugs o tienes sugerencias:

1. Abre un issue en GitHub
2. Haz un fork y submit PR
3. Contacta via email: alejoroaaparicio@gmail.com

---

## 📄 Licencia

Proyecto personal - © 2026 Alejandro Roa Aparicio  
Licenciado bajo MIT License - Ver archivo [LICENSE](LICENSE) para más detalles.

---

**Desarrollado con ❤️ por Alejandro Roa**  
**Stack:** React + TypeScript + Node.js + Python + FastAPI + LLaMA 3 + Docker + Proxmox + Cloudflare  
**Última actualización:** Enero 2026
