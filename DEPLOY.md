# Guía de Despliegue en LXC

## Instalación Inicial en el LXC

### 1. Instalar Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
```

### 2. Clonar el repositorio (si no está)
```bash
git clone https://github.com/IngenieroAlejandroRoa/websita.git
cd websita
```

### 3. Primera instalación
```bash
npm install
npm run build
```

### 4. Instalar PM2 para servir la página (recomendado)
```bash
npm install -g pm2
pm2 start "npx serve dist -l 3000" --name websita
pm2 startup
pm2 save
```

## Auto-deploy con Git Pull

Una vez configurado, cada vez que hagas:

```bash
git pull
```

El hook `post-merge` automáticamente:
1. ✅ Instalará dependencias si es necesario
2. ✅ Hará el build
3. ✅ Reiniciará PM2 si está instalado

## Comandos Útiles

### Ver logs de PM2
```bash
pm2 logs websita
```

### Reiniciar manualmente
```bash
pm2 restart websita
```

### Build manual
```bash
./deploy.sh
```

### Servir sin PM2
```bash
npx serve dist -l 3000
```

## Acceder a la página

- Local: http://localhost:3000
- Red: http://[IP-DEL-LXC]:3000
