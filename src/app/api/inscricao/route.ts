import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  );
}

function getResend() {
  return new Resend(process.env.RESEND_API_KEY || "");
}

export async function POST(req: NextRequest) {
  // Check env vars first
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Missing Supabase env vars");
    return NextResponse.json(
      { error: "Servidor não configurado. Contacta o administrador." },
      { status: 500 }
    );
  }

  try {
    const formData = await req.formData();

    const nome = formData.get("nome") as string;
    const email = formData.get("email") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const nickname = formData.get("nickname") as string;
    const jogo = formData.get("jogo") as string;
    const comprovativo = formData.get("comprovativo") as File | null;

    if (!nome || !email || !whatsapp || !nickname || !jogo) {
      return NextResponse.json(
        { error: "Preenche todos os campos obrigatórios." },
        { status: 400 }
      );
    }

    if (!comprovativo || comprovativo.size === 0) {
      return NextResponse.json(
        { error: "O comprovativo de pagamento é obrigatório." },
        { status: 400 }
      );
    }

    if (comprovativo.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "O comprovativo não pode ter mais de 5MB." },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    // Upload comprovativo to Supabase Storage
    const fileExt = comprovativo.name.split(".").pop();
    const fileName = `${Date.now()}-${nickname.replace(/\s+/g, "-")}.${fileExt}`;
    const arrayBuffer = await comprovativo.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from("Comprovativos")
      .upload(fileName, buffer, {
        contentType: comprovativo.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError.message);
      // Bucket não existe ou sem permissão
      if (uploadError.message.includes("not found") || uploadError.message.includes("Bucket")) {
        return NextResponse.json(
          { error: "Bucket de storage não configurado. Cria o bucket 'comprovativos' no Supabase." },
          { status: 500 }
        );
      }
      return NextResponse.json(
        { error: `Erro no upload: ${uploadError.message}` },
        { status: 500 }
      );
    }

    const { data: urlData } = supabase.storage
      .from("Comprovativos")
      .getPublicUrl(fileName);

    const comprovantivoUrl = urlData.publicUrl;

    // Save to DB
    const { error: dbError } = await supabase.from("inscricoes").insert({
      nome,
      email,
      whatsapp,
      nickname,
      jogo,
      comprovativo_url: comprovantivoUrl,
      status: "pendente",
    });

    if (dbError) {
      console.error("DB error:", dbError.message);
      if (dbError.message.includes("relation") || dbError.message.includes("does not exist")) {
        return NextResponse.json(
          { error: "Tabela 'inscricoes' não existe. Executa o schema.sql no Supabase." },
          { status: 500 }
        );
      }
      return NextResponse.json(
        { error: `Erro na base de dados: ${dbError.message}` },
        { status: 500 }
      );
    }

    // Send email (optional — skip if not configured)
    if (process.env.RESEND_API_KEY && process.env.ORGANIZER_EMAIL) {
      try {
        const resend = getResend();
        await resend.emails.send({
          from: "MGX Gaming <onboarding@resend.dev>",
          to: process.env.ORGANIZER_EMAIL,
          subject: `Nova Inscrição: ${nome} — ${jogo}`,
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0e0e0e;color:#fff;padding:32px;">
              <h1 style="color:#ffe792;font-size:24px;margin-bottom:8px;">NOVA INSCRIÇÃO</h1>
              <p style="color:#ababab;margin-bottom:24px;font-size:14px;">MGX Gaming — Torneio ${jogo}</p>
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:12px;border-bottom:1px solid #262626;color:#ababab;font-size:12px;">Nome</td><td style="padding:12px;border-bottom:1px solid #262626;font-weight:bold;">${nome}</td></tr>
                <tr><td style="padding:12px;border-bottom:1px solid #262626;color:#ababab;font-size:12px;">WhatsApp</td><td style="padding:12px;border-bottom:1px solid #262626;font-weight:bold;">${whatsapp}</td></tr>
                <tr><td style="padding:12px;border-bottom:1px solid #262626;color:#ababab;font-size:12px;">Nickname</td><td style="padding:12px;border-bottom:1px solid #262626;font-weight:bold;">${nickname}</td></tr>
              </table>
              <div style="margin-top:24px;padding:16px;background:#131313;border-left:4px solid #ffe792;">
                <a href="${comprovantivoUrl}" style="color:#ffe792;font-weight:bold;">Ver Comprovativo →</a>
              </div>
            </div>
          `,
        });
      } catch (emailErr) {
        // Email failure doesn't block the inscription
        console.error("Email error (non-fatal):", emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      comprovantivoUrl,
      nome,
      nickname,
      whatsapp,
      jogo,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("API error:", message);
    return NextResponse.json(
      { error: `Erro interno: ${message}` },
      { status: 500 }
    );
  }
}
