import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import AdminDashboardClient from "./AdminDashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // Auth check
  const cookieStore = await cookies();
  const token = cookieStore.get("mgx_admin_token");
  if (!token || token.value !== process.env.ADMIN_PASSWORD) {
    redirect("/admin");
  }

  // Fetch inscricoes
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  );

  const { data: inscricoes } = await supabase
    .from("inscricoes")
    .select("*")
    .order("data_inscricao", { ascending: false });

  const total = inscricoes?.length ?? 0;
  const pagos = inscricoes?.filter((i) => i.status === "confirmado").length ?? 0;
  const ativos = inscricoes?.filter((i) => i.status !== "rejeitado").length ?? 0;
  const totalMt = pagos * 800;
  const vagasRestantes = Math.max(0, 32 - ativos);

  return (
    <AdminDashboardClient
      inscricoes={inscricoes ?? []}
      stats={{ total, totalMt, vagasRestantes }}
    />
  );
}
