-- MGX Gaming — Sistema de Lista de Espera
-- Execute este SQL no Supabase SQL Editor

-- Tabela de Lista de Espera
CREATE TABLE IF NOT EXISTS lista_espera (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  nome text,
  data_registo timestamptz DEFAULT now()
);

-- RLS Policy — Qualquer um pode inserir, apenas autenticado pode ler
ALTER TABLE lista_espera ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Qualquer um pode registar na lista de espera"
  ON lista_espera FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Apenas autenticado pode ler lista de espera"
  ON lista_espera FOR SELECT
  USING (auth.role() = 'authenticated');
