// ============================================================
// Controlador de Reacciones
// Capa delgada: delega lógica al servicio
// ============================================================
const reactionService = require('../services/reactionService');

// Mensajes graciosos por pilar
const MENSAJES_PILAR = {
  ambicion: '🚀 ¡A conquistar el mundo! Pero primero... este café.',
  estoicismo: '🧘 Respira. Exhala. El caos es solo una ilusión... más o menos.',
  hedonismo: '🎉 ¡La vida es una fiesta y tú acabas de llegar! Bienvenido/a.',
  altruismo: '💝 El mundo necesita más gente como tú. No, en serio.',
};

class ReactionController {
  /**
   * POST /api/reactions
   * Registrar una votación de pilar
   */
  async crear(req, res) {
    const { pilar, emoji, comentario_corto, session_id } = req.body;

    const reaccion = await reactionService.crear({
      pilar,
      emoji,
      comentario_corto,
      session_id,
    });

    res.status(201).json({
      ok: true,
      data: reaccion,
      mensaje: MENSAJES_PILAR[pilar] || '¡Gracias por votar!',
    });
  }
}

module.exports = new ReactionController();
