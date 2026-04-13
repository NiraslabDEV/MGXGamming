import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  );
}

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
  const { error } = await supabase
    .from("inscricoes")
    .update({ status })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
