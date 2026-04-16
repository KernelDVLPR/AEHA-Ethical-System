// ============================================================
// Componente: Toast — Notificaciones contextuales (Bootstrap Edition)
// ============================================================
import { motion, AnimatePresence } from 'framer-motion';

const ESTILOS = {
  success: 'bg-success bg-opacity-10 border-success',
  error:   'bg-danger bg-opacity-10 border-danger',
  info:    'bg-info bg-opacity-10 border-info',
  warning: 'bg-warning bg-opacity-10 border-warning',
};

export default function Toast({ mensaje, visible, tipo = 'success' }) {
  return (
    <div className="toast-container position-fixed bottom-0 start-50 translate-middle-x mb-4 z-3" style={{ maxWidth: '400px', width: '90%' }}>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className={`border rounded-4 px-4 py-3 text-white text-center shadow-lg pointer-events-auto ${ESTILOS[tipo]}`}
            style={{ backdropFilter: 'blur(24px)' }}
          >
            <p className="small fw-bold mb-0 lh-sm">{mensaje}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}