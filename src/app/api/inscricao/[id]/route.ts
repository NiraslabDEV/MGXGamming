import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { cookies } from "next/headers";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  );
}

const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/IkoKdPj6QUk9XTXdDmD7H8";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Auth check
  const cookieStore = await cookies();
  const token = cookieStore.get("mgx_admin_token");
  if (!token || token.value !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { id } = await params;
  const { status } = await req.json();

  if (!["confirmado", "rejeitado", "pendente"].includes(status)) {
    return NextResponse.json({ error: "Status inválido." }, { status: 400 });
  }

  const supabase = getSupabase();

  // Fetch player data before updating (needed for email)
  const { data: inscricao, error: fetchError } = await supabase
    .from("inscricoes")
    .select("nome, email, nickname, jogo")
    .eq("id", id)
    .single();

  if (fetchError || !inscricao) {
    return NextResponse.json({ error: "Inscrição não encontrada." }, { status: 404 });
  }

  // Update status
  const { error } = await supabase
    .from("inscricoes")
    .update({ status })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Send email notification if Resend is configured and player has email
  if (process.env.RESEND_API_KEY && inscricao.email && (status === "confirmado" || status === "rejeitado")) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);

      if (status === "confirmado") {
        await resend.emails.send({
          from: "MGX Gaming <onboarding@resend.dev>",
          to: inscricao.email,
          subject: `✅ Inscrição Confirmada — ${inscricao.jogo} | MGX Gaming`,
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0e0e0e;color:#fff;padding:32px;">
              <div style="border-left:4px solid #ffe792;padding-left:20px;margin-bottom:24px;">
                <h1 style="color:#ffe792;font-size:28px;margin:0;text-transform:uppercase;letter-spacing:-1px;">Pagamento Aprovado!</h1>
                <p style="color:#ababab;margin:8px 0 0;font-size:14px;">MGX Gaming — Torneio ${inscricao.jogo}</p>
              </div>

              <p style="font-size:16px;line-height:1.6;">Olá <strong>${inscricao.nome}</strong>,</p>
              <p style="font-size:15px;color:#ababab;line-height:1.6;">
                O teu pagamento foi verificado e a tua inscrição está <strong style="color:#ffe792;">confirmada</strong>!
                Estás oficialmente no torneio de <strong>${inscricao.jogo}</strong>.
              </p>

              <div style="background:#131313;border:1px solid #262626;padding:20px;margin:24px 0;">
                <p style="color:#ababab;font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:0 0 4px;">Nickname</p>
                <p style="font-size:20px;font-weight:900;color:#ffe792;margin:0;text-transform:uppercase;">${inscricao.nickname}</p>
              </div>

              <div style="background:#1a3a1a;border:1px solid #2d5a2d;padding:20px;margin:24px 0;text-align:center;">
                <p style="color:#4ade80;font-size:13px;text-transform:uppercase;letter-spacing:2px;margin:0 0 12px;font-weight:bold;">Próximo Passo</p>
                <p style="color:#d1fae5;font-size:14px;margin:0 0 16px;">Entra no grupo oficial do torneio para receberes todas as informações sobre datas, horários e bracket:</p>
                <a href="${WHATSAPP_GROUP_LINK}" style="display:inline-block;background:#25d366;color:#fff;font-weight:900;text-decoration:none;padding:14px 28px;font-size:14px;text-transform:uppercase;letter-spacing:1px;">
                  Entrar no Grupo WhatsApp →
                </a>
              </div>

              <p style="color:#ababab;font-size:13px;line-height:1.6;margin-top:24px;">
                Qualquer dúvida, contacta-nos pelo WhatsApp: <strong style="color:#fff;">84 619 0531</strong>
              </p>

              <div style="border-top:1px solid #262626;margin-top:32px;padding-top:16px;">
                <p style="color:#484848;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0;">
                  © 2026 MGX Gaming · Urban Kinetic Division · Maputo
                </p>
              </div>
            </div>
          `,
        });
      } else if (status === "rejeitado") {
        await resend.emails.send({
          from: "MGX Gaming <onboarding@resend.dev>",
          to: inscricao.email,
          subject: `❌ Inscrição Cancelada — ${inscricao.jogo} | MGX Gaming`,
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0e0e0e;color:#fff;padding:32px;">
              <div style="border-left:4px solid #ef4444;padding-left:20px;margin-bottom:24px;">
                <h1 style="color:#ef4444;font-size:28px;margin:0;text-transform:uppercase;letter-spacing:-1px;">Inscrição Cancelada</h1>
                <p style="color:#ababab;margin:8px 0 0;font-size:14px;">MGX Gaming — Torneio ${inscricao.jogo}</p>
              </div>

              <p style="font-size:16px;line-height:1.6;">Olá <strong>${inscricao.nome}</strong>,</p>
              <p style="font-size:15px;color:#ababab;line-height:1.6;">
                Infelizmente não conseguimos verificar o teu comprovativo de pagamento.
                A tua inscrição no torneio de <strong>${inscricao.jogo}</strong> foi cancelada.
              </p>

              <div style="background:#1f0808;border:1px solid #5a2020;padding:20px;margin:24px 0;">
                <p style="color:#fca5a5;font-size:14px;margin:0 0 8px;font-weight:bold;">O que podes fazer:</p>
                <ul style="color:#fca5a5;font-size:14px;margin:0;padding-left:20px;line-height:2;">
                  <li>Verificar se o pagamento foi efectuado correctamente</li>
                  <li>Enviar um novo comprovativo válido</li>
                  <li>Contactar-nos para resolver a situação</li>
                </ul>
              </div>

              <div style="background:#131313;border:1px solid #262626;padding:20px;margin:24px 0;text-align:center;">
                <p style="color:#ababab;font-size:12px;text-transform:uppercase;letter-spacing:2px;margin:0 0 12px;">Precisas de ajuda?</p>
                <a href="https://wa.me/258846190531?text=Ol%C3%A1%2C+o+meu+pagamento+foi+rejeitado.+Gostava+de+resolver+a+situa%C3%A7%C3%A3o+para+o+torneio+de+${encodeURIComponent(inscricao.jogo)}." style="display:inline-block;background:#25d366;color:#fff;font-weight:900;text-decoration:none;padding:14px 28px;font-size:14px;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">
                  Contactar via WhatsApp
                </a>
                <p style="color:#484848;font-size:12px;margin:8px 0 0;">ou responde a este email</p>
              </div>

              <p style="color:#ababab;font-size:13px;line-height:1.6;">
                WhatsApp: <strong style="color:#fff;">84 619 0531</strong><br/>
                Número de pagamento: <strong style="color:#ffe792;">84 619 0531</strong> (M-Pesa / E-mola) — Valor: 800 MT
              </p>

              <div style="border-top:1px solid #262626;margin-top:32px;padding-top:16px;">
                <p style="color:#484848;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0;">
                  © 2026 MGX Gaming · Urban Kinetic Division · Maputo
                </p>
              </div>
            </div>
          `,
        });
      }
    } catch (emailErr) {
      // Email failure doesn't block the status update
      console.error("Email notification error (non-fatal):", emailErr);
    }
  }

  return NextResponse.json({ success: true });
}
