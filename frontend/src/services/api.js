// ============================================================
// Servicio API — Comunicación con el backend Express
// ============================================================

const API_BASE = '/api';

/**
 * Helper genérico para peticiones al backend
 */
async function fetchAPI(endpoint, options = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Error en la petición');
  }

  return data;
}

// ─── Reacciones (Sección 1) ───

export async function crearReaccion({ pilar, emoji, comentario_corto, session_id }) {
  return fetchAPI('/reactions', {
    method: 'POST',
    body: JSON.stringify({ pilar, emoji, comentario_corto, session_id }),
  });
}

// ─── Votos (Sección 2) ───

export async function crearVoto({ regla_de_oro, opcion_elegida, session_id }) {
  return fetchAPI('/votes', {
    method: 'POST',
    body: JSON.stringify({ regla_de_oro, opcion_elegida, session_id }),
  });
}

// ─── Confesiones (Sección 3) ───

export async function crearConfesion({ texto, pilar_relacionado, session_id }) {
  return fetchAPI('/confesiones', {
    method: 'POST',
    body: JSON.stringify({ texto, pilar_relacionado, session_id }),
  });
}

export async function darLikeConfesion(confesionId, session_id) {
  return fetchAPI(`/confesiones/${confesionId}/like`, {
    method: 'PUT',
    body: JSON.stringify({ session_id }),
  });
}

// ─── Dashboard ───

export async function obtenerResultados() {
  return fetchAPI('/resultados');
}
