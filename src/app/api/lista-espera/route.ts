import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  );
}

// Simples rate limiting: IP -> contagem de registos nos últimos 5 minutos
const rateLimitMap = new Map<
  string,
  { count: number; resetTime: number }
>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || limit.resetTime < now) {
    // Reset ou primeira vez
    rateLimitMap.set(ip, { count: 1, resetTime: now + 5 * 60 * 1000 });
    return true;
  }

  if (limit.count >= 3) {
    return false; // Muito rápido
  }

  limit.count++;
  return true;
}

export async function POST(req: NextRequest) {
  // Validar env vars
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    return NextResponse.json(
      { error: "Servidor não configurado." },
      { status: 500 }
    );
  }

  try {
    const { email, nome } = await req.json();

    // Validar email
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { error: "Email inválido." },
        { status: 400 }
      );
    }

    // Rate limiting
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        {
          error:
            "Demasiadas tentativas. Tenta novamente em 5 minutos.",
        },
        { status: 429 }
      );
    }

    // Limpar nome se fornecido
    const cleanNome = nome ? String(nome).trim().slice(0, 255) : null;

    const supabase = getSupabase();

    // Tentar inserir (unique constraint previne duplicados)
    const { data, error } = await supabase
      .from("lista_espera")
      .insert([{ email: email.toLowerCase(), nome: cleanNome }])
      .select();

    if (error) {
      if (error.message.includes("duplicate")) {
        return NextResponse.json(
          { error: "Este email já está registado na lista de espera." },
          { status: 409 }
        );
      }
      throw error;
    }

    return NextResponse.json(
      {
        success: true,
        message: "Email registado com sucesso! Serás notificado em breve.",
        data: data?.[0],
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Erro ao registar na lista de espera:", err);
    return NextResponse.json(
      { error: "Erro ao registar. Tenta novamente." },
      { status: 500 }
    );
  }
}

// GET — Retorna lista de espera (apenas para autenticado — será chamado do painel admin)
export async function GET(req: NextRequest) {
  // Verificar se é uma requisição autenticada — por enquanto retornar erro se não tiver token
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json(
      { error: "Não autenticado." },
      { status: 401 }
    );
  }

  try {
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from("lista_espera")
      .select("*")
      .order("data_registo", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    console.error("Erro ao buscar lista de espera:", err);
    return NextResponse.json(
      { error: "Erro ao buscar dados." },
      { status: 500 }
    );
  }
}
