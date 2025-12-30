# Contact API Backend

API para el formulario de contacto del portfolio.

## Variables de Entorno

Crear archivo `.env`:

```env
PORT=3001
ALLOWED_ORIGIN=https://alejandroroa.engineer
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-app-password
TO_EMAIL=destino@gmail.com
HONEYPOT_FIELD=company
```

## Desarrollo Local

```bash
npm install
npm start
```

## Docker

Ver instrucciones en `/DEPLOYMENT.md` del proyecto principal.
