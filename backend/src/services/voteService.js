// ============================================================
// Servicio de Votos (Sección 2 — Juicio de las Reglas de Oro)
// ============================================================
const supabase = require('../config/supabase');
const { AppError } = require('../middleware/errorHandler');

class VoteService {
  /**
   * Verificar si un usuario ya votó para una regla específica
   * @param {string} sessionId
   * @param {number} reglaNro
   * @returns {boolean}
   */
  async yaVotoRegla(sessionId, reglaNro) {
    const { data, error } = await supabase
      .from('votes')
      .select('id')
      .eq('session_id', sessionId)
      .eq('regla_de_oro', reglaNro)
      .limit(1);

    if (error) throw new AppError('Error al verificar voto previo', 500);
    return data && data.length > 0;
  }

  /**
   * Crear un nuevo voto para una regla de oro
   * @param {Object} datos - { regla_de_oro, opcion_elegida, session_id }
   * @returns {Object} El voto creado
   */
  async crear(datos) {
    const yaVoto = await this.yaVotoRegla(datos.session_id, datos.regla_de_oro);
    if (yaVoto) {
      throw new AppError(
        `Ya juzgaste la Regla #${datos.regla_de_oro}. ¡El juicio es inapelable! ⚖️`,
        409
      );
    }

    const { data, error } = await supabase
      .from('votes')
      .insert({
        regla_de_oro: datos.regla_de_oro,
        opcion_elegida: datos.opcion_elegida,
        session_id: datos.session_id,
      })
      .select()
      .single();

    if (error) throw new AppError('Error al registrar tu juicio. Intenta de nuevo.', 500);
    return data;
  }

  /**
   * Obtener estadísticas de votos por regla
   * @returns {Object} Conteos agrupados por regla y opción
   */
  async obtenerEstadisticas() {
    const { data, error } = await supabase
      .from('votes')
      .select('regla_de_oro, opcion_elegida');

    if (error) throw new AppError('Error al obtener estadísticas de votos', 500);

    const stats = {};
    for (let i = 1; i <= 3; i++) {
      stats[i] = {
        oro_puro: 0,
        pensarlo: 0,
        rompio_cerebro: 0,
        total: 0,
      };
    }

    if (data) {
      data.forEach((v) => {
        stats[v.regla_de_oro][v.opcion_elegida]++;
        stats[v.regla_de_oro].total++;
      });
    }

    return stats;
  }
}

module.exports = new VoteService();
