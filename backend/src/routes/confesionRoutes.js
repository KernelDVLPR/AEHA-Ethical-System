// ============================================================
// Rutas de Confesiones
// ============================================================
const { Router } = require('express');
const confesionController = require('../controllers/confesionController');
const { asyncHandler } = require('../middleware/errorHandler');
const { validarBody, schemaConfesion, schemaLike } = require('../middleware/validation');

const router = Router();

// POST /api/confesiones — Crear confesión anónima
router.post(
  '/',
  validarBody(schemaConfesion),
  asyncHandler((req, res) => confesionController.crear(req, res))
);

// PUT /api/confesiones/:id/like — Dar like a una confesión
router.put(
  '/:id/like',
  validarBody(schemaLike),
  asyncHandler((req, res) => confesionController.darLike(req, res))
);

module.exports = router;
