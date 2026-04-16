// ============================================================
// Servicio de Confesiones (Sección 3 — La Confesioneta AEHA)
// ============================================================
const supabase = require('../config/supabase');
const { AppError } = require('../middleware/errorHandler');
const { censurarTexto } = require('../middleware/profanityFilter');

class ConfesionService {
  /**
   * Crear una nueva confesión con filtro de groserías aplicado
   * @param {Object} datos - { texto, pilar_relacionado, session_id }
   * @returns {Object} La confesión creada
   */
  async crear(datos) {
    // Aplicar filtro de groserías al texto
    const textoCensurado = censurarTexto(datos.texto);

    const { data, error } = await supabase
      .from('confesiones')
      .insert({
        texto: textoCensurado,
        pilar_relacionado: datos.pilar_relacionado,
        session_id: datos.session_id,
        likes: 0,
      })
      .select()
      .single();

    if (error) throw new AppError('Error al guardar tu confesión. Intenta de nuevo.', 500);
    return data;
  }

  /**
   * Dar like a una confesión (con prevención de duplicados)
   * @param {string} confesionId - UUID de la confesión
   * @param {string} sessionId - UUID de sesión del usuario
   * @returns {Object} La confesión actualizada
   */
  async darLike(confesionId, sessionId) {
    // Verificar que la confesión existe
    const { data: confesion, error: errorBuscar } = await supabase
      .from('confesiones')
      .select('id, likes')
      .eq('id', confesionId)
      .single();

    if (errorBuscar || !confesion) {
      throw new AppError('Confesión no encontrada', 404);
    }

    // Verificar si ya dio like
    const { data: likeExistente } = await supabase
      .from('confesion_likes')
      .select('id')
      .eq('confesion_id', confesionId)
      .eq('session_id', sessionId)
      .limit(1);

    if (likeExistente && likeExistente.length > 0) {
      throw new AppError('Ya le diste ❤️ a esta confesión', 409);
    }

    // Registrar el like
    const { error: errorLike } = await supabase
      .from('confesion_likes')
      .insert({ confesion_id: confesionId, session_id: sessionId });

    if (errorLike) throw new AppError('Error al registrar tu like', 500);

    // Incrementar contador de likes
    const { data: actualizada, error: errorUpdate } = await supabase
      .from('confesiones')
      .update({ likes: confesion.likes + 1 })
      .eq('id', confesionId)
      .select()
      .single();

    if (errorUpdate) throw new AppError('Error al actualizar likes', 500);
    return actualizada;
  }

  /**
   * Obtener todas las confesiones ordenadas por recientes
   * @param {number} limite - Límite de confesiones a devolver
   * @returns {Array} Lista de confesiones
   */
  async obtenerTodas(limite = 50) {
    const { data, error } = await supabase
      .from('confesiones')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limite);

    if (error) throw new AppError('Error al obtener confesiones', 500);
    return data || [];
  }

  /**
   * Obtener top N confesiones más likeadas
   * @param {number} n
   * @returns {Array}
   */
  async obtenerTopLiked(n = 3) {
    const { data, error } = await supabase
      .from('confesiones')
      .select('*')
      .order('likes', { ascending: false })
      .limit(n);

    if (error) throw new AppError('Error al obtener top confesiones', 500);
    return data || [];
  }
}

module.exports = new ConfesionService();
