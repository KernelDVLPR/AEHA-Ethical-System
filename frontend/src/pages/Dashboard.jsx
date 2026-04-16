// ============================================================
// Página: Dashboard — Vista /live responsive y polished (Bootstrap Edition)
// ============================================================
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { obtenerResultados } from '../services/api';

const PILARES = {
  ambicion:   { emoji: '🚀', bar: 'bg-aeha-gold',      text: 'text-aeha-gold',      label: 'Ambición'   },
  estoicismo: { emoji: '🧘', bar: 'bg-aeha-turquoise', text: 'text-aeha-turquoise', label: 'Estoicismo' },
  hedonismo:  { emoji: '🎉', bar: 'bg-aeha-pink',      text: 'text-aeha-pink',      label: 'Hedonismo'  },
  altruismo:  { emoji: '💝', bar: 'bg-purple-400',     text: 'text-purple-400',     label: 'Altruismo'  },
};

const OPCIONES_REGLA = {
  oro_puro:       { emoji: '👑', label: 'Oro puro',     color: 'text-aeha-gold' },
  pensarlo:       { emoji: '🤔', label: 'A pensar',     color: 'text-sky-400' },
  rompio_cerebro: { emoji: '💀', label: 'Cerebro roto', color: 'text-aeha-pink' },
};

function StatCard({ label, value, color = 'text-white', delay = 0, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="col"
    >
      <div className="glass-card p-4 h-100 d-flex align-items-center justify-content-between gap-3">
        <div>
          <p className="text-uppercase fw-bold text-secondary mb-1" style={{ fontSize: '0.65rem', letterSpacing: '0.1em' }}>{label}</p>
          <p className={`display-5 fw-black mb-0 ${color} stat-number`}>{value}</p>
        </div>
        <span className="display-4 opacity-25">{icon}</span>
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  const [data, setData]                       = useState(null);
  const [cargando, setCargando]               = useState(true);
  const [ultimaActualizacion, setUltAct]      = useState(null);

  const cargarDatos = useCallback(async () => {
    try {
      const res = await obtenerResultados();
      setData(res.data);
      setUltAct(new Date());
    } catch (e) {
      console.error('Dashboard error:', e);
    }
    setCargando(false);
  }, []);

  useEffect(() => {
    cargarDatos();
    const t = setInterval(cargarDatos, 5000);
    return () => clearInterval(t);
  }, [cargarDatos]);

  if (cargando || !data) {
    return (
      <div className="min-vh-100 bg-black d-flex align-items-center justify-content-center">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  const totalJuicios = Object.values(data.reglas).reduce((s, r) => s + (r.total || 0), 0);

  return (
    <div className="min-vh-100 bg-animated-gradient py-5">
      <div className="container">

        {/* ── Header ── */}
        <div className="row align-items-center mb-5">
          <div className="col-12 col-md-6 mb-3 mb-md-0">
            <p className="text-info text-uppercase fw-bold mb-1" style={{ fontSize: '0.7rem', letterSpacing: '0.3em' }}>
              Vista Presentador
            </p>
            <h1 className="display-4 text-gradient-gold fw-black mb-0" style={{ fontFamily: 'var(--font-family-title)' }}>
              📊 AEHA Dashboard
            </h1>
          </div>
          <div className="col-12 col-md-6 text-md-end d-flex align-items-center justify-content-md-end gap-3">
            <div className="badge rounded-pill bg-success bg-opacity-10 border border-success text-success px-3 py-2">
              <span className="d-inline-block rounded-circle bg-success me-2" style={{ width: '8px', height: '8px' }}></span>
              EN VIVO
            </div>
            {ultimaActualizacion && (
              <small className="text-white-50">
                {ultimaActualizacion.toLocaleTimeString()}
              </small>
            )}
          </div>
        </div>

        {/* ── Stats rápidas ── */}
        <div className="row row-cols-1 row-cols-sm-3 g-4 mb-5">
          <StatCard label="Votos pilares" value={data.pilares.total}      color="text-aeha-gold"      icon="🏛️" delay={0}    />
          <StatCard label="Confesiones"   value={data.confesiones.total}  color="text-aeha-pink"      icon="🤫" delay={0.06} />
          <StatCard label="Juicios"       value={totalJuicios}            color="text-aeha-turquoise" icon="⚖️" delay={0.12} />
        </div>

        {/* ── Fila principal ── */}
        <div className="row g-4 mb-5">
          
          {/* Pilares */}
          <div className="col-lg-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="glass-card p-4 p-md-5 h-100"
            >
              <h3 className="h2 text-gradient-gold mb-4" style={{ fontFamily: 'var(--font-family-title)' }}>
                🏛️ Votación de Pilares
              </h3>
              <div className="d-flex flex-column gap-4">
                {Object.entries(PILARES).map(([id, cfg]) => {
                  const votos = data.pilares[id] || 0;
                  const pct   = data.pilares.total > 0
                    ? Math.round((votos / data.pilares.total) * 100) : 0;
                  return (
                    <div key={id} className="row align-items-center g-3">
                      <div className="col-auto" style={{ width: '40px' }}>
                        <span className="fs-3">{cfg.emoji}</span>
                      </div>
                      <div className="col-3 col-sm-2 text-truncate">
                        <span className={`fw-bold ${cfg.text}`} style={{ fontSize: '0.9rem' }}>{cfg.label}</span>
                      </div>
                      <div className="col">
                        <div className="progress bg-white bg-opacity-5 rounded-pill" style={{ height: '24px' }}>
                          <motion.div
                            className={`progress-bar ${cfg.bar} rounded-pill`}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.max(pct, 5)}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                          >
                            {pct > 10 && <span className="text-black fw-black" style={{ fontSize: '0.75rem' }}>{votos}</span>}
                          </motion.div>
                        </div>
                      </div>
                      <div className="col-auto text-end" style={{ width: '50px' }}>
                        <span className="fw-black h5 mb-0">{pct}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Top Confesiones */}
          <div className="col-lg-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-4 p-md-5 h-100"
            >
              <h3 className="h2 text-gradient-pink mb-4" style={{ fontFamily: 'var(--font-family-title)' }}>
                🔥 Top Confesiones
              </h3>
              <div className="d-flex flex-column gap-3">
                {data.confesiones.topLiked.length > 0 ? (
                  data.confesiones.topLiked.map((c, i) => (
                    <div key={c.id} className="p-3 rounded-4 bg-white bg-opacity-5 border border-white border-opacity-5">
                      <div className="d-flex gap-3">
                        <span className="fw-black text-aeha-gold">#{i + 1}</span>
                        <div className="flex-grow-1">
                          <p className="small text-white-75 mb-2 lh-base">{c.texto}</p>
                          <div className="d-flex align-items-center gap-1 small text-danger">
                            <span>❤️</span> <span>{c.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-5 opacity-25">
                    <p className="display-4">🤫</p>
                    <p className="small mb-0">Sin confesiones destacadas</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Reglas de Oro ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass-card p-4 p-md-5 mb-5"
        >
          <h3 className="h2 text-gradient-turquoise mb-5" style={{ fontFamily: 'var(--font-family-title)' }}>
            ⚖️ Juicio de las Reglas de Oro
          </h3>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {[1, 2, 3].map(n => {
              const regla = data.reglas[n];
              const total = regla?.total || 0;
              return (
                <div key={n} className="col">
                  <div className="p-3 p-xl-4 rounded-4 bg-white bg-opacity-5 h-100 border border-white border-opacity-5">
                    <p className="text-uppercase fw-bold text-secondary mb-3" style={{ fontSize: '0.65rem', letterSpacing: '0.1em' }}>
                      Regla #{n} <span className="text-white-25 ms-2">({total} votos)</span>
                    </p>
                    <div className="d-flex flex-column gap-2">
                      {Object.entries(OPCIONES_REGLA).map(([id, cfg]) => {
                        const votos = regla?.[id] || 0;
                        const pct   = total > 0 ? Math.round((votos / total) * 100) : 0;
                        return (
                          <div key={id} className="d-flex align-items-center justify-content-between p-2 rounded-3 bg-black bg-opacity-25 border border-white border-opacity-5">
                            <div className="d-flex align-items-center gap-2">
                              <span>{cfg.emoji}</span>
                              <span className="small text-white-50">{cfg.label}</span>
                            </div>
                            <span className={`fw-black ${cfg.color}`}>{pct}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ── Nube de palabras ── */}
        {data.confesiones.nubePalabras.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-4 p-md-5 text-center"
          >
            <h3 className="h2 text-gradient-gold mb-4" style={{ fontFamily: 'var(--font-family-title)' }}>
              ☁️ Nube de Palabras
            </h3>
            <div className="d-flex flex-wrap gap-3 justify-content-center align-items-center">
              {data.confesiones.nubePalabras.map((p, i) => {
                const size = Math.min(Math.max(p.valor * 4 + 11, 14), 42);
                const cols = ['text-aeha-gold','text-aeha-turquoise','text-aeha-pink','text-primary'];
                return (
                  <motion.span
                    key={p.texto}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className={`${cols[i % cols.length]} fw-black px-2`}
                    style={{ fontSize: size }}
                  >
                    {p.texto}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}