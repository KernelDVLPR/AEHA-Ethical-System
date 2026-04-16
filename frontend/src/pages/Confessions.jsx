// ============================================================
// Página: Confessions — La Confesioneta AEHA — Bootstrap Edition
// ============================================================
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { crearConfesion, darLikeConfesion } from '../services/api';
import { useSession } from '../hooks/useSession';
import { useRealtime } from '../hooks/useRealtime';
import { supabase } from '../lib/supabase';
import Toast from '../components/Toast';

const PILARES_OPCIONES = [
  { id: 'ambicion',    nombre: 'Ambición',    emoji: '🚀', activeClass: 'bg-warning text-dark' },
  { id: 'estoicismo',  nombre: 'Estoicismo',  emoji: '🧘', activeClass: 'bg-info text-dark' },
  { id: 'hedonismo',   nombre: 'Hedonismo',   emoji: '🎉', activeClass: 'bg-danger text-white' },
  { id: 'altruismo',   nombre: 'Altruismo',   emoji: '💝', activeClass: 'bg-primary text-white' },
];

const BORDE_PILAR = {
  ambicion:   'border-warning',
  estoicismo: 'border-info',
  hedonismo:  'border-danger',
  altruismo:  'border-primary',
};

const fetchConfesiones = async () => {
  const { data } = await supabase
    .from('confesiones')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);
  return data || [];
};

const tiempoRelativo = (fecha) => {
  const diff = Math.floor((Date.now() - new Date(fecha)) / 1000);
  if (diff < 60)    return 'ahora';
  if (diff < 3600)  return `hace ${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `hace ${Math.floor(diff / 3600)}h`;
  return `hace ${Math.floor(diff / 86400)}d`;
};

export default function Confessions() {
  const sessionId = useSession();
  const { datos: confesiones } = useRealtime('confesiones', '*', fetchConfesiones);

  const [texto, setTexto]                     = useState('');
  const [pilarSeleccionado, setPilar]          = useState(null);
  const [enviando, setEnviando]                = useState(false);
  const [likesEnProceso, setLikesEnProceso]   = useState(new Set());
  const [toast, setToast]                      = useState({ visible: false, mensaje: '', tipo: 'success' });

  const mostrarToast = useCallback((mensaje, tipo = 'success') => {
    setToast({ visible: true, mensaje, tipo });
    setTimeout(() => setToast(p => ({ ...p, visible: false })), 3000);
  }, []);

  const handleEnviar = async (e) => {
    e.preventDefault();
    if (!texto.trim() || !pilarSeleccionado || !sessionId || enviando) return;
    setEnviando(true);
    try {
      const res = await crearConfesion({
        texto: texto.trim(),
        pilar_relacionado: pilarSeleccionado,
        session_id: sessionId,
      });
      setTexto('');
      setPilar(null);
      mostrarToast(res.mensaje || '🤫 Tu secreto está a salvo... casi.');
    } catch (err) {
      mostrarToast(err.message, 'error');
    }
    setEnviando(false);
  };

  const handleLike = async (id) => {
    if (!sessionId || likesEnProceso.has(id)) return;
    setLikesEnProceso(p => new Set([...p, id]));
    try {
      await darLikeConfesion(id, sessionId);
      mostrarToast('❤️ ¡Te identificaste!');
    } catch (err) {
      mostrarToast(err.message, 'error');
    }
    setLikesEnProceso(p => { const n = new Set(p); n.delete(id); return n; });
  };

  return (
    <section className="py-5" id="confesiones">
      <div className="container">

        {/* ── Título ── */}
        <div className="text-center mb-5">
          <p className="text-danger text-uppercase fw-black" style={{ fontSize: '0.7rem', letterSpacing: '0.3em' }}>
            Sección 03 — Confesioneta
          </p>
          <h2 className="display-4 text-gradient-pink fw-black mb-3" style={{ fontFamily: 'var(--font-family-title)' }}>
            La Confesioneta AEHA
          </h2>
          <p className="text-secondary mx-auto" style={{ maxWidth: '450px' }}>
            Confiesa tu verdad filosófica. <br />
            <span className="text-white-50 small">Sin filtros, sin juicio... casi.</span>
          </p>
        </div>

        {/* ── Formulario ── */}
        <div className="row justify-content-center mb-5">
          <div className="col-12 col-lg-8">
            <div className="glass-card p-4 p-md-5">
              <form onSubmit={handleEnviar}>
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="rounded-circle bg-danger bg-opacity-10 border border-danger border-opacity-25 d-flex align-items-center justify-content-center fs-3" style={{ width: '50px', height: '50px' }}>
                    🤫
                  </div>
                  <div>
                    <h3 className="h5 fw-bold text-white mb-0 text-uppercase tracking-tight">Confesionario Anónimo</h3>
                    <p className="small text-secondary mb-0">Nadie sabe quién eres. Suéltalo todo.</p>
                  </div>
                </div>

                <div className="mb-4 position-relative">
                  <textarea
                    value={texto}
                    onChange={e => setTexto(e.target.value.slice(0, 160))}
                    placeholder="Confiesa tu mayor desequilibrio..."
                    rows={4}
                    className="form-control bg-black bg-opacity-50 border-white border-opacity-10 text-white rounded-4 p-3 shadow-none focus-border-pink"
                    style={{ resize: 'none' }}
                  />
                  <span className={`position-absolute bottom-0 end-0 m-3 small fw-black ${texto.length > 140 ? 'text-danger' : 'text-white-50'}`} style={{ fontSize: '0.65rem' }}>
                    {texto.length}/160
                  </span>
                </div>

                <div className="mb-4">
                  <p className="small text-secondary fw-bold text-uppercase mb-2" style={{ letterSpacing: '0.1em' }}>Selecciona un pilar:</p>
                  <div className="d-flex flex-wrap gap-2">
                    {PILARES_OPCIONES.map(p => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPilar(p.id)}
                        className={`btn rounded-pill px-3 py-2 fw-bold text-uppercase d-flex align-items-center gap-2 border border-white border-opacity-10 ${pilarSeleccionado === p.id ? p.activeClass : 'bg-white bg-opacity-5 text-secondary'}`}
                        style={{ fontSize: '0.65rem' }}
                      >
                        <span className="fs-6">{p.emoji}</span> {p.nombre}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!texto.trim() || !pilarSeleccionado || enviando}
                  className="btn-aeha btn-pink w-100 py-3"
                >
                  {enviando ? 'Susurrando...' : 'Confesar anónimamente'} 🤫
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* ── Muro de confesiones ── */}
        {confesiones.length > 0 && (
          <div className="mb-5">
            <p className="text-center text-secondary text-uppercase fw-bold small mb-4" style={{ letterSpacing: '0.2em' }}>
              {confesiones.length} confesiones anónimas
            </p>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              <AnimatePresence>
                {confesiones.map((c, i) => (
                  <motion.div
                    key={c.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: Math.min(i * 0.05, 0.4) }}
                    className="col"
                  >
                    <div className={`glass-card p-4 h-100 border-start border-4 ${BORDE_PILAR[c.pilar_relacionado] || 'border-secondary'}`}>
                      <p className="text-white-75 mb-4 lh-lg" style={{ fontSize: '0.95rem' }}>
                        {c.texto}
                      </p>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-2 small text-secondary fw-bold text-uppercase" style={{ fontSize: '0.6rem' }}>
                          <span>{PILARES_OPCIONES.find(p => p.id === c.pilar_relacionado)?.emoji}</span>
                          <span>{tiempoRelativo(c.created_at)}</span>
                        </div>
                        <button
                          onClick={() => handleLike(c.id)}
                          disabled={likesEnProceso.has(c.id)}
                          className="btn btn-sm btn-dark bg-white bg-opacity-5 border-0 rounded-pill px-3 py-1 d-flex align-items-center gap-2"
                        >
                          <span className="text-danger">❤️</span>
                          <span className="text-white-50 fw-bold">{c.likes || 0}</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {confesiones.length === 0 && (
          <div className="text-center py-5 opacity-50">
            <p className="display-1 mb-4">🤫</p>
            <p className="h5 text-secondary">Aún no hay confesiones. ¡Sé el primero!</p>
          </div>
        )}
      </div>

      <Toast mensaje={toast.mensaje} visible={toast.visible} tipo={toast.tipo} />
    </section>
  );
}