// ============================================================
// Página: PillarVote — Responsive & Polished (Bootstrap Edition)
// ============================================================
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { crearReaccion } from '../services/api';
import { useSession } from '../hooks/useSession';
import { useRealtimeCount } from '../hooks/useRealtime';
import Toast from '../components/Toast';

const PILARES = [
  {
    id: 'ambicion',
    nombre: 'Ambición',
    emoji: '🚀',
    frase: 'Quiero conquistar el mundo... empezando por mi agenda',
    color: 'from-amber-500 to-yellow-400',
    bootstrapColor: 'warning',
    border: 'border-warning-subtle hover:border-warning',
    activeBorder: 'border-warning shadow-[0_0_40px_rgba(255,193,7,0.2)]',
    accent: 'rgba(255,193,7,0.1)',
    labelBg: 'bg-warning text-dark',
    confettiColors: ['#FFD700', '#FFA500', '#FFB347'],
    mensaje: '🚀 ¡A conquistar el mundo! Pero primero... este café.',
  },
  {
    id: 'estoicismo',
    nombre: 'Estoicismo',
    emoji: '🧘',
    frase: 'El mundo se quema y yo aquí, respirando profundo',
    color: 'from-emerald-400 to-teal-400',
    bootstrapColor: 'info',
    border: 'border-info-subtle hover:border-info',
    activeBorder: 'border-info shadow-[0_0_40px_rgba(0,212,170,0.2)]',
    accent: 'rgba(0,212,170,0.1)',
    labelBg: 'bg-info text-dark',
    confettiColors: ['#00D4AA', '#00BCD4', '#20E3B2'],
    mensaje: '🧘 Respira. Exhala. El caos es solo una ilusión... más o menos.',
  },
  {
    id: 'hedonismo',
    nombre: 'Hedonismo',
    emoji: '🎉',
    frase: 'La vida es corta, el postre va primero',
    color: 'from-pink-500 to-rose-400',
    bootstrapColor: 'danger',
    border: 'border-danger-subtle hover:border-danger',
    activeBorder: 'border-danger shadow-[0_0_40px_rgba(255,0,128,0.2)]',
    accent: 'rgba(255,0,128,0.1)',
    labelBg: 'bg-danger text-white',
    confettiColors: ['#FF0080', '#FF1493', '#FF69B4'],
    mensaje: '🎉 ¡La vida es una fiesta y tú acabas de llegar!',
  },
  {
    id: 'altruismo',
    nombre: 'Altruismo',
    emoji: '💝',
    frase: 'Mi superpoder es dar sin esperar nada... excepto karma',
    color: 'from-violet-500 to-purple-400',
    bootstrapColor: 'primary',
    border: 'border-primary-subtle hover:border-primary',
    activeBorder: 'border-primary shadow-[0_0_40px_rgba(139,92,246,0.2)]',
    accent: 'rgba(139,92,246,0.1)',
    labelBg: 'bg-primary text-white',
    confettiColors: ['#8B5CF6', '#A78BFA', '#C084FC'],
    mensaje: '💝 El mundo necesita más gente como tú. No, en serio.',
  },
];

const PILARES_KEYS = ['ambicion', 'estoicismo', 'hedonismo', 'altruismo'];

export default function PillarVote() {
  const sessionId = useSession();
  const [votado, setVotado] = useState(false);
  const [pilarElegido, setPilarElegido] = useState(null);
  const [cargandoVoto, setCargandoVoto] = useState(false);
  const [toast, setToast] = useState({ visible: false, mensaje: '', tipo: 'success' });

  const { conteos } = useRealtimeCount('reactions', 'pilar', PILARES_KEYS);

  const mostrarToast = useCallback((mensaje, tipo = 'success') => {
    setToast({ visible: true, mensaje, tipo });
    setTimeout(() => setToast(p => ({ ...p, visible: false })), 3500);
  }, []);

  const lanzarConfetti = (colores) => {
    const opts = { origin: { y: 0.65 }, colors: colores };
    confetti({ ...opts, particleCount: 60,  spread: 26,  startVelocity: 55 });
    confetti({ ...opts, particleCount: 50,  spread: 60 });
    confetti({ ...opts, particleCount: 80,  spread: 100, decay: 0.91, scalar: 0.8 });
    confetti({ ...opts, particleCount: 25,  spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    confetti({ ...opts, particleCount: 25,  spread: 120, startVelocity: 45 });
  };

  const handleVotar = async (pilar) => {
    if (votado || cargandoVoto || !sessionId) return;
    setCargandoVoto(true);
    try {
      const res = await crearReaccion({ pilar: pilar.id, emoji: pilar.emoji, session_id: sessionId });
      setPilarElegido(pilar);
      setVotado(true);
      lanzarConfetti(pilar.confettiColors);
      mostrarToast(res.mensaje || pilar.mensaje);
    } catch (err) {
      mostrarToast(err.message, 'error');
    }
    setCargandoVoto(false);
  };

  return (
    <section className="py-5" id="pilares">
      <div className="container px-4">

        {/* ── Título ── */}
        <div className="text-center mb-5">
          <p className="text-info text-uppercase fw-black mb-2" style={{ fontSize: '0.7rem', letterSpacing: '0.3em' }}>
            Sección 01 — Pilares
          </p>
          <h2 className="display-4 text-gradient-gold fw-black mb-3" style={{ fontFamily: 'var(--font-family-title)' }}>
            ¿Con qué pilar resonaste más?
          </h2>
          <p className="text-secondary mx-auto" style={{ maxWidth: '500px' }}>
            Elige tu filosofía de vida. Solo puedes elegir una.<br />
            <span className="text-white-50 small">Elige con sabiduría... o no.</span>
          </p>
        </div>

        {/* ── Grid de cards ── */}
        <div className="row row-cols-1 row-cols-md-2 g-4 mb-5">
          {PILARES.map((pilar, i) => {
            const esElegido = votado && pilarElegido?.id === pilar.id;
            const esDimmed  = votado && pilarElegido?.id !== pilar.id;
            return (
              <motion.div
                key={pilar.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="col"
              >
                <div 
                  onClick={() => handleVotar(pilar)}
                  className={`glass-card p-4 p-md-5 h-100 transition-all position-relative overflow-hidden cursor-pointer border-1 ${esDimmed ? 'opacity-25 grayscale' : ''} ${esElegido ? pilar.activeBorder : pilar.border} ${votado ? 'pe-none' : ''}`}
                >
                  {/* Hover effect overlay layer */}
                  {!votado && (
                    <div className="position-absolute top-0 start-0 w-100 h-100 opacity-0 transition-all"
                         style={{ background: `radial-gradient(circle at 10% 10%, ${pilar.accent}, transparent 60%)` }} />
                  )}

                  <div className="position-relative z-1">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <span className="display-3">{pilar.emoji}</span>
                      {esElegido && (
                        <span className="badge rounded-pill bg-white bg-opacity-10 border border-white border-opacity-10 text-white p-2 px-3 small fw-black text-uppercase">
                          Tu Pilar ✓
                        </span>
                      )}
                    </div>

                    <h3 className="display-5 fw-black mb-3" style={{ fontFamily: 'var(--font-family-title)' }}>
                      {pilar.nombre}
                    </h3>

                    <p className="text-secondary font-italic mb-5 lh-base">
                      "{pilar.frase}"
                    </p>

                    {!votado && (
                      <span className={`btn rounded-pill px-4 py-2 small fw-black text-uppercase shadow-sm ${pilar.labelBg}`}>
                        Sí, este soy yo →
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Resultados en tiempo real ── */}
        <AnimatePresence>
          {conteos.total > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="row justify-content-center"
            >
              <div className="col-12 col-lg-10">
                <div className="glass-card p-4 p-md-5">
                  <div className="d-flex align-items-center justify-content-between mb-5 flex-wrap gap-3">
                    <h3 className="h3 text-gradient-turquoise fw-black mb-0" style={{ fontFamily: 'var(--font-family-title)' }}>
                      📊 Resultados en vivo
                    </h3>
                    <span className="badge rounded-pill bg-white bg-opacity-5 border border-white border-opacity-5 text-secondary px-3 py-2 small fw-bold text-uppercase">
                      {conteos.total} votos totales
                    </span>
                  </div>

                  <div className="d-flex flex-column gap-4">
                    {PILARES.map((pilar) => {
                      const pct = conteos.total > 0
                        ? Math.round((conteos[pilar.id] / conteos.total) * 100)
                        : 0;
                      return (
                        <div key={pilar.id} className="row align-items-center g-3">
                          <div className="col-auto" style={{ width: '40px' }}>
                            <span className="fs-3">{pilar.emoji}</span>
                          </div>
                          <div className="col-4 col-sm-3 col-md-2 text-truncate">
                            <span className="small text-secondary fw-bold text-uppercase">{pilar.nombre}</span>
                          </div>
                          <div className="col">
                            <div className="progress bg-white bg-opacity-5 rounded-pill" style={{ height: '20px' }}>
                              <motion.div
                                className={`progress-bar bg-${pilar.bootstrapColor} rounded-pill shadow-sm`}
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                              />
                            </div>
                          </div>
                          <div className="col-auto text-end" style={{ width: '60px' }}>
                            <span className="fw-black h5 mb-0 text-white">{pct}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Toast mensaje={toast.mensaje} visible={toast.visible} tipo={toast.tipo} />
    </section>
  );
}