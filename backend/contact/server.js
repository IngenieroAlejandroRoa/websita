import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();

// 0) Confiar en proxy (nginx)
app.set('trust proxy', 1);

// 1) Seguridad HTTP básica
app.use(helmet());

// 2) JSON body
app.use(express.json({ limit: "50kb" }));

// 3) CORS - Permite localhost en desarrollo
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.ALLOWED_ORIGIN,
      'https://www.alejandroroa.engineer',
      'http://localhost:8080',
      'http://192.168.1.55:8080',
      'http://localhost:5173',
      'http://localhost:3000',
    ];
    
    // Permite requests sin origin (Postman, curl, nginx proxy)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
};

app.use(cors(corsOptions));

// 4) Rate limit (anti spam)
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min
  max: 10, // max 10 requests por IP cada 10 min
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/", limiter);

// 5) Healthcheck (para monitoreo)
app.get("/api/health", (req, res) => res.json({ ok: true }));

// 6) Validaciones simples (sin librerías extra)
function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isNonEmptyString(s, maxLen) {
  return typeof s === "string" && s.trim().length > 0 && s.length <= maxLen;
}

// 7) Transporter SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message, [process.env.HONEYPOT_FIELD]: honeypot } = req.body || {};

    // Honeypot: si viene lleno, casi seguro es bot
    if (honeypot && String(honeypot).trim().length > 0) {
      return res.status(200).json({ ok: true }); // responde OK para no darle feedback al bot
    }

    // Validaciones
    if (!isNonEmptyString(name, 100)) return res.status(400).json({ error: "Nombre inválido" });
    if (!isValidEmail(email)) return res.status(400).json({ error: "Email inválido" });
    if (!isNonEmptyString(message, 3000)) return res.status(400).json({ error: "Mensaje inválido" });

    // Construye el correo
    const subject = `Nuevo contacto: ${name}`;
    const text =
`Nuevo mensaje desde el portafolio

Nombre: ${name}
Email: ${email}

Mensaje:
${message}

IP: ${req.ip}
User-Agent: ${req.headers["user-agent"] || ""}`

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL,
      replyTo: email, // clave para responder al usuario
      subject,
      text,
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error("CONTACT_ERROR:", err?.message || err);
    return res.status(500).json({ error: "Error enviando el mensaje" });
  }
});

app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`Contact API running on http://0.0.0.0:${process.env.PORT}`);
});
