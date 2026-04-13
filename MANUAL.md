# MGX Gaming — Manual do Site

Site oficial dos torneios MGX Gaming, desenvolvido para gerir inscrições, pagamentos e comunicação com os jogadores.

**URL do site:** https://mgxgamming-production.up.railway.app

---

## PARTE 1 — GUIA DO CLIENTE (JOGADOR)

### 1.1 Ver informações do torneio

1. Acede ao site e clica em **"Ver Torneio"** ou vai directamente a `/torneio/fifa`
2. Encontras:
   - Data do evento (16 de Maio)
   - Valor de inscrição (800 MT)
   - Prémio (4.000 MT)
   - Número de vagas restantes (actualizado em tempo real)
   - Regras e formato do torneio
   - Localização

---

### 1.2 Como se inscrever

1. Clica em **"Inscrever Online"** ou acede a `/inscrever`
2. Preenche o formulário com os seguintes dados:
   - **Nome Completo** — o teu nome real
   - **Email** — para receberes confirmação (verifica a pasta de spam)
   - **Número WhatsApp** — para contacto rápido
   - **Gamertag / Nickname** — o teu nome no jogo
   - **Torneio** — selecciona FIFA 24
3. Faz o pagamento de **800 MT** via M-Pesa ou E-mola para o número **84 619 0531**
4. Após o pagamento, faz upload do **comprovativo** (imagem ou PDF, máx. 5MB)
5. Clica em **"Confirmar Inscrição"**

---

### 1.3 Após a inscrição

Depois de submeter, aparece um ecrã de confirmação com:
- O comprovativo que enviaste
- Um botão para **confirmar via WhatsApp** (envia mensagem automática ao organizador)

> ⚠️ O email de confirmação pode ir para a pasta de **spam**. Verifica lá se não aparecer na caixa de entrada.

---

### 1.4 Emails que recebes

| Situação | Email |
|---|---|
| Pagamento aprovado | Confirmação + link para o grupo oficial WhatsApp do torneio |
| Pagamento rejeitado | Aviso + instruções para resolver via WhatsApp (84 619 0531) |

---

### 1.5 Botão WhatsApp flutuante

Em todas as páginas existe um botão verde no canto inferior direito para contactar directamente o organizador via WhatsApp.

---

## PARTE 2 — GUIA DO ADMINISTRADOR

### 2.1 Aceder ao painel admin

1. Vai a `/admin` (ou clica no ícone de cadeado discreto no rodapé do site)
2. Introduz a senha de acesso: **mgx2026admin**
3. Serás redirecionado para o dashboard

> Para alterar a senha, muda a variável `ADMIN_PASSWORD` no Railway.

---

### 2.2 Dashboard — visão geral

O painel mostra 6 estatísticas no topo:

| Card | O que significa |
|---|---|
| **Inscritos Activos** | Total de inscrições pendentes + aprovadas (rejeitados não contam) |
| **Aprovados** | Inscrições com pagamento confirmado |
| **Pendentes** | Inscrições aguardando verificação do pagamento |
| **Rejeitados** | Inscrições com pagamento inválido |
| **Total Arrecadado** | Soma dos pagamentos aprovados (aprovados × 800 MT) |
| **Vagas Restantes** | 32 menos os inscritos activos |

---

### 2.3 Lista de inscrições

- A tabela mostra todos os jogadores com nome, nickname, WhatsApp e status
- Usa o **filtro** (pendentes / pagos / todos) para encontrar rapidamente
- Usa a **barra de pesquisa** para filtrar por nome ou nickname
- Clica numa linha para ver os detalhes e o comprovativo desse jogador

---

### 2.4 Verificar um pagamento

1. Clica na linha do jogador na tabela
2. No painel da direita (ou abaixo no mobile) vês:
   - Foto do comprovativo de pagamento
   - Nome, nickname, email, WhatsApp, data de inscrição
3. Passa o rato sobre a imagem e clica **"Ver em tamanho real"** para ampliar
4. Verifica se o pagamento está correcto no M-Pesa/E-mola

---

### 2.5 Aprovar um pagamento

1. Com o jogador seleccionado, clica em **"Aprovar"** (botão amarelo)
2. O status muda imediatamente para **"Pago ✓"**
3. O jogador recebe automaticamente um **email de confirmação** com o link do grupo WhatsApp do torneio

---

### 2.6 Rejeitar um pagamento

1. Com o jogador seleccionado, clica em **"Rejeitar"** (botão cinzento)
2. O status muda para **"Rejeitado"**
3. O jogador recebe automaticamente um **email** a informar que o pagamento foi rejeitado e como resolver
4. A vaga fica disponível novamente para outro jogador

---

### 2.7 Alterar status depois de decidir

Podes mudar o status a qualquer momento:

| Status actual | Opções disponíveis |
|---|---|
| Pendente | Aprovar / Rejeitar |
| Aprovado | Rejeitar |
| Rejeitado | Aprovar / Mover para Pendente |

---

### 2.8 Contactar jogador

No painel de detalhes tens dois botões de contacto:
- **Email** — visível no painel (clica para copiar)
- **Contactar via WhatsApp** — abre conversa directa com o jogador

---

### 2.9 Apagar um registo

1. Selecciona o jogador
2. Clica em **"Apagar registo"** (botão discreto no fundo do painel)
3. Confirma a acção
4. O registo é removido permanentemente da base de dados

> ⚠️ Esta acção é irreversível. O jogador não recebe notificação ao ser apagado.

---

### 2.10 Sair do painel

Clica no ícone de **logout** no canto superior direito, ou no botão "Sair" no menu lateral.

---

## PARTE 3 — REFERÊNCIA RÁPIDA

### Dados importantes

| Item | Valor |
|---|---|
| URL do site | https://mgxgamming-production.up.railway.app |
| Painel admin | /admin |
| Senha admin | mgx2026admin |
| Número de pagamento | 84 619 0531 (M-Pesa / E-mola) |
| WhatsApp organizador | 84 619 0531 |
| Email organizador | niraslab.dev@gmail.com |
| Vagas totais | 32 |
| Valor inscrição | 800 MT |

### Fluxo completo de uma inscrição

```
Jogador preenche formulário
        ↓
Upload do comprovativo
        ↓
Registo guardado como "Pendente"
        ↓
Organizador verifica no admin
        ↓
    ┌───────────┐
    │  Aprovar  │ → Email ao jogador com link do grupo WhatsApp
    └───────────┘
    ┌───────────┐
    │  Rejeitar │ → Email ao jogador com instruções para resolver
    └───────────┘
```

### Serviços utilizados

| Serviço | Para quê |
|---|---|
| Railway | Alojamento do site |
| Supabase | Base de dados + armazenamento de comprovativos |
| Resend | Envio de emails automáticos |
| WhatsApp | Comunicação directa com jogadores |
