// ============================================================
// Componente: Navigation — Tabs responsivos (Bootstrap Edition)
// ============================================================
import { motion } from 'framer-motion';

const SECCIONES = [
  { id: 'pilares',    label: 'Pilares',     emoji: '🏛️' },
  { id: 'reglas',     label: 'Juicio',      emoji: '⚖️' },
  { id: 'confesiones',label: 'Confesiones', emoji: '🤫' },
  { id: 'oraculo',    label: 'Oráculo',     emoji: '🔮' },
];

export default function Navigation({ seccionActiva, onChange }) {
  return (
    <nav className="position-fixed top-0 start-0 end-0 z-3 px-3 pt-3">
      <div className="mx-auto d-flex align-items-center gap-1 gap-sm-2 glass-card px-2 py-2 shadow bg-black bg-opacity-50 rounded-pill border-1"
           style={{ maxWidth: 'fit-content', backdropFilter: 'blur(24px)' }}>

        {/* Logo — solo md+ */}
        <button
          onClick={() => onChange('landing')}
          aria-label="Inicio"
          className="d-none d-md-flex align-items-center justify-content-center rounded-circle border-0 text-dark fw-black"
          style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #FFD700, #FFA500)', fontSize: '10px', letterSpacing: '0.15em', fontFamily: 'var(--font-family-title)' }}
        >
          AEHA
        </button>

        {/* Separador — solo md+ */}
        <div className="d-none d-md-block bg-white bg-opacity-10 mx-1" style={{ width: '1px', height: '20px' }} />

        {/* Tabs */}
        <div className="d-flex align-items-center gap-1 overflow-auto no-scrollbar">
          {SECCIONES.map((s) => {
            const activo = seccionActiva === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onChange(s.id)}
                className={`btn btn-link position-relative px-3 px-sm-4 py-2 text-decoration-none fw-bold transition-all border-0 rounded-pill whitespace-nowrap ${activo ? 'text-white' : 'text-white-50 hover-text-white'}`}
                style={{ fontSize: '0.8rem' }}
              >
                {activo && (
                  <motion.div
                    layoutId="activeTab"
                    className="position-absolute top-0 start-0 w-100 h-100 bg-white bg-opacity-10 rounded-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="position-relative z-1 d-flex align-items-center gap-2">
                  <span className="d-sm-none fs-6">{s.emoji}</span>
                  <span className="d-none d-sm-inline">{s.emoji} {s.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}