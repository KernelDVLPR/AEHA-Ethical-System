// ============================================================
// Lógica de arquetipos AEHA (Sección 4 — El Oráculo)
// Cálculo 100% local, no requiere base de datos
// ============================================================

// Preguntas del oráculo con opciones mapeadas a pilares
export const PREGUNTAS = [
  {
    id: 1,
    pregunta: '🔥 Si el mercado se derrumba, tú:',
    opciones: [
      { id: 'a', texto: 'Lloras en Excel y buscas oportunidades en el caos', pilar: 'ambicion' },
      { id: 'b', texto: 'Respiras profundo, aceptas y sigues adelante', pilar: 'estoicismo' },
      { id: 'c', texto: 'Ordenas pizza, abres Netflix y lo olvidas', pilar: 'hedonismo' },
      { id: 'd', texto: 'Donas tus ahorros a alguien que lo necesita más', pilar: 'altruismo' },
    ],
  },
  {
    id: 2,
    pregunta: '🌙 Es viernes 11pm, tu plan ideal es:',
    opciones: [
      { id: 'a', texto: 'Trabajar en tu side project hasta las 3am', pilar: 'ambicion' },
      { id: 'b', texto: 'Leer filosofía con una taza de té', pilar: 'estoicismo' },
      { id: 'c', texto: 'Fiesta, música y no recordar el lunes', pilar: 'hedonismo' },
      { id: 'd', texto: 'Ser voluntario en un refugio nocturno', pilar: 'altruismo' },
    ],
  },
  {
    id: 3,
    pregunta: '💡 Alguien te pide ayuda con su startup, tú:',
    opciones: [
      { id: 'a', texto: 'Pides equity y te conviertes en cofundador', pilar: 'ambicion' },
      { id: 'b', texto: 'Le das un consejo frío y racional, sin involucrarte', pilar: 'estoicismo' },
      { id: 'c', texto: '"Solo si hay cerveza gratis y buen ambiente"', pilar: 'hedonismo' },
      { id: 'd', texto: 'Ayudas gratis porque te nace hacerlo', pilar: 'altruismo' },
    ],
  },
];

// Definición de arquetipos
const ARQUETIPOS = {
  // Dominancias claras
  'ambicion-ambicion-ambicion': {
    nombre: 'El Magnate Imparable',
    emoji: '👑',
    descripcion: 'Naciste para conquistar. Tu agenda tiene agenda. Respiras KPIs y sueñas con el Forbes.',
    consejo: 'Recuerda: hasta el tiburón necesita descansar. No todo es conquista.',
  },
  'estoicismo-estoicismo-estoicismo': {
    nombre: 'El Sensei del Vacío',
    emoji: '🧘',
    descripcion: 'Nada te perturba. Eres la calma en el ojo del huracán. Marco Aurelio estaría orgulloso.',
    consejo: 'Está bien sentir cosas de vez en cuando. No todo es control.',
  },
  'hedonismo-hedonismo-hedonismo': {
    nombre: 'El Rey de la Fiesta Eterna',
    emoji: '🎉',
    descripcion: 'La vida es una celebración y tú eres el DJ. Si no hay diversión, no te interesa.',
    consejo: 'El postre es mejor después de la comida. Un poco de estructura no mata.',
  },
  'altruismo-altruismo-altruismo': {
    nombre: 'El Santo Moderno',
    emoji: '😇',
    descripcion: 'Das tanto que te olvidas de ti mismo. Eres la versión humana de Wikipedia: gratis y para todos.',
    consejo: 'Recuerda: no puedes servir de una taza vacía. Cuídate también.',
  },
};

// Combinaciones mixtas
const COMBINACIONES_MIXTAS = {
  'ambicion-estoicismo': {
    nombre: 'El Estratega Zen',
    emoji: '⚔️',
    descripcion: 'Planificas la conquista del mundo mientras meditas. Sun Tzu + Buda, el combo definitivo.',
  },
  'ambicion-hedonismo': {
    nombre: 'El Millonario Fiestero',
    emoji: '💎',
    descripcion: 'Trabajas duro, fiesteas más duro. Tu lema: "el dinero no compra la felicidad, pero sí el yate para buscarla".',
  },
  'ambicion-altruismo': {
    nombre: 'El Ambicioso Altruista',
    emoji: '🦸',
    descripcion: 'Conquistas imperios para regalarlos. Eres como Bill Gates pero con más carisma.',
  },
  'estoicismo-hedonismo': {
    nombre: 'El Estoico Hedonista',
    emoji: '🍷',
    descripcion: 'Meditas en la mañana, brindas en la noche. Citas a Marco Aurelio mientras pides otro shot.',
  },
  'estoicismo-altruismo': {
    nombre: 'El Monje Solidario',
    emoji: '🕊️',
    descripcion: 'Tan sereno que tu paz contagia. Ayudas sin ego, respiras sin prisa.',
  },
  'hedonismo-altruismo': {
    nombre: 'El Filántropo Festivo',
    emoji: '🎪',
    descripcion: 'Organizas fiestas benéficas. Tu idea de caridad incluye DJ y open bar.',
  },
};

/**
 * Calcular el arquetipo AEHA basado en las respuestas
 * @param {string[]} respuestas - Array de pilares elegidos (uno por pregunta)
 * @returns {Object} Arquetipo calculado
 */
export function calcularArquetipo(respuestas) {
  // Contar frecuencia de cada pilar
  const conteo = { ambicion: 0, estoicismo: 0, hedonismo: 0, altruismo: 0 };
  respuestas.forEach((pilar) => {
    conteo[pilar]++;
  });

  // Encontrar el pilar dominante
  const sorted = Object.entries(conteo).sort((a, b) => b[1] - a[1]);
  const key = respuestas.join('-');

  // ¿Es dominancia pura? (3 iguales)
  if (ARQUETIPOS[key]) {
    return ARQUETIPOS[key];
  }

  // Si hay empate o mezcla, buscar combinación
  const top2 = sorted.filter((s) => s[1] > 0).slice(0, 2).map((s) => s[0]);
  top2.sort(); // Ordenar para encontrar la key correcta

  const mixKey = top2.join('-');
  if (COMBINACIONES_MIXTAS[mixKey]) {
    return {
      ...COMBINACIONES_MIXTAS[mixKey],
      consejo: 'El equilibrio es tu superpoder. Sigue mezclando pilares como un DJ filosófico.',
    };
  }

  // Equilibrista Épico (todos diferentes)
  return {
    nombre: 'El Equilibrista Épico',
    emoji: '🎭',
    descripcion: 'Dominas los 4 pilares como un dios griego en patines. Eres la evolución humana en su máxima expresión.',
    consejo: 'No cambies nada. Ya ganaste el juego de la vida... probablemente.',
  };
}

/**
 * Calcular porcentaje de "Equilibrista Épico"
 * @param {string[]} respuestas
 * @returns {number} Porcentaje 0-100
 */
export function calcularPorcentajeEquilibrista(respuestas) {
  const conteo = { ambicion: 0, estoicismo: 0, hedonismo: 0, altruismo: 0 };
  respuestas.forEach((pilar) => {
    conteo[pilar]++;
  });

  const valores = Object.values(conteo);
  const max = Math.max(...valores);
  const min = Math.min(...valores);

  // Cuanto más equilibrado, más alto el porcentaje
  const diferencia = max - min;
  if (diferencia === 0) return 100;
  if (diferencia === 1) return 75;
  if (diferencia === 2) return 45;
  return 25;
}
