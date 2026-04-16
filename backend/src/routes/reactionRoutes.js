// ============================================================
// Rutas de Reacciones
// ============================================================
const { Router } = require('express');
const reactionController = require('../controllers/reactionController');
const { asyncHandler } = require('../middleware/errorHandler');
const { validarBody, schemaReaction } = require('../middleware/validation');

const router = Router();

// POST /api/reactions — Registrar voto de pilar
router.post(
  '/',
  validarBody(schemaReaction),
  asyncHandler((req, res) => reactionController.crear(req, res))
);

module.exports = router;
