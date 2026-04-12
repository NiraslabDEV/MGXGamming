-- MGX Gaming — Schema Supabase
-- Execute este SQL no Supabase SQL Editor

-- Tabela de torneios
CREATE TABLE IF NOT EXISTS torneios (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nome text NOT NULL,
  data date NOT NULL,
  premio integer NOT NULL,
  valor_inscricao integer NOT NULL DEFAULT 800,
  vagas_totais integer NOT NULL DEFAULT 32,
  vagas_restantes integer NOT NULL DEFAULT 32,
  ativo boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Tabela de inscrições
CREATE TABLE IF NOT EXISTS inscricoes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nome text NOT NULL,
  whatsapp text NOT NULL,
  nickname text NOT NULL,
  jogo text NOT NULL DEFAULT 'FIFA 24',
  comprovativo_url text,
  status text NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'confirmado', 'rejeitado')),
  data_inscricao timestamptz DEFAULT now()
);

-- Inserir torneio FIFA 24
INSERT INTO torneios (nome, data, premio, valor_inscricao, vagas_totais, vagas_restantes)
VALUES ('Campeonato de FIFA 24', '2026-05-16', 4000, 800, 32, 20)
ON CONFLICT DO NOTHING;

-- Bucket de storage para comprovativos
-- (Criar manualmente no painel Supabase → Storage → New Bucket → "comprovativos" → Public)

-- RLS Policies — Inscrições (somente insert público, select apenas autenticado)
ALTER TABLE inscricoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Qualquer um pode inserir inscrição"
  ON inscricoes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Apenas autenticado pode ler inscrições"
  ON inscricoes FOR SELECT
  USING (auth.role() = 'authenticated');

-- RLS para torneios (leitura pública)
ALTER TABLE torneios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Qualquer um pode ver torneios"
  ON torneios FOR SELECT
  USING (true);
