-- Migração: Atualizar registos antigos de "FIFA 24" para "FC25"
-- Data: 2026-04-15
-- Descrição: O torneio passou de FIFA 24 para FC25. Este script atualiza
--            todos os registos existentes na base de dados.

UPDATE inscricoes
SET jogo = 'FC25'
WHERE jogo = 'FIFA 24';