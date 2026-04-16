// ============================================================
// Página: Landing — Hero épico AEHA — Bootstrap Edition
// ============================================================
import { motion } from 'framer-motion';

const PILARES = [
  { label: 'Ambición',    class: 'border-warning text-warning' },
  { label: 'Estoicismo',  class: 'border-info text-info' },
  { label: 'Hedonismo',   class: 'border-danger text-danger' },
  { label: 'Altruismo',   class: 'border-primary text-primary' },
];

export default function Landing({ onEntrar }) {
  return (
    <section className="position-relative min-vh-100 d-flex flex-column align-items-center justify-content-center px-3 py-5 overflow-hidden">

      {/* ── Glows de fondo ── */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center pointer-events-none"
      >
        <div className="rounded-circle blur-[130px]" 
             style={{ width: 'min(700px, 90vw)', height: 'min(700px, 90vw)', backgroundColor: 'rgba(255, 215, 0, 0.1)' }} />
      </motion.div>

      {/* ── Contenido ── */}
      <div className="container position-relative z-1 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 }}
            className="d-inline-flex align-items-center gap-2 px-4 py-2 rounded-pill border border-white-10 bg-dark-subtle backdrop-blur mb-5"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
          >
            <span className="rounded-circle bg-info animate-pulse" style={{ width: '6px', height: '6px' }} />
            <span className="text-info text-uppercase fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '0.3em' }}>
              Sistema Ético de Vida
            </span>
          </motion.div>

          {/* Título AEHA */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55, duration: 0.9, type: 'spring', damping: 14 }}
            className="fw-black display-1 mb-4"
            style={{ fontFamily: 'var(--font-family-title)', fontSize: 'clamp(6rem, 20vw, 15rem)', lineHeight: '0.85' }}
          >
            <span className="text-gradient-gold">A</span>
            <span className="text-gradient-turquoise">E</span>
            <span className="text-gradient-pink">H</span>
            <span className="text-white">A</span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mb-5"
          >
            <h2 className="display-4 fw-black text-white" style={{ fontFamily: 'var(--font-family-title)' }}>
              El Código del Equilibrista Épico
            </h2>
            <div className="divider-gold mx-auto" style={{ maxWidth: '400px' }} />
          </motion.div>

          {/* Descripción */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="lead text-secondary mx-auto mb-5 px-3"
            style={{ maxWidth: '700px' }}
          >
            Cuatro pilares. Un equilibrio imposible.<br />
            Una forma de vivir que te hará cuestionar todo.
          </motion.p>

          {/* Pilares */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
            {PILARES.map((p, i) => (
              <motion.span
                key={p.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + i * 0.07 }}
                className={`badge border rounded-pill px-3 py-2 ${p.class}`}
                style={{ backgroundColor: 'rgba(255,255,255,0.03)', fontSize: '0.75rem' }}
              >
                {p.label}
              </motion.span>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.45 }}
            className="d-grid gap-3 d-sm-flex justify-content-sm-center align-items-center"
          >
            <button onClick={onEntrar} className="btn-aeha btn-gold px-5">
              🚀 ENTRAR AL JUICIO
            </button>
          </motion.div>
          
          <p className="mt-4 text-white-50 fw-bold text-uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.2em' }}>
            100% Anónimo &amp; Épico
          </p>

        </motion.div>
      </div>
    </section>
  );
}