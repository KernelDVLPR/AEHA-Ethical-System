// ============================================================
// Hook: useRealtime
// Suscripciones genéricas a Supabase Realtime
// ============================================================
import { useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabase";

/**
 * Hook genérico para suscribirse a cambios en tiempo real de una tabla
 * @param {string} tabla - Nombre de la tabla en Supabase
 * @param {string} evento - Tipo de evento ('INSERT', 'UPDATE', '*')
 * @param {Function} fetchInicial - Función para cargar datos iniciales
 */
export function useRealtime(tabla, evento = "*", fetchInicial = null) {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Función para cargar datos iniciales
  const cargarDatos = useCallback(async () => {
    if (fetchInicial) {
      setCargando(true);
      try {
        const result = await fetchInicial();
        setDatos(result);
      } catch (error) {
        console.error(`Error cargando datos de ${tabla}:`, error);
      }
      setCargando(false);
    }
  }, [tabla, fetchInicial]);

  useEffect(() => {
    cargarDatos();

    // Suscribirse a cambios en tiempo real
    const channel = supabase
      .channel(`realtime-${tabla}`)
      .on(
        "postgres_changes",
        { event: evento, schema: "public", table: tabla },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setDatos((prev) => [payload.new, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setDatos((prev) =>
              prev.map((item) =>
                item.id === payload.new.id ? payload.new : item,
              ),
            );
          } else if (payload.eventType === "DELETE") {
            setDatos((prev) =>
              prev.filter((item) => item.id !== payload.old.id),
            );
          }
        },
      )
      .subscribe();

    // Cleanup
    return () => {
      supabase.removeChannel(channel);
    };
  }, [tabla, evento, cargarDatos]);

  return { datos, setDatos, cargando, recargar: cargarDatos };
}

/**
 * Hook para suscribirse a conteos en tiempo real (ej: votos de pilares)
 * @param {string} tabla - Nombre de la tabla
 * @param {string} campoClave - Campo por el cual agrupar conteos
 * @param {string[]} valoresClave - Valores posibles del campo
 */
export function useRealtimeCount(tabla, campoClave, valoresClave) {
  const [conteos, setConteos] = useState(() => {
    const obj = {};
    valoresClave.forEach((v) => (obj[v] = 0));
    obj.total = 0;
    return obj;
  });
  const [cargando, setCargando] = useState(true);

  const cargarConteos = useCallback(async () => {
    setCargando(true);
    try {
      const { data, error } = await supabase.from(tabla).select(campoClave);
      if (error) throw error;

      const nuevoConteo = {};
      valoresClave.forEach((v) => (nuevoConteo[v] = 0));
      nuevoConteo.total = 0;

      if (data) {
        data.forEach((row) => {
          const key = row[campoClave];
          if (nuevoConteo[key] !== undefined) {
            nuevoConteo[key]++;
          }
          nuevoConteo.total++;
        });
      }
      setConteos(nuevoConteo);
    } catch (error) {
      console.error(`Error cargando conteos de ${tabla}:`, error);
    }
    setCargando(false);
  }, [tabla, campoClave, valoresClave]);

  useEffect(() => {
    cargarConteos();

    const channel = supabase
      .channel(`realtime-count-${tabla}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: tabla },
        (payload) => {
          const key = payload.new[campoClave];
          setConteos((prev) => ({
            ...prev,
            [key]: (prev[key] || 0) + 1,
            total: prev.total + 1,
          }));
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tabla, campoClave, cargarConteos]);

  return { conteos, cargando };
}
