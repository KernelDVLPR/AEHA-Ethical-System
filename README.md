# 🏛️ AEHA — El Código del Equilibrista Épico

> **A**mbición. **E**stoicismo. **H**edonismo. **A**ltruismo.
> Tu vida épica empieza aquí.

Aplicación web interactiva y gamificada diseñada para recoger feedback anónimo durante una presentación en vivo sobre el sistema ético AEHA.

![AEHA](https://img.shields.io/badge/AEHA-Sistema%20%C3%89tico-gold)
![Stack](https://img.shields.io/badge/Stack-React%20%2B%20Express%20%2B%20Supabase-blue)
![Estado](https://img.shields.io/badge/Despliegue-Archivado-inactive)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🛑 Estado del Proyecto y Despliegue

> [!NOTE]
> **Nota de conservación:** Este proyecto se encuentra actualmente **desactivado/archivado**. El frontend estuvo alojado en **Vercel**, el backend API en **Render** y la base de datos relacional en **Supabase**. He decidido suspender el despliegue activo con el fin de optimizar el consumo de recursos de mis plataformas de hosting para futuros desarrollos. Sin embargo, el código permanece completamente funcional y listo para ser clonado e inicializado en local.

---

## 🧠 Conocimientos y Habilidades Evidenciados

Este proyecto sirve como demostración técnica de buenas prácticas y conocimientos sólidos en ingeniería de software:

- **Arquitectura Limpia y Principios SOLID:** El backend está diseñado utilizando una arquitectura estructurada en capas (Rutas $\rightarrow$ Middlewares $\rightarrow$ Controladores $\rightarrow$ Servicios) adhiriéndose al principio de **Responsabilidad Única** (SRP) y permitiendo su extensión de forma sencilla (**Abierto/Cerrado**).
- **Base de Datos Relacional y Seguridad RLS:** Diseño relacional en PostgreSQL mediante Supabase. Implementación de **Row Level Security (RLS)** para asegurar operaciones públicas controladas y uso de **restricciones de unicidad compuesta** (`UNIQUE(confesion_id, session_id)`) para impedir la duplicación de interacciones por sesión.
- **Integración en Tiempo Real:** Configuración y consumo de **Supabase Realtime** en el frontend para actualizar métricas, estadísticas, y el muro de confesiones del Dashboard del presentador de manera reactiva instantánea y sin sobrecarga del servidor.
- **Algoritmos Locales Optimizados:** Procesamiento local para el módulo "El Oráculo", evaluando combinaciones dinámicas complejas para determinar arquetipos y porcentajes de equilibrio del usuario directamente en el cliente, eliminando llamadas de red y guardado innecesario en base de datos.
- **Filtros e Integridad de Datos:** Desarrollo de un middleware de filtrado de lenguaje ofensivo (_Profanity Filter_) personalizado en Node.js, que normaliza caracteres (eliminando diacríticos/acentos) y aplica expresiones regulares precisas para censurar de forma nativa en inglés y español.
- **UI/UX Fluida y Atractiva:** Interfaz construida sobre React 19 y Bootstrap 5 con animaciones sutiles y micro-interacciones a través de `framer-motion`, y físicas dinámicas con `canvas-confetti`.

---

## 📦 Stack Tecnológico

| Capa              | Tecnología                                      |
| ----------------- | ----------------------------------------------- |
| **Frontend**      | React 19 + Vite 6 + Bootstrap 5 + Framer Motion |
| **Backend**       | Node.js + Express 4 (MVC + SOLID)               |
| **Base de datos** | Supabase (PostgreSQL)                           |
| **Tiempo real**   | Supabase Realtime                               |

---

## 🏗️ Estructura del Proyecto

```
AEHA Ethical System/
├── frontend/                  # React + Vite + Bootstrap
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

1. Ve a [supabase.com](https://supabase.com) y crea un nuevo proyecto de forma gratuita.
2. En el **SQL Editor**, ejecuta todo el contenido de [supabase/schema.sql](file:///home/kerneldvlpr/Documentos/Workspaces/WORK1/AEHA-Ethical-System/supabase/schema.sql).
3. Ve a **Settings > API** y copia:
   - **Project URL** $\rightarrow$ `SUPABASE_URL`
   - **anon/public key** $\rightarrow$ `SUPABASE_ANON_KEY`
   - **service_role key** $\rightarrow$ `SUPABASE_SERVICE_ROLE_KEY` (⚠️ Mantener confidencial y usar solo en el backend).

### 2. Habilitar Realtime

1. En Supabase Dashboard, dirígete a **Database > Replication**.
2. Habilita la replicación en Realtime para las tablas: `reactions`, `votes` y `confesiones`.

### 3. Configurar variables de entorno

```bash
# En la raíz del proyecto, crea .env
cp .env.example .env
# Edita .env con tus credenciales de Supabase

# En el frontend, crea su respectivo .env
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

La app estará disponible localmente en:

- **Audiencia:** http://localhost:5173
- **Dashboard en vivo:** http://localhost:5173/live

---

## 🎮 Secciones de la App

### Sección 1 — 🏛️ ¿Con qué pilar resonaste más?

Votación rápida con tarjetas animadas, efectos visuales dinámicos al interactuar y actualización inmediata en el dashboard de resultados.

### Sección 2 — ⚖️ El Juicio de las Reglas de Oro

Swipe interactivo de cartas (estilo Tinder) para clasificar y juzgar los tres preceptos centrales del sistema ético AEHA.

### Sección 3 — 🤫 La Confesioneta AEHA

Muro de confesiones anónimas grupales con soporte de likes en tiempo real y filtrado integrado de lenguaje vulgar.

### Sección 4 — 🔮 El Oráculo AEHA

Evaluador ético interactivo de 3 preguntas situacionales que determina el arquetipo moral del usuario procesando los resultados en el cliente.

### Dashboard — 📊 Resultados en Vivo

Tablero de control interactivo pensado para el expositor que visualiza en tiempo real gráficos estadísticos de los votos, el top de confesiones más populares y un feed continuo.

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

- **Fondo:** `#000000` (Negro puro/profundo).
- **Pilar Ambición:** `#FFD700` $\rightarrow$ `#FFA500` (Oro primario).
- **Pilar Estoicismo/Hedonismo/Altruismo:** Gradientes armónicos que alternan entre turquesa brillante (`#00D4AA`), rosado neón (`#FF0080`), y azules profundos.
- **Tipografía:** _Bebas Neue_ para títulos y _Inter_ para cuerpo.

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.
