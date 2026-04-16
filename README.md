# 🏛️ AEHA — El Código del Equilibrista Épico

> **A**mbición. **E**stoicismo. **H**edonismo. **A**ltruismo.
> Tu vida épica empieza aquí.

Aplicación web interactiva y gamificada para recoger feedback anónimo durante una presentación en vivo sobre el sistema ético AEHA.

![AEHA](https://img.shields.io/badge/AEHA-Sistema%20%C3%89tico-gold)
![Stack](https://img.shields.io/badge/Stack-React%20%2B%20Express%20%2B%20Supabase-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📦 Stack Tecnológico

| Capa              | Tecnología                                          |
| ----------------- | --------------------------------------------------- |
| **Frontend**      | React 19 + Vite 6 + Tailwind CSS v4 + Framer Motion |
| **Backend**       | Node.js + Express 4 (MVC + SOLID)                   |
| **Base de datos** | Supabase (PostgreSQL)                               |
| **Tiempo real**   | Supabase Realtime                                   |
| **Deploy**        | Compatible con Railway, Render, Vercel              |

---

## 🏗️ Estructura del Proyecto

```
AEHA Ethical System/
├── frontend/                  # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/        # Componentes reutilizables
│   │   ├── pages/             # Páginas/secciones principales
│   │   ├── hooks/             # Custom hooks
│   │   ├── services/          # API client
│   │   ├── lib/               # Supabase client, lógica de arquetipos
│   │   ├── App.jsx            # Router y vista principal
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Design system
│   ├── index.html
│   ├── vite.config.js
│   └── .env.example
├── backend/                   # Express API (MVC)
│   ├── src/
│   │   ├── config/            # Supabase client, env config
│   │   ├── controllers/       # Request handlers
│   │   ├── services/          # Business logic
│   │   ├── routes/            # Route definitions
│   │   └── middleware/        # CORS, validation, profanity filter
│   ├── server.js              # Entry point
│   └── .env.example
├── supabase/
│   └── schema.sql             # SQL para crear tablas
├── .env.example
└── README.md
```

---

## 🚀 Instalación y Configuración

### 1. Crear proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea un nuevo proyecto
2. En el **SQL Editor**, ejecuta el contenido de `supabase/schema.sql`
3. Ve a **Settings > API** y copia:
   - **Project URL** → `SUPABASE_URL`
   - **anon/public key** → `SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ solo para el backend)

### 2. Habilitar Realtime

1. En Supabase Dashboard, ve a **Database > Replication**
2. Habilita Realtime para las tablas: `reactions`, `votes`, `confesiones`

### 3. Configurar variables de entorno

```bash
# En la raíz del proyecto, crea .env
cp .env.example .env
# Edita .env con tus credenciales de Supabase

# En el frontend, crea .env
cp frontend/.env.example frontend/.env
# Edita frontend/.env con VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY
```

### 4. Instalar dependencias

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 5. Ejecutar en desarrollo

```bash
# Terminal 1 — Backend (puerto 3001)
cd backend
npm run dev

# Terminal 2 — Frontend (puerto 5173)
cd frontend
npm run dev
```

La app estará disponible en:

- **Audiencia:** http://localhost:5173
- **Dashboard en vivo:** http://localhost:5173/live

---

## 🎮 Secciones de la App

### Sección 1 — 🏛️ ¿Con qué pilar resonaste más?

Votación rápida con cards animadas. Confetti al votar. Resultados en tiempo real.

### Sección 2 — ⚖️ El Juicio de las Reglas de Oro

Swipe/decisión estilo Tinder filosófico con las 3 Reglas de Oro del sistema.

### Sección 3 — 🤫 La Confesioneta AEHA

Muro de confesiones anónimas con likes en tiempo real. Filtro de groserías incluido.

### Sección 4 — 🔮 El Oráculo AEHA

Mini-test de 3 preguntas absurdas que revela tu arquetipo AEHA. Compartible.

### Dashboard — 📊 Resultados en Vivo

Vista para el presentador con estadísticas, gráficos, top confesiones y nube de palabras.

---

## 🔌 API Endpoints

| Método | Ruta                        | Descripción                      |
| ------ | --------------------------- | -------------------------------- |
| `POST` | `/api/reactions`            | Registrar voto de pilar          |
| `POST` | `/api/votes`                | Registrar juicio de regla de oro |
| `POST` | `/api/confesiones`          | Crear confesión anónima          |
| `PUT`  | `/api/confesiones/:id/like` | Dar like a una confesión         |
| `GET`  | `/api/resultados`           | Obtener resultados del dashboard |
| `GET`  | `/api/health`               | Health check del servidor        |

---

## 🎨 Design System

| Token        | Valor                      |
| ------------ | -------------------------- |
| Background   | `#000000` (negro profundo) |
| Primary Gold | `#FFD700` → `#FFA500`      |
| Turquoise    | `#00D4AA` → `#00BCD4`      |
| Neon Pink    | `#FF0080` → `#FF1493`      |
| Font Títulos | Bebas Neue                 |
| Font Cuerpo  | Inter                      |

---

## 🚢 Deploy

### Railway / Render

1. Despliega el backend como un servicio Node.js
2. Despliega el frontend como un sitio estático (o Vite SSR)
3. Configura las variables de entorno en cada servicio
4. Apunta el proxy del frontend al URL del backend

### Vercel (solo frontend)

1. Despliega el frontend en Vercel
2. Despliega el backend en Railway/Render
3. Actualiza `VITE_API_URL` con el URL del backend

---

## 📝 Licencia

MIT — Hecho con 🏛️ y mucho ☕ para que AEHA se viva, no solo se escuche.
