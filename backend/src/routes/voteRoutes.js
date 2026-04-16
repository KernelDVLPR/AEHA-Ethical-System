// ============================================================
// Rutas de Votos (Reglas de Oro)
// ============================================================
const { Router } = require('express');
const voteController = require('../controllers/voteController');
const { asyncHandler } = require('../middleware/errorHandler');
const { validarBody, schemaVote } = require('../middleware/validation');

const router = Router();

// POST /api/votes — Registrar juicio de regla de oro
router.post(
  '/',
  validarBody(schemaVote),
  asyncHandler((req, res) => voteController.crear(req, res))
);

module.exports = router;
