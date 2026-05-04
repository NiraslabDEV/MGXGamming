"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

export default function PageTracker({
  page,
  game,
}: {
  page: string;
  game?: string;
}) {
  useEffect(() => {
    track("page_view", { page, game });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
