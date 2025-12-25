# Usa una imagen base de Nginx
FROM nginx:alpine

# Borra la configuración default de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia el contenido de tu web (HTML/CSS/JS) al directorio web de Nginx
COPY index.html styles.css main.js /usr/share/nginx/html/

# Exponer el puerto 80
EXPOSE 80

# El contenedor ejecutará Nginx en modo foreground
CMD ["nginx", "-g", "daemon off;"]

