# Deployment Guide - Contact API

## 📋 Requisitos Previos

- Docker y Docker Compose instalados
- Acceso al archivo `.env.backend` con las credenciales SMTP

## 🚀 Despliegue en Producción

### Paso 1: Preparar el servidor

```bash
# En el servidor, verifica que exista .env.backend
cd /websita
ls -la .env.backend

# Si NO existe, créalo desde el ejemplo
cp .env.backend.example .env.backend
nano .env.backend  # Edita con tus credenciales SMTP reales
```

### Paso 2: Deployment Automático

```bash
./deploy.sh
```

### Opción 2: Manual

```bash
# 1. Cargar variables de entorno
export $(cat .env.backend | grep -v '^#' | xargs)

# 2. Construir y levantar servicios
docker-compose up -d --build

# 3. Verificar estado
docker-compose ps
```

## 🔍 Verificación

```bash
# Health check del backend
curl http://localhost:3001/api/health

# Health check del frontend
curl http://localhost:8080

# Ver logs
docker-compose logs -f backend
docker-compose logs -f website
```

## 🛠️ Comandos Útiles

```bash
# Detener todos los servicios
docker-compose down

# Reiniciar solo el backend
docker-compose restart backend

# Ver logs en tiempo real
docker-compose logs -f

# Reconstruir solo el backend
docker-compose up -d --build backend
```

## 📁 Estructura

```
websita/
├── backend/contact/          # Backend API
│   ├── server.js            # Servidor Express
│   ├── package.json
│   ├── Dockerfile
│   └── .env                 # Variables locales (no commiteado)
├── src/                     # Frontend React
├── nginx.conf               # Configuración Nginx (proxy /api)
├── docker-compose.yml       # Orquestación de servicios
├── .env.backend             # Variables para producción (no commiteado)
└── deploy.sh                # Script de deployment
```

## 🌐 URLs en Producción

- **Frontend**: https://alejandroroa.engineer
- **API**: https://alejandroroa.engineer/api/contact
- **Health Check**: https://alejandroroa.engineer/api/health

## 🔒 Seguridad

- ✅ `.env` y `.env.backend` están en `.gitignore`
- ✅ CORS configurado solo para dominios permitidos
- ✅ Rate limiting: 10 requests por 10 minutos
- ✅ Helmet.js para headers de seguridad
- ✅ Honeypot anti-spam
- ✅ Validación de inputs

## 🐛 Troubleshooting

### El backend no inicia
```bash
docker-compose logs backend
# Verificar que las variables de entorno estén cargadas
```

### Error CORS
```bash
# Verificar que el dominio esté en allowedOrigins en server.js
# Nginx hace proxy, así que el origin puede ser null
```

### El formulario no envía
```bash
# 1. Verificar que el backend esté corriendo
curl http://localhost:3001/api/health

# 2. Verificar que nginx esté haciendo proxy
docker-compose exec website cat /etc/nginx/conf.d/default.conf

# 3. Revisar logs del navegador (F12 → Console)
```

## 📧 Configuración SMTP

Las credenciales SMTP están en `.env.backend`:
- Gmail requiere "App Password" (no tu contraseña normal)
- Genera una en: https://myaccount.google.com/apppasswords

## 🔄 Actualización

```bash
# 1. Pull de cambios
git pull origin main

# 2. Redesplegar
./deploy.sh
```
