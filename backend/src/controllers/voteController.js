// ============================================================
// Controlador de Votos (Reglas de Oro)
// ============================================================
const voteService = require('../services/voteService');

class VoteController {
  /**
   * POST /api/votes
   * Registrar un juicio sobre una regla de oro
   */
  async crear(req, res) {
    const { regla_de_oro, opcion_elegida, session_id } = req.body;

    const voto = await voteService.crear({
      regla_de_oro,
      opcion_elegida,
      session_id,
    });

    res.status(201).json({
      ok: true,
      data: voto,
      mensaje: '⚖️ ¡Tu juicio ha sido registrado!',
    });
  }
}

module.exports = new VoteController();
