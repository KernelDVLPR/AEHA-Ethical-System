// ============================================================
// Componente: Footer — polished (Bootstrap Edition)
// ============================================================
export default function Footer() {
  return (
    <footer className="position-relative z-1 border-top border-white border-opacity-5 py-5 px-3 bg-black bg-opacity-25">
      <div className="container text-center">
        <div className="d-flex flex-wrap align-items-center justify-content-center gap-3 mb-2">
          <span className="text-gradient-gold fw-black small text-uppercase" style={{ letterSpacing: '0.1em' }}>AEHA</span>
          <span className="text-white-50 opacity-25 small">—</span>
          <span className="text-warning small fw-bold">Ambición</span>
          <span className="text-white-50 opacity-25 small">·</span>
          <span className="text-info small fw-bold">Estoicismo</span>
          <span className="text-white-50 opacity-25 small">·</span>
          <span className="text-danger small fw-bold">Hedonismo</span>
          <span className="text-white-50 opacity-25 small">·</span>
          <span className="text-primary small fw-bold">Altruismo</span>
        </div>
        <p className="text-white-50 opacity-25 small text-uppercase fw-bold" style={{ letterSpacing: '0.2em' }}>
          Tu vida épica empieza aquí. ✨
        </p>
      </div>
    </footer>
  );
}