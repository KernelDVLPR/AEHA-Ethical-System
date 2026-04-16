// ============================================================
// Servicio de Dashboard (Pantalla de resultados en vivo)
// Agrega datos de todas las secciones para el presentador
// ============================================================
const reactionService = require('./reactionService');
const voteService = require('./voteService');
const confesionService = require('./confesionService');

class DashboardService {
  /**
   * Obtener todos los resultados agregados para el dashboard
   * @returns {Object} Estadísticas completas
   */
  async obtenerResultados() {
    const [conteoPilares, estadisticasVotos, confesiones, topConfesiones] =
      await Promise.all([
        reactionService.obtenerConteos(),
        voteService.obtenerEstadisticas(),
        confesionService.obtenerTodas(100),
        confesionService.obtenerTopLiked(3),
      ]);

    // Extraer palabras de confesiones para nube de palabras
    const palabras = this.extraerPalabras(confesiones);

    return {
      pilares: conteoPilares,
      reglas: estadisticasVotos,
      confesiones: {
        total: confesiones.length,
        recientes: confesiones.slice(0, 10),
        topLiked: topConfesiones,
        nubePalabras: palabras,
      },
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Extraer y contar palabras para nube de palabras
   * @param {Array} confesiones
   * @returns {Array<{ texto: string, valor: number }>}
   */
  extraerPalabras(confesiones) {
    const conteo = {};
    const stopWords = new Set([
      'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas',
      'de', 'del', 'en', 'con', 'por', 'para', 'que', 'es',
      'y', 'o', 'no', 'se', 'mi', 'me', 'te', 'lo', 'le',
      'su', 'al', 'a', 'yo', 'tu', 'si', 'ya', 'muy',
      'mas', 'pero', 'como', 'soy', 'ser', 'hay', 'esto',
    ]);

    confesiones.forEach((c) => {
      const palabras = c.texto
        .toLowerCase()
        .replace(/[^a-záéíóúñü\s]/gi, '')
        .split(/\s+/)
        .filter((p) => p.length > 2 && !stopWords.has(p));

      palabras.forEach((p) => {
        conteo[p] = (conteo[p] || 0) + 1;
      });
    });

    return Object.entries(conteo)
      .map(([texto, valor]) => ({ texto, valor }))
      .sort((a, b) => b.valor - a.valor)
      .slice(0, 30);
  }
}

module.exports = new DashboardService();
