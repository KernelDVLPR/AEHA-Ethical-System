// ============================================================
// Servicio de Reacciones (Sección 1 — Votación de pilares)
// Principio de Responsabilidad Única: solo lógica de negocio
// ============================================================
const supabase = require('../config/supabase');
const { AppError } = require('../middleware/errorHandler');

class ReactionService {
  /**
   * Verificar si un usuario ya votó en esta sección
   * @param {string} sessionId - UUID de sesión del usuario
   * @returns {boolean}
   */
  async yaVoto(sessionId) {
    const { data, error } = await supabase
      .from('reactions')
      .select('id')
      .eq('session_id', sessionId)
      .limit(1);

    if (error) throw new AppError('Error al verificar voto previo', 500);
    return data && data.length > 0;
  }

  /**
   * Crear una nueva reacción/voto de pilar
   * @param {Object} datos - { pilar, emoji, comentario_corto, session_id }
   * @returns {Object} La reacción creada
   */
  async crear(datos) {
    // Verificar duplicados
    const yaVotoAntes = await this.yaVoto(datos.session_id);
    if (yaVotoAntes) {
      throw new AppError('Ya votaste en esta sección. ¡Tu voz ya fue escuchada! 🎤', 409);
    }

    const { data, error } = await supabase
      .from('reactions')
      .insert({
        pilar: datos.pilar,
        emoji: datos.emoji || null,
        comentario_corto: datos.comentario_corto || null,
        session_id: datos.session_id,
      })
      .select()
      .single();

    if (error) throw new AppError('Error al registrar tu voto. Intenta de nuevo.', 500);
    return data;
  }

  /**
   * Obtener conteo de votos por pilar
   * @returns {Object} { ambicion: N, estoicismo: N, hedonismo: N, altruismo: N, total: N }
   */
  async obtenerConteos() {
    const { data, error } = await supabase
      .from('reactions')
      .select('pilar');

    if (error) throw new AppError('Error al obtener resultados', 500);

    const conteos = {
      ambicion: 0,
      estoicismo: 0,
      hedonismo: 0,
      altruismo: 0,
      total: 0,
    };

    if (data) {
      data.forEach((r) => {
        conteos[r.pilar] = (conteos[r.pilar] || 0) + 1;
        conteos.total++;
      });
    }

    return conteos;
  }
}

module.exports = new ReactionService();
