// ============================================================
// Controlador del Dashboard
// ============================================================
const dashboardService = require('../services/dashboardService');

class DashboardController {
  /**
   * GET /api/resultados
   * Obtener todos los resultados agregados para el dashboard
   */
  async obtenerResultados(req, res) {
    const resultados = await dashboardService.obtenerResultados();

    res.json({
      ok: true,
      data: resultados,
    });
  }
}

module.exports = new DashboardController();
