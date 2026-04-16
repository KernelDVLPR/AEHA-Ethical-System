// ============================================================
// Middleware de manejo centralizado de errores
// ============================================================

/**
 * Wrapper para controladores async — evita try/catch repetitivo
 * @param {Function} fn - Función del controlador
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/**
 * Middleware de manejo de errores global
 */
function errorHandler(err, req, res, _next) {
  console.error("❌ Error:", err.message);
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const mensaje = err.isOperacional
    ? err.message
    : "Error interno del servidor. Intenta de nuevo.";

  res.status(statusCode).json({
    ok: false,
    error: mensaje,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}

/**
 * Clase para errores operacionales con código HTTP
 */
class AppError extends Error {
  constructor(mensaje, statusCode = 400) {
    super(mensaje);
    this.statusCode = statusCode;
    this.isOperacional = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { asyncHandler, errorHandler, AppError };
