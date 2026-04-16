// ============================================================
// App Express — Configuración central de la aplicación
// Principio Abierto/Cerrado: fácil de extender con nuevas rutas
// ============================================================
const express = require("express");
const cors = require("cors");
const { FRONTEND_URL } = require("./config/env");
const { errorHandler } = require("./middleware/errorHandler");

// Importar rutas
const reactionRoutes = require("./routes/reactionRoutes");
const voteRoutes = require("./routes/voteRoutes");
const confesionRoutes = require("./routes/confesionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// ─── Middleware Global ───
app.use(
  cors({
    origin: [FRONTEND_URL, "http://localhost:5173", "http://localhost:4173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json({ limit: "1mb" }));

// ─── Ruta de salud ───
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    mensaje: "🏛️ AEHA Backend está vivo y respirando estoicamente",
    timestamp: new Date().toISOString(),
  });
});

// ─── Registrar Rutas ───
app.use("/api/reactions", reactionRoutes);
app.use("/api/votes", voteRoutes);
app.use("/api/confesiones", confesionRoutes);
app.use("/api/resultados", dashboardRoutes);

// ─── Ruta 404 ───
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    error: `Ruta ${req.method} ${req.path} no encontrada. ¿Te perdiste, equilibrista?`,
  });
});

// ─── Manejo de errores global ───
app.use(errorHandler);

module.exports = app;
