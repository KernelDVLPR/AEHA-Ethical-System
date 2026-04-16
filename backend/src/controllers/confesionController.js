// ============================================================
// Controlador de Confesiones
// ============================================================
const confesionService = require('../services/confesionService');

class ConfesionController {
  /**
   * POST /api/confesiones
   * Crear una nueva confesión anónima
   */
  async crear(req, res) {
    const { texto, pilar_relacionado, session_id } = req.body;

    const confesion = await confesionService.crear({
      texto,
      pilar_relacionado,
      session_id,
    });

    res.status(201).json({
      ok: true,
      data: confesion,
      mensaje: '🤫 Tu secreto está a salvo... bueno, casi.',
    });
  }

  /**
   * PUT /api/confesiones/:id/like
   * Dar like a una confesión
   */
  async darLike(req, res) {
    const { id } = req.params;
    const { session_id } = req.body;

    const confesion = await confesionService.darLike(id, session_id);

    res.json({
      ok: true,
      data: confesion,
      mensaje: '❤️ ¡Te identificaste!',
    });
  }
}

module.exports = new ConfesionController();
