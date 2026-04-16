// ============================================================
// Rutas del Dashboard
// ============================================================
const { Router } = require('express');
const dashboardController = require('../controllers/dashboardController');
const { asyncHandler } = require('../middleware/errorHandler');

const router = Router();

// GET /api/resultados — Obtener resultados en vivo
router.get(
  '/',
  asyncHandler((req, res) => dashboardController.obtenerResultados(req, res))
);

module.exports = router;
