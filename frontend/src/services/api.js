// ============================================================
// Servicio API — Comunicación con el backend Express
// ============================================================

const API_BASE = import.meta.env.VITE_API_URL || '/api';

/**
 * Helper genérico para peticiones al backend
 */
async function fetchAPI(endpoint, options = {}) {
  // Limpiar posibles barras dobles si API_BASE termina en / y endpoint empieza por /
  const cleanBase = API_BASE.replace(/\/$/, '');
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${cleanBase}${cleanEndpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  // Intentar obtener el texto primero por si no es JSON
  const text = await response.text();
  let data;
  
  try {
    data = JSON.parse(text);
  } catch (err) {
    // Si no es JSON (el clásico "Unexpected token T"), mostramos el error con contexto
    console.error(`❌ Error parseando JSON de ${url}. Respuesta recibida:`, text.substring(0, 100));
    throw new Error(`Respuesta no válida del servidor (${response.status}). ¿Ruta incorrecta?`);
  }

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
