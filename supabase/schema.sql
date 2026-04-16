-- ============================================================
-- AEHA Ethical System — Schema de Base de Datos
-- Ejecutar este script en el SQL Editor de Supabase
-- ============================================================

-- ─────────────────────────────────────────
-- Tabla: reactions
-- Sección 1 — Votación de pilares
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    pilar VARCHAR(20) NOT NULL CHECK (pilar IN ('ambicion', 'estoicismo', 'hedonismo', 'altruismo')),
    emoji VARCHAR(10),
    comentario_corto VARCHAR(160),
    session_id UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- Tabla: votes
-- Sección 2 — Juicio de las Reglas de Oro
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS votes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    regla_de_oro INTEGER NOT NULL CHECK (regla_de_oro BETWEEN 1 AND 3),
    opcion_elegida VARCHAR(30) NOT NULL CHECK (opcion_elegida IN ('oro_puro', 'pensarlo', 'rompio_cerebro')),
    session_id UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- Tabla: confesiones
-- Sección 3 — La Confesioneta AEHA
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS confesiones (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    texto VARCHAR(160) NOT NULL,
    pilar_relacionado VARCHAR(20) NOT NULL CHECK (pilar_relacionado IN ('ambicion', 'estoicismo', 'hedonismo', 'altruismo')),
    likes INTEGER DEFAULT 0,
    session_id UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- Tabla auxiliar: confesion_likes
-- Tracking de likes para evitar duplicados
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS confesion_likes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    confesion_id UUID NOT NULL REFERENCES confesiones(id) ON DELETE CASCADE,
    session_id UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(confesion_id, session_id)
);

-- ─────────────────────────────────────────
-- Índices para rendimiento
-- ─────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_reactions_pilar ON reactions(pilar);
CREATE INDEX IF NOT EXISTS idx_reactions_session ON reactions(session_id);
CREATE INDEX IF NOT EXISTS idx_votes_regla ON votes(regla_de_oro);
CREATE INDEX IF NOT EXISTS idx_votes_session ON votes(session_id);
CREATE INDEX IF NOT EXISTS idx_confesiones_pilar ON confesiones(pilar_relacionado);
CREATE INDEX IF NOT EXISTS idx_confesiones_likes ON confesiones(likes DESC);
CREATE INDEX IF NOT EXISTS idx_confesion_likes_session ON confesion_likes(session_id);

-- ─────────────────────────────────────────
-- Row Level Security (RLS)
-- ─────────────────────────────────────────
ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE confesiones ENABLE ROW LEVEL SECURITY;
ALTER TABLE confesion_likes ENABLE ROW LEVEL SECURITY;

-- Políticas: permitir operaciones anónimas (app pública)
CREATE POLICY "anon_insert_reactions" ON reactions FOR INSERT WITH CHECK (true);
CREATE POLICY "anon_select_reactions" ON reactions FOR SELECT USING (true);

CREATE POLICY "anon_insert_votes" ON votes FOR INSERT WITH CHECK (true);
CREATE POLICY "anon_select_votes" ON votes FOR SELECT USING (true);

CREATE POLICY "anon_insert_confesiones" ON confesiones FOR INSERT WITH CHECK (true);
CREATE POLICY "anon_select_confesiones" ON confesiones FOR SELECT USING (true);
CREATE POLICY "anon_update_confesiones" ON confesiones FOR UPDATE USING (true);

CREATE POLICY "anon_insert_confesion_likes" ON confesion_likes FOR INSERT WITH CHECK (true);
CREATE POLICY "anon_select_confesion_likes" ON confesion_likes FOR SELECT USING (true);

-- ─────────────────────────────────────────
-- Habilitar Supabase Realtime
-- ─────────────────────────────────────────
ALTER PUBLICATION supabase_realtime ADD TABLE reactions;
ALTER PUBLICATION supabase_realtime ADD TABLE confesiones;
ALTER PUBLICATION supabase_realtime ADD TABLE votes;
