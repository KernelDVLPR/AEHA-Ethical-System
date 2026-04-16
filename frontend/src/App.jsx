// ============================================================
// App.jsx — sin cambios lógicos, limpieza menor
// ============================================================
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing    from './pages/Landing';
import PillarVote from './pages/PillarVote';
import GoldenRules from './pages/GoldenRules';
import Confessions from './pages/Confessions';
import Oracle     from './pages/Oracle';
import Dashboard  from './pages/Dashboard';
import Navigation from './components/Navigation';
import Footer     from './components/Footer';
import Particles  from './components/Particles';

function AudienceView() {
  const [seccionActiva, setSeccionActiva] = useState('landing');

  const handleEntrar = () => setSeccionActiva('pilares');

  const handleCambiarSeccion = (seccion) => {
    setSeccionActiva(seccion);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-animated-gradient min-vh-100 position-relative">
      <Particles cantidad={12} />

      {seccionActiva !== 'landing' && (
        <Navigation seccionActiva={seccionActiva} onChange={handleCambiarSeccion} />
      )}

      <main>
        {seccionActiva === 'landing'      && <Landing onEntrar={handleEntrar} />}
        {seccionActiva === 'pilares'      && <PillarVote />}
        {seccionActiva === 'reglas'       && <GoldenRules />}
        {seccionActiva === 'confesiones'  && <Confessions />}
        {seccionActiva === 'oraculo'      && <Oracle />}
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<AudienceView />} />
        <Route path="/live"      element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}