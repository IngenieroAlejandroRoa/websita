# 🚀 Auto-Deploy Setup

## En tu LXC Debian (Servidor Proxmox)

### Primera vez - Setup inicial:

```bash
# 1. Clona el repo
cd /opt
git clone https://github.com/IngenieroAlejandroRoa/websita.git
cd websita

# 2. Instala Docker y Docker Compose si no los tienes
sudo apt update
sudo apt install -y docker.io docker-compose

# 3. Da permisos al script
chmod +x auto-deploy.sh

# 4. Primera ejecución
./auto-deploy.sh
```

### Actualizaciones automáticas:

Cada vez que hagas `git push` desde tu máquina local, en el servidor ejecuta:

```bash
cd /opt/websita
./auto-deploy.sh
```

Esto automáticamente:
- ✅ Hace `git pull`
- ✅ Detiene el contenedor anterior
- ✅ Reconstruye la imagen con los cambios
- ✅ Levanta el nuevo contenedor
- ✅ La página estará en `http://TU_IP_LXC:8080`

### Ver logs:
```bash
docker-compose logs -f
```

### Detener:
```bash
docker-compose down
```

## Workflow completo:

1. **Local** → Haces cambios y `git push`
2. **Servidor LXC** → `cd /opt/websita && ./auto-deploy.sh`
3. **Listo** → Página actualizada en http://IP:8080
