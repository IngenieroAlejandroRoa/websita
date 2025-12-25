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

## 📦 Comandos disponibles

- `npm run dev` - Servidor de desarrollo (hot reload)
- `npm run build` - Construir para producción
- `npm run preview` - Previsualizar build de producción
- `npm run lint` - Linter de código

## 🛠️ Stack Tecnológico

- **React 18** - Framework UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Estilos
- **Shadcn/ui** - Componentes UI
- **React Router** - Navegación
- **Lucide React** - Iconos

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
├── index.html          # HTML base
├── package.json        # Dependencias
└── Dockerfile          # Configuración Docker
```

## 🌐 Deploy

El proyecto se construye automáticamente con:
```bash
npm run build
```

Los archivos listos para producción estarán en `/dist`
