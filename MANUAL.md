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

---

## PARTE 4 — ADICIONAR UM NOVO TORNEIO

O site foi construído para crescer. Para adicionar um campeonato novo (ex: **Tekken 8**, **Free Fire**, **EA FC26**), segue estes passos.

> Exemplo usado nesta secção: **Tekken 8** — 8 vagas, 500 MT, a 30 de Junho.

---

### 4.1 Imagem do torneio

Coloca a imagem na pasta `public/` com o nome `tekken-torneio.jpg`.

- Formato recomendado: JPG ou PNG
- Tamanho ideal: 1280 × 720 px
- A imagem aparece no hero da página do torneio e no card da homepage

---

### 4.2 Criar a página de detalhes

Cria o ficheiro `src/app/torneio/tekken/page.tsx`.

Copia o conteúdo de `src/app/torneio/fortnite/page.tsx` e substitui estas partes:

```ts
// 1. Total de vagas
const TOTAL_VAGAS = 8;

// 2. Filtro no Supabase — usa exactamente o nome que vais usar no formulário
.eq("jogo", "Tekken 8")

// 3. Imagem hero
src="/tekken-torneio.jpg"
alt="MGX Gaming — Tekken 8 Torneio 30 de Junho"

// 4. Título
CAMPEONATO DE TEKKEN 8

// 5. Cards de info (data / inscrição / prémio)
<p>30 de JUNHO</p>
<p>500mt</p>
<p>A definir</p>   ← ou o prémio real

// 6. Links de inscrição
href="/inscrever?jogo=Tekken 8"

// 7. PageTracker (para analytics)
<PageTracker page="torneio_tekken" game="Tekken 8" />

// 8. TrackedLink (para rastrear cliques)
eventGame="Tekken 8"
```

Actualiza também as secções de **Regras** e **Formato** para o jogo específico.

---

### 4.3 Registar o torneio na página de inscrição

Abre `src/app/inscrever/page.tsx`.

Localiza o objeto `CONFIG` (linha ~17) e adiciona a entrada:

```ts
const CONFIG = {
  Fortnite:   { vagas: 39, preco: 200, premio: "A definir", data: "23 de Maio",   titulo: "FORTNITE" },
  "Tekken 8": { vagas: 8,  preco: 500, premio: "A definir", data: "30 de Junho",  titulo: "TEKKEN 8" }, // ← NOVO
  default:    { vagas: 16, preco: 800, premio: "4.000mt",   data: "16 de Maio",   titulo: "FC25" },
};
```

---

### 4.4 Activar o jogo no formulário

Abre `src/app/inscrever/InscricaoForm.tsx`.

**a) Activar o select** — remove o `disabled`:
```tsx
// Antes (jogo em breve)
<option value="Tekken 8" disabled>Tekken 8 (Em Breve)</option>

// Depois (jogo activo)
<option value="Tekken 8">Tekken 8</option>
```

**b) Actualizar o mapa de preços** (linha ~19):
```ts
// Substituir esta linha:
const preco = jogoParam === "Fortnite" ? 200 : 800;

// Por este mapa que suporta qualquer número de jogos:
const precoMap: Record<string, number> = {
  "FC25": 800,
  "Fortnite": 200,
  "Tekken 8": 500,   // ← adiciona aqui cada novo jogo
};
const preco = precoMap[jogoParam] ?? 800;
```

---

### 4.5 Card na homepage

Abre `src/app/page.tsx` e localiza a secção `{/* Tournaments Grid */}`.

Duplica o bloco `{/* Fortnite Card */}` e substitui os dados:

```tsx
{/* Tekken 8 Card */}
<div className="group relative bg-[#131313] p-1 border-l-4 border-[#ffe792] hover:-translate-y-2 transition-all duration-300">
  <div className="relative aspect-video overflow-hidden mb-6">
    <img
      src="/tekken-torneio.jpg"
      alt="MGX Gaming — Tekken 8 Torneio 30 de Junho"
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
    />
    <div className="absolute top-4 left-4 bg-[#ffe792] text-black px-3 py-1 font-headline font-bold text-xs uppercase">
      30 JUNHO
    </div>
  </div>
  <div className="p-6 pt-0">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-2xl font-headline font-black uppercase">Tekken 8</h3>
      <span className="text-[#ffe792] font-headline font-bold text-sm">FIGHTING</span>
    </div>
    <div className="grid grid-cols-2 gap-4 mb-8">
      <div className="bg-[#1f1f1f] p-4">
        <span className="block text-[10px] text-[#ababab] font-headline font-black uppercase tracking-widest mb-1">Entry Fee</span>
        <span className="text-xl font-headline font-bold">500mt</span>
      </div>
      <div className="bg-[#1f1f1f] p-4">
        <span className="block text-[10px] text-[#ababab] font-headline font-black uppercase tracking-widest mb-1">Vagas</span>
        <span className="text-xl font-headline font-bold text-[#ffe792]">8 jogadores</span>
      </div>
    </div>
    <TrackedLink
      href="/torneio/tekken"
      eventName="click_card_tekken"
      eventGame="Tekken 8"
      className="block w-full py-4 bg-[#ffd709] text-black font-headline font-black uppercase tracking-tight hover:bg-[#ffe792] transition-colors text-center"
    >
      Ver Detalhes
    </TrackedLink>
  </div>
</div>
```

> Com 4+ torneios activos ao mesmo tempo, muda a grid para `lg:grid-cols-4`.

---

### 4.6 Actualizar o painel admin

Abre `src/app/admin/dashboard/AdminDashboardClient.tsx`.

**a) Adicionar jogo ao filtro da sidebar** (linha ~34):
```tsx
// Tipo do estado
const [selectedGame, setSelectedGame] = useState<"all" | "FC25" | "Fortnite" | "Tekken 8">("all");

// Array que gera os botões
{(["all", "FC25", "Fortnite", "Tekken 8"] as const).map((game) => (
```

**b) Actualizar vagas restantes** (linha ~50):
```tsx
// Soma total de vagas: FC25(16) + Fortnite(39) + Tekken 8(8) = 63
const gameVagas = Math.max(0, (
  selectedGame === "Fortnite" ? 39 :
  selectedGame === "Tekken 8" ? 8 :
  selectedGame === "all" ? 63 : 16   // ← actualiza este total
) - gameAtivos);
```

**c) Actualizar cálculo de receita** (linha ~47):
```tsx
// Antes
.reduce((sum, i) => sum + (i.jogo === "Fortnite" ? 200 : 800), 0);

// Depois — adiciona cada novo jogo ao mapa
.reduce((sum, i) => {
  const precos: Record<string, number> = {
    "FC25": 800,
    "Fortnite": 200,
    "Tekken 8": 500,   // ← adiciona aqui
  };
  return sum + (precos[i.jogo] ?? 800);
}, 0);
```

---

### 4.7 Analytics do novo jogo (opcional)

Abre `src/app/admin/dashboard/AnalyticsTab.tsx`.

Adiciona as variáveis de contagem e um bloco na grelha "Per-game":

```tsx
// Variáveis (adiciona junto às outras, linha ~90)
const tekkenTorneio   = eventsWithPage.filter((e) => e.event_name === "page_view" && e.page === "torneio_tekken").length;
const tekkenInscrever = events.filter((e) => e.event_name === "click_inscrever" && e.game === "Tekken 8").length;
const tekkenSubmit    = events.filter((e) => e.event_name === "form_submit" && e.game === "Tekken 8").length;
const tekkenAprov     = inscricoes.filter((i) => i.status === "confirmado" && i.jogo === "Tekken 8").length;

// Bloco na grelha (duplica o bloco Fortnite e substitui os valores)
<div className="bg-[#131313] p-8">
  <h3 ...>TEKKEN 8</h3>
  <FunnelStep label="Viu Torneio"        value={tekkenTorneio}   top={homeViews || 1} />
  <FunnelStep label="Clicou Inscrever"   value={tekkenInscrever} top={homeViews || 1} color="#4ade80" />
  <FunnelStep label="Submeteu Formulário" value={tekkenSubmit}   top={homeViews || 1} color="#facc15" />
  <FunnelStep label="Aprovados"          value={tekkenAprov}     top={homeViews || 1} color="#22c55e" />
</div>
```

---

### 4.8 Checklist final

Antes de fazer o push, confirma:

- [ ] Imagem em `public/nome-torneio.jpg`
- [ ] Página `src/app/torneio/nome/page.tsx` criada
- [ ] `<PageTracker>` adicionado à nova página
- [ ] `<TrackedLink>` nos botões de inscrição da nova página
- [ ] CONFIG em `inscrever/page.tsx` actualizado
- [ ] Opção no select de `InscricaoForm.tsx` activada (sem `disabled`)
- [ ] Mapa de preços em `InscricaoForm.tsx` actualizado
- [ ] Card adicionado na homepage `page.tsx`
- [ ] Tipo `selectedGame` no `AdminDashboardClient.tsx` actualizado
- [ ] Cálculo de vagas totais no admin actualizado
- [ ] Cálculo de receita no admin actualizado
- [ ] `git add -A && git commit -m "Add torneio Tekken 8" && git push origin main`

O deploy no Railway demora ~2 minutos após o push.

---

## PARTE 5 — DEPLOY E VARIÁVEIS DE AMBIENTE

O site está hospedado no **Railway**. O código está no **GitHub** (`NiraslabDEV/MGXGamming`).

Qualquer commit no branch `main` faz deploy automático.

```bash
git add -A
git commit -m "Descrição do que mudaste"
git push origin main
```

**Variáveis de ambiente no Railway** (nunca colocar no código):

| Variável | Descrição |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projecto Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave de serviço do Supabase |
| `EMAIL_KEY` | Chave da API Resend (emails automáticos) |
| `ORGANIZER_EMAIL` | Email que recebe notificações de novas inscrições |
| `ADMIN_PASSWORD` | Password do painel admin |

Para alterar: Railway → projecto → Variables → editar → redeploy automático.

