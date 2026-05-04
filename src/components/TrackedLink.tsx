"use client";

import Link from "next/link";
import { ComponentProps } from "react";
import { track } from "@/lib/track";

type Props = ComponentProps<typeof Link> & {
  eventName: string;
  eventGame?: string;
  eventPage?: string;
};

export default function TrackedLink({
  eventName,
  eventGame,
  eventPage,
  onClick,
  children,
  ...props
}: Props) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        track(eventName, { game: eventGame, page: eventPage });
        onClick?.(e);
      }}
    >
      {children}
    </Link>
  );
}
