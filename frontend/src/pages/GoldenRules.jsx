// ============================================================
// Página: GoldenRules — Juicio filosófico — Bootstrap Edition
// ============================================================
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { crearVoto } from '../services/api';
import { useSession } from '../hooks/useSession';
import Toast from '../components/Toast';

const REGLAS = [
  {
    id: 1,
    titulo: 'Regla de Oro #1',
    texto: '"No seas un imbécil con propósito"',
    subtexto: 'La regla fundamental del equilibrista ético',
    emoji: '⚖️',
  },
  {
    id: 2,
    titulo: 'Regla de Oro #2',
    texto: '"Gana dinero, pero no pierdas el alma en el proceso"',
    subtexto: 'La regla del capitalista consciente',
    emoji: '💰',
  },
  {
    id: 3,
    titulo: 'Regla de Oro #3',
    texto: '"Si no te diviertes, ¿para qué te esfuerzas?"',
    subtexto: 'El mantra hedonista productivo',
    emoji: '🎭',
  },
];

const OPCIONES = [
  { id: 'oro_puro',      label: 'Oro puro',        icon: '👑', bg: 'from-amber-500 to-yellow-400',  text: 'text-dark' },
  { id: 'pensarlo',      label: 'A pensar...',      icon: '🤔', bg: 'from-sky-500 to-cyan-400',      text: 'text-dark' },
  { id: 'rompio_cerebro',label: 'Cerebro roto',     icon: '💀', bg: 'from-pink-500 to-rose-400',     text: 'text-white' },
];

export default function GoldenRules() {
  const sessionId = useSession();
  const [reglaActual, setReglaActual] = useState(0);
  const [completado, setCompletado] = useState(false);
  const [respuestas, setRespuestas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [animandoSalida, setAnimandoSalida] = useState(false);
  const [toast, setToast] = useState({ visible: false, mensaje: '', tipo: 'success' });

  const mostrarToast = useCallback((mensaje, tipo = 'success') => {
    setToast({ visible: true, mensaje, tipo });
    setTimeout(() => setToast(p => ({ ...p, visible: false })), 3000);
  }, []);

  const handleElegir = async (opcion) => {
    if (cargando || animandoSalida || !sessionId) return;
    setCargando(true);
    const regla = REGLAS[reglaActual];
    try {
      await crearVoto({ regla_de_oro: regla.id, opcion_elegida: opcion.id, session_id: sessionId });
      const nuevas = [...respuestas, { regla: regla.id, opcion: opcion.id }];
      setRespuestas(nuevas);
      setAnimandoSalida(true);
      setTimeout(() => {
        if (reglaActual < REGLAS.length - 1) {
          setReglaActual(r => r + 1);
          setAnimandoSalida(false);
        } else {
          setCompletado(true);
        }
      }, 550);
    } catch (err) {
      mostrarToast(err.message, 'error');
    }
    setCargando(false);
  };

  const calcularPorcentaje = () => {
    const unicos = new Set(respuestas.map(r => r.opcion)).size;
    return Math.round((unicos / 3) * 100);
  };

  /* ── Completado ── */
  if (completado) {
    const pct = calcularPorcentaje();
    return (
      <section className="py-5" id="reglas">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-12 col-md-8 col-lg-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="glass-card p-4 p-md-5"
              >
                <motion.span
                  className="display-1 d-block mb-4"
                  animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
                  transition={{ duration: 1.2, delay: 0.4 }}
                >
                  ⚖️
                </motion.span>

                <p className="text-info text-uppercase fw-black mb-2" style={{ fontSize: '0.7rem', letterSpacing: '0.3em' }}>
                  Juicio Completado
                </p>
                <h2 className="display-4 text-gradient-gold fw-black mb-4" style={{ fontFamily: 'var(--font-family-title)' }}>
                  ¡Veredicto emitido!
                </h2>

                <div className="divider-gold mx-auto mb-4" />

                <p className="display-2 fw-black text-white mb-0 stat-number">{pct}%</p>
                <p className="text-info text-uppercase fw-bold small tracking-widest mb-4">
                  Equilibrista Épico
                </p>
                <p className="text-secondary mb-5 px-3 lh-lg small">
                  {pct >= 80
                    ? 'Diversificas tus juicios como un maestro zen del pensamiento. ¡Impresionante!'
                    : pct >= 50
                      ? 'Tienes criterio propio. No te dejas llevar fácilmente. Respetable.'
                      : 'Eres consistente en tus convicciones. Eso también es sabiduría.'}
                </p>

                {/* Resumen */}
                <div className="d-flex flex-column gap-2 text-start">
                  {respuestas.map((r, i) => (
                    <div key={i} className="d-flex align-items-center justify-content-between bg-white bg-opacity-5 rounded-4 px-4 py-3 border border-white border-opacity-5">
                      <span className="small text-secondary fw-bold text-uppercase">Regla #{r.regla}</span>
                      <span className="small fw-black text-white">
                        {OPCIONES.find(o => o.id === r.opcion)?.icon}{' '}
                        {OPCIONES.find(o => o.id === r.opcion)?.label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const regla = REGLAS[reglaActual];

  return (
    <section className="py-5" id="reglas">
      <div className="container">

        {/* ── Título ── */}
        <div className="text-center mb-5">
          <p className="text-warning text-uppercase fw-black mb-2" style={{ fontSize: '0.7rem', letterSpacing: '0.3em' }}>
            Sección 02 — Juicio
          </p>
          <h2 className="display-4 text-gradient-turquoise fw-black mb-2" style={{ fontFamily: 'var(--font-family-title)' }}>
            El Juicio de las Reglas de Oro
          </h2>
          <p className="text-secondary mx-auto" style={{ maxWidth: '400px' }}>
            Juzga cada regla. Tu veredicto importa.
          </p>
        </div>

        {/* ── Progress ── */}
        <div className="d-flex justify-content-center gap-2 mb-5">
          {REGLAS.map((_, i) => (
            <div
              key={i}
              className="rounded-pill transition-all duration-500"
              style={{
                height: '6px',
                width: i === reglaActual ? '40px' : (i < reglaActual ? '30px' : '15px'),
                backgroundColor: i < reglaActual ? 'var(--aeha-turquoise)' : (i === reglaActual ? 'var(--aeha-gold)' : 'rgba(255,255,255,0.1)')
              }}
            />
          ))}
        </div>

        {/* ── Card ── */}
        <div className="row justify-content-center mb-5">
          <div className="col-12 col-md-10 col-lg-8">
            <AnimatePresence mode="wait">
              {!animandoSalida && (
                <motion.div
                  key={regla.id}
                  initial={{ opacity: 0, y: 24, rotate: 1.5 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -20 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 26 }}
                  className="glass-card p-4 p-md-5 text-center w-100 shadow-lg border border-white border-opacity-10"
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="display-2 mb-4"
                  >
                    {regla.emoji}
                  </motion.div>

                  <p className="text-info text-uppercase fw-black small mb-3" style={{ letterSpacing: '0.3em' }}>
                    {regla.titulo}
                  </p>

                  <h3 className="display-5 fw-black text-white mb-3" style={{ fontFamily: 'var(--font-family-title)' }}>
                    {regla.texto}
                  </h3>

                  <p className="lead text-secondary font-italic opacity-75 mb-4 px-2">
                    {regla.subtexto}
                  </p>

                  <div className="mt-4 pt-4 border-top border-white border-opacity-5">
                    <span className="small text-white-25 fw-bold text-uppercase" style={{ letterSpacing: '0.1em' }}>
                      {reglaActual + 1} de {REGLAS.length}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Opciones ── */}
        <div className="row row-cols-1 row-cols-md-3 g-3 justify-content-center">
          {OPCIONES.map((opcion) => (
            <div key={opcion.id} className="col">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleElegir(opcion)}
                disabled={cargando}
                className={`btn w-100 d-flex flex-column align-items-center gap-1 p-4 border-0 rounded-4 shadow bg-gradient-${opcion.bg} ${opcion.text}`}
                style={{
                  background: `linear-gradient(135deg, ${opcion.id === 'oro_puro' ? '#FFD700, #FFA500' : (opcion.id === 'pensarlo' ? '#0ea5e9, #22d3ee' : '#FF0080, #FF1493')})`,
                  minHeight: '110px',
                  justifyContent: 'center'
                }}
              >
                <span className="fs-2">{opcion.icon}</span>
                <span className="fw-black text-uppercase small" style={{ letterSpacing: '0.1em' }}>
                  {opcion.label}
                </span>
              </motion.button>
            </div>
          ))}
        </div>
      </div>

      <Toast mensaje={toast.mensaje} visible={toast.visible} tipo={toast.tipo} />
    </section>
  );
}