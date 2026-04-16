// ============================================================
// Filtro de palabras ofensivas (español e inglés)
// Se aplica como middleware antes de guardar confesiones
// ============================================================

// Lista básica de palabras ofensivas en español e inglés
// Se puede expandir fácilmente
const PALABRAS_PROHIBIDAS = [
  // Español
  'puta', 'puto', 'mierda', 'coño', 'joder', 'marica',
  'pendejo', 'pendeja', 'estupido', 'estupida', 'idiota',
  'imbecil', 'cabron', 'cabrona', 'chingar', 'verga',
  'culero', 'culera', 'mamón', 'mamona', 'pinche',
  // Inglés
  'fuck', 'shit', 'ass', 'bitch', 'damn', 'dick',
  'bastard', 'crap', 'cunt', 'whore', 'slut',
];

/**
 * Verifica si un texto contiene palabras ofensivas
 * @param {string} texto - Texto a verificar
 * @returns {{ limpio: boolean, palabrasEncontradas: string[] }}
 */
function verificarTexto(texto) {
  if (!texto || typeof texto !== 'string') {
    return { limpio: true, palabrasEncontradas: [] };
  }

  const textoNormalizado = texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // Quitar acentos

  const palabrasEncontradas = PALABRAS_PROHIBIDAS.filter((palabra) => {
    const palabraNormalizada = palabra
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    // Buscar la palabra como palabra completa (no substring)
    const regex = new RegExp(`\\b${palabraNormalizada}\\b`, 'i');
    return regex.test(textoNormalizado);
  });

  return {
    limpio: palabrasEncontradas.length === 0,
    palabrasEncontradas,
  };
}

/**
 * Censurar palabras ofensivas reemplazándolas con asteriscos
 * @param {string} texto - Texto a censurar
 * @returns {string} Texto censurado
 */
function censurarTexto(texto) {
  if (!texto) return texto;

  let resultado = texto;
  const textoNormalizado = texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  PALABRAS_PROHIBIDAS.forEach((palabra) => {
    const palabraNormalizada = palabra
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const regex = new RegExp(`\\b${palabraNormalizada}\\b`, 'gi');
    resultado = resultado.replace(regex, '*'.repeat(palabra.length));
  });

  return resultado;
}

module.exports = { verificarTexto, censurarTexto, PALABRAS_PROHIBIDAS };
