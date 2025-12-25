# Portfolio Alejandro Roa

## 🚀 Cómo correr el proyecto en local

### Opción 1: Con npm (Desarrollo)

```bash
# Instalar dependencias
npm install

# Correr servidor de desarrollo
npm run dev
```

La página estará disponible en: **http://localhost:8080** (o el puerto que indique en consola)

### Opción 2: Con Docker

```bash
# Construir y correr con docker-compose
docker-compose up --build

# O solo correr (si ya está construido)
docker-compose up
```

La página estará disponible en: **http://localhost:8080**

Para detener: `Ctrl + C` o `docker-compose down`

---

## 🔄 Configuración Auto-Deploy en Servidor

### Setup inicial en el servidor (solo una vez):

```bash
# 1. Clonar el repositorio
git clone <tu-repo-url> websita
cd websita

# 2. Ejecutar script de configuración
./setup-server.sh

# 3. Primer deploy
./deploy.sh
```

### Actualizaciones automáticas:

Una vez configurado, cada vez que hagas `git pull` en el servidor, **automáticamente**:
1. Se reconstruirá la imagen Docker
2. Se detendrá el contenedor viejo
3. Se iniciará el nuevo contenedor

```bash
# En el servidor, simplemente:
git pull
# ✅ La página se actualiza automáticamente
```

### Monitoreo:

```bash
# Ver estado del contenedor
docker-compose ps

# Ver logs en tiempo real
docker-compose logs -f

# Ver log del último deploy
cat deploy.log

# Reiniciar manualmente si es necesario
docker-compose restart
```

---

## 📦 Comandos disponibles

- `npm run dev` - Servidor de desarrollo (hot reload)
- `npm run build` - Construir para producción
- `npm run preview` - Previsualizar build de producción
- `npm run lint` - Linter de código
- `./deploy.sh` - Deploy manual con Docker
- `./setup-server.sh` - Configurar auto-deploy en servidor

## 🛠️ Stack Tecnológico

- **React 18** - Framework UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Estilos
- **Shadcn/ui** - Componentes UI
- **React Router** - Navegación
- **Lucide React** - Iconos
- **Docker + Nginx** - Contenedorización y servidor web

## 📁 Estructura del proyecto

```
websita/
├── src/
│   ├── components/     # Componentes React
│   ├── pages/          # Páginas (Index, NotFound)
│   ├── contexts/       # Context providers (Language)
│   ├── hooks/          # Custom hooks
│   └── main.tsx        # Entry point
├── public/             # Assets estáticos
├── .git-hooks/         # Git hooks para auto-deploy
├── index.html          # HTML base
├── package.json        # Dependencias
├── Dockerfile          # Multi-stage build (Node + Nginx)
├── docker-compose.yml  # Orquestación Docker
├── .nginx.conf         # Configuración Nginx
├── deploy.sh           # Script de deploy
└── setup-server.sh     # Script de setup inicial
```

## 🌐 Deploy

### Build local
```bash
npm run build
# Los archivos listos para producción estarán en /dist
```

### Deploy con Docker
```bash
./deploy.sh
# Construye y despliega automáticamente
```

## 🔧 Troubleshooting

**El contenedor no inicia:**
```bash
docker-compose logs
```

**Limpiar y reconstruir:**
```bash
docker-compose down
docker system prune -a
./deploy.sh
```

**Verificar salud del contenedor:**
```bash
curl http://localhost:8080/health
# Debe responder: "healthy"
```

