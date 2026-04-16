// ============================================================
// Hook: useSession
// Gestiona UUID anónimo en localStorage para evitar votos duplicados
// ============================================================
import { useState, useEffect } from 'react';

/**
 * Genera o recupera un UUID de sesión anónima
 * Se persiste en localStorage para mantener la identidad entre recargas
 */
export function useSession() {
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    let id = localStorage.getItem('aeha_session_id');
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem('aeha_session_id', id);
    }
    setSessionId(id);
  }, []);

  return sessionId;
}
