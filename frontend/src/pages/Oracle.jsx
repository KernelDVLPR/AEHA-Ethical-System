// ============================================================
// Página: Oracle — El Oráculo AEHA — Bootstrap Edition
// ============================================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PREGUNTAS, calcularArquetipo, calcularPorcentajeEquilibrista } from '../lib/archetypes';

export default function Oracle() {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas]         = useState([]);
  const [completado, setCompletado]         = useState(false);
  const [resultado, setResultado]           = useState(null);
  const [copiado, setCopiado]               = useState(false);

  const handleRespuesta = (opcion) => {
    const nuevas = [...respuestas, opcion.pilar];
    setRespuestas(nuevas);
    if (preguntaActual < PREGUNTAS.length - 1) {
      setPreguntaActual(p => p + 1);
    } else {
      const arquetipo = calcularArquetipo(nuevas);
      const porcentaje = calcularPorcentajeEquilibrista(nuevas);
      setResultado({ ...arquetipo, porcentaje });
      setCompletado(true);
    }
  };

  const handleCompartir = async () => {
    const txt = `🏛️ Mi arquetipo AEHA es: ${resultado.emoji} ${resultado.nombre}\n\n"${resultado.descripcion}"\n\n¡Soy un ${resultado.porcentaje}% Equilibrista Épico!\n\n🔗 Descubre tu arquetipo en AEHA — El Código del Equilibrista Épico`;
    try {
      await navigator.clipboard.writeText(txt);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = txt;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const handleReiniciar = () => {
    setPreguntaActual(0);
    setRespuestas([]);
    setCompletado(false);
    setResultado(null);
  };

  /* ── Resultado ── */
  if (completado && resultado) {
    return (
      <section className="py-5" id="oraculo">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 190, damping: 24 }}
                className="glass-card position-relative overflow-hidden p-4 p-md-5 text-center"
                style={{ border: '1px solid rgba(255, 215, 0, 0.2)', boxShadow: '0 0 80px -20px rgba(255,215,0,0.15)' }}
              >
                {/* Glow fondo */}
                <div className="position-absolute top-0 start-0 w-100 h-100 pointer-events-none" 
                     style={{ background: 'linear-gradient(to bottom, rgba(255,215,0,0.05), transparent)' }} />

                <div className="position-relative z-1">
                  {/* Emoji arquetipo */}
                  <div className="rounded-circle bg-white bg-opacity-5 border border-white border-opacity-10 d-flex align-items-center justify-content-center mx-auto mb-4 shadow-sm"
                       style={{ width: '100px', height: '100px', fontSize: '4rem' }}>
                    {resultado.emoji}
                  </div>

                  <p className="text-info text-uppercase fw-black mb-2" style={{ fontSize: '0.65rem', letterSpacing: '0.4em' }}>
                    Tu Arquetipo Revelado
                  </p>

                  <h2 className="display-4 text-gradient-gold fw-black mb-4" style={{ fontFamily: 'var(--font-family-title)' }}>
                    {resultado.nombre}
                  </h2>

                  <div className="divider-gold mx-auto mb-4" />

                  <p className="text-secondary mb-4 lh-lg">
                    {resultado.descripcion}
                  </p>

                  {resultado.consejo && (
                    <div className="bg-warning bg-opacity-10 border border-warning border-opacity-25 rounded-4 p-4 mb-4 text-start">
                      <p className="text-warning text-uppercase fw-bold small mb-2" style={{ letterSpacing: '0.1em' }}>
                        🌟 Consejo del Oráculo
                      </p>
                      <p className="text-warning text-opacity-75 mb-0 font-italic small">
                        {resultado.consejo}
                      </p>
                    </div>
                  )}

                  {/* Porcentaje */}
                  <div className="mb-5">
                    <span className="display-1 fw-black text-white d-block stat-number">
                      {resultado.porcentaje}%
                    </span>
                    <span className="text-info text-uppercase fw-bold small tracking-widest">
                      Equilibrista Épico
                    </span>
                  </div>

                  {/* Botones */}
                  <div className="d-grid gap-3 d-sm-flex">
                    <button onClick={handleCompartir} className="btn-aeha btn-gold flex-grow-1 py-3">
                      {copiado ? '📋 ¡Copiado!' : '📤 Compartir'}
                    </button>
                    <button onClick={handleReiniciar} className="btn btn-dark border-white border-opacity-10 rounded-pill px-4 flex-grow-1">
                      🔄 Reintentar
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ── Preguntas ── */
  const pregunta = PREGUNTAS[preguntaActual];

  return (
    <section className="py-5" id="oraculo">
      <div className="container">

        {/* ── Título ── */}
        <div className="text-center mb-5">
          <p className="text-primary text-uppercase fw-black mb-2" style={{ fontSize: '0.7rem', letterSpacing: '0.3em' }}>
            Sección 04 — Oráculo
          </p>
          <h2 className="display-4 fw-black mb-3" style={{ fontFamily: 'var(--font-family-title)' }}>
            <span className="text-primary">El Oráculo </span>
            <span className="text-gradient-gold">AEHA</span>
          </h2>
          <p className="text-secondary mx-auto" style={{ maxWidth: '400px' }}>
            3 preguntas absurdas. 1 verdad reveladora.
          </p>
        </div>

        {/* ── Progress ── */}
        <div className="d-flex justify-content-center gap-2 mb-5">
          {PREGUNTAS.map((_, i) => (
            <div
              key={i}
              className={`rounded-pill transition-all duration-500`}
              style={{ 
                height: '6px', 
                width: i === preguntaActual ? '40px' : (i < preguntaActual ? '30px' : '15px'),
                backgroundColor: i < preguntaActual ? 'var(--bs-primary)' : (i === preguntaActual ? 'var(--aeha-gold)' : 'rgba(255,255,255,0.1)')
              }}
            />
          ))}
        </div>

        {/* ── Pregunta card ── */}
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={pregunta.id}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ type: 'spring', stiffness: 250, damping: 22 }}
              >
                <div className="glass-card p-4 p-md-5 text-center mb-4 border border-white border-opacity-10">
                  <p className="text-secondary text-uppercase fw-black mb-3 small" style={{ letterSpacing: '0.2em' }}>
                    Pregunta {preguntaActual + 1} de {PREGUNTAS.length}
                  </p>
                  <h3 className="h2 fw-black text-white mb-0" style={{ fontFamily: 'var(--font-family-title)' }}>
                    {pregunta.pregunta}
                  </h3>
                </div>

                {/* ── Opciones ── */}
                <div className="d-flex flex-column gap-3">
                  {pregunta.opciones.map((opcion, i) => (
                    <motion.button
                      key={opcion.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ x: 5 }}
                      onClick={() => handleRespuesta(opcion)}
                      className="btn w-100 text-start glass-card p-4 border border-white border-opacity-5 hover-bg-white-5"
                    >
                      <div className="d-flex align-items-center gap-4">
                        <span className="rounded-circle bg-white bg-opacity-10 d-flex align-items-center justify-content-center fw-black text-warning"
                              style={{ width: '36px', height: '36px', flexShrink: 0 }}>
                          {opcion.id}
                        </span>
                        <span className="h5 mb-0 text-white-75 fw-normal">
                          {opcion.texto}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}