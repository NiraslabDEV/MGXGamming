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
  try {
    const formData = await req.formData();

    const nome = formData.get("nome") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const nickname = formData.get("nickname") as string;
    const jogo = formData.get("jogo") as string;
    const comprovativo = formData.get("comprovativo") as File | null;

    // Validate required fields
    if (!nome || !whatsapp || !nickname || !jogo) {
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

    // Validate file size (max 5MB)
    if (comprovativo.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "O comprovativo não pode ter mais de 5MB." },
        { status: 400 }
      );
    }

    // Upload comprovativo to Supabase Storage
    const fileExt = comprovativo.name.split(".").pop();
    const fileName = `${Date.now()}-${nickname.replace(/\s+/g, "-")}.${fileExt}`;
    const arrayBuffer = await comprovativo.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const supabase = getSupabase();

    const { error: uploadError } = await supabase.storage
      .from("comprovativos")
      .upload(fileName, buffer, {
        contentType: comprovativo.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json(
        { error: "Erro ao fazer upload do comprovativo. Tenta novamente." },
        { status: 500 }
      );
    }

    // Get public URL of comprovativo
    const { data: urlData } = supabase.storage
      .from("comprovativos")
      .getPublicUrl(fileName);

    const comprovantivoUrl = urlData.publicUrl;

    // Save inscription to Supabase DB
    const { error: dbError } = await supabase.from("inscricoes").insert({
      nome,
      whatsapp,
      nickname,
      jogo,
      comprovativo_url: comprovantivoUrl,
      status: "pendente",
    });

    if (dbError) {
      console.error("DB error:", dbError);
      return NextResponse.json(
        { error: "Erro ao guardar inscrição. Tenta novamente." },
        { status: 500 }
      );
    }

    // Send email notification to organizer
    if (process.env.RESEND_API_KEY && process.env.ORGANIZER_EMAIL) {
      const resend = getResend();
      await resend.emails.send({
        from: "MGX Gaming <noreply@mgxgaming.co.mz>",
        to: process.env.ORGANIZER_EMAIL,
        subject: `Nova Inscrição: ${nome} — ${jogo}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0e0e0e; color: #fff; padding: 32px;">
            <h1 style="color: #ffe792; font-size: 24px; margin-bottom: 8px;">NOVA INSCRIÇÃO</h1>
            <p style="color: #ababab; margin-bottom: 24px; font-size: 14px;">MGX Gaming — Torneio ${jogo}</p>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #262626; color: #ababab; font-size: 12px; text-transform: uppercase;">Nome</td>
                <td style="padding: 12px; border-bottom: 1px solid #262626; font-weight: bold;">${nome}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #262626; color: #ababab; font-size: 12px; text-transform: uppercase;">WhatsApp</td>
                <td style="padding: 12px; border-bottom: 1px solid #262626; font-weight: bold;">${whatsapp}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #262626; color: #ababab; font-size: 12px; text-transform: uppercase;">Nickname</td>
                <td style="padding: 12px; border-bottom: 1px solid #262626; font-weight: bold;">${nickname}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #262626; color: #ababab; font-size: 12px; text-transform: uppercase;">Jogo</td>
                <td style="padding: 12px; border-bottom: 1px solid #262626; font-weight: bold;">${jogo}</td>
              </tr>
            </table>

            <div style="margin-top: 24px; padding: 16px; background: #131313; border-left: 4px solid #ffe792;">
              <p style="color: #ababab; font-size: 12px; text-transform: uppercase; margin-bottom: 8px;">COMPROVATIVO</p>
              <a href="${comprovantivoUrl}" style="color: #ffe792; font-weight: bold;">Ver Comprovativo →</a>
            </div>

            <p style="color: #484848; font-size: 11px; margin-top: 32px;">MGX Gaming — Maputo, Moçambique</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Erro interno. Tenta novamente." },
      { status: 500 }
    );
  }
}
