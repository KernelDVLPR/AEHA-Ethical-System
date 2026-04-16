// ============================================================
// Componente: Particles — Fondo decorativo
// ============================================================
import { useMemo } from 'react';

const COLORES = ['#FFD700', '#00D4AA', '#FF0080', '#8B5CF6'];

export default function Particles({ cantidad = 12 }) {
  const particulas = useMemo(() => (
    Array.from({ length: cantidad }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 2,
      color: COLORES[Math.floor(Math.random() * COLORES.length)],
      duration: Math.random() * 22 + 16,
      delay: Math.random() * 12,
    }))
  ), [cantidad]);

  return (
    <div className="particles-bg">
      {particulas.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width:  p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay:    `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}