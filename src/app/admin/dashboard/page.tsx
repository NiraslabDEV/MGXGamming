import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import AdminDashboardClient from "./AdminDashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("mgx_admin_token");
  if (!token || token.value !== process.env.ADMIN_PASSWORD) {
    redirect("/admin");
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  );

  const [{ data: inscricoes }, { data: analyticsEvents }] = await Promise.all([
    supabase
      .from("inscricoes")
      .select("*")
      .order("data_inscricao", { ascending: false }),
    supabase
      .from("analytics_events")
      .select("event_name, game, created_at")
      .order("created_at", { ascending: false })
      .limit(5000),
  ]);

  return (
    <AdminDashboardClient
      inscricoes={inscricoes ?? []}
      analyticsEvents={analyticsEvents ?? []}
    />
  );
}
