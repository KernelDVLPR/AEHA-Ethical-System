// ============================================================
// Middleware de validación de request bodies
// Implementa validación básica por esquemas
// ============================================================
const { AppError } = require('./errorHandler');

/**
 * Crea un middleware que valida el body según un esquema
 * @param {Object} schema - Objeto con campos requeridos y sus tipos/validaciones
 */
function validarBody(schema) {
  return (req, res, next) => {
    const errores = [];

    for (const [campo, reglas] of Object.entries(schema)) {
      const valor = req.body[campo];

      // Campo requerido
      if (reglas.requerido && (valor === undefined || valor === null || valor === '')) {
        errores.push(`El campo '${campo}' es requerido`);
        continue;
      }

      // Si no es requerido y no existe, saltar validación
      if (valor === undefined || valor === null) continue;

      // Validar tipo
      if (reglas.tipo && typeof valor !== reglas.tipo) {
        errores.push(`El campo '${campo}' debe ser de tipo ${reglas.tipo}`);
        continue;
      }

      // Validar valores permitidos
      if (reglas.valores && !reglas.valores.includes(valor)) {
        errores.push(`El campo '${campo}' debe ser uno de: ${reglas.valores.join(', ')}`);
      }

      // Validar longitud máxima (strings)
      if (reglas.maxLength && typeof valor === 'string' && valor.length > reglas.maxLength) {
        errores.push(`El campo '${campo}' no puede exceder ${reglas.maxLength} caracteres`);
      }

      // Validar rango numérico
      if (reglas.min !== undefined && valor < reglas.min) {
        errores.push(`El campo '${campo}' debe ser al menos ${reglas.min}`);
      }
      if (reglas.max !== undefined && valor > reglas.max) {
        errores.push(`El campo '${campo}' no puede exceder ${reglas.max}`);
      }
    }

    if (errores.length > 0) {
      throw new AppError(errores.join('. '), 422);
    }

    next();
  };
}

// ─── Esquemas de validación ───

const schemaReaction = {
  pilar: {
    requerido: true,
    tipo: 'string',
    valores: ['ambicion', 'estoicismo', 'hedonismo', 'altruismo'],
  },
  emoji: { requerido: false, tipo: 'string', maxLength: 10 },
  comentario_corto: { requerido: false, tipo: 'string', maxLength: 160 },
  session_id: { requerido: true, tipo: 'string' },
};

const schemaVote = {
  regla_de_oro: { requerido: true, tipo: 'number', min: 1, max: 3 },
  opcion_elegida: {
    requerido: true,
    tipo: 'string',
    valores: ['oro_puro', 'pensarlo', 'rompio_cerebro'],
  },
  session_id: { requerido: true, tipo: 'string' },
};

const schemaConfesion = {
  texto: { requerido: true, tipo: 'string', maxLength: 160 },
  pilar_relacionado: {
    requerido: true,
    tipo: 'string',
    valores: ['ambicion', 'estoicismo', 'hedonismo', 'altruismo'],
  },
  session_id: { requerido: true, tipo: 'string' },
};

const schemaLike = {
  session_id: { requerido: true, tipo: 'string' },
};

module.exports = {
  validarBody,
  schemaReaction,
  schemaVote,
  schemaConfesion,
  schemaLike,
};
