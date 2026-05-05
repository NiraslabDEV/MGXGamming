"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(target: Date): TimeLeft | null {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function CountdownTimer({
  targetDate,
  label = "Para o evento",
  compact = false,
}: {
  targetDate: string; // ISO string ex: "2026-05-16T10:00:00"
  label?: string;
  compact?: boolean;
}) {
  const target = new Date(targetDate);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() => calcTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (!timeLeft) {
    return (
      <p className="font-label text-xs uppercase tracking-[0.2em] text-[#ababab]">
        Evento encerrado
      </p>
    );
  }

  if (compact) {
    return (
      <div className="flex items-center gap-2 font-headline font-black text-xl">
        <span className="text-[#ffe792]">{timeLeft.days}d</span>
        <span className="text-[#484848]">:</span>
        <span>{pad(timeLeft.hours)}h</span>
        <span className="text-[#484848]">:</span>
        <span>{pad(timeLeft.minutes)}m</span>
        <span className="text-[#484848]">:</span>
        <span className="text-[#ababab]">{pad(timeLeft.seconds)}s</span>
      </div>
    );
  }

  return (
    <div>
      <p className="font-label text-[11px] uppercase tracking-[0.3em] text-[#ababab] mb-4">
        {label}
      </p>
      <div className="flex items-end gap-4">
        {[
          { value: timeLeft.days,    unit: "DIAS" },
          { value: timeLeft.hours,   unit: "HRS"  },
          { value: timeLeft.minutes, unit: "MIN"  },
          { value: timeLeft.seconds, unit: "SEG"  },
        ].map(({ value, unit }, i) => (
          <div key={unit} className="flex items-end gap-4">
            {i > 0 && <span className="font-headline font-black text-4xl text-[#484848] mb-2">:</span>}
            <div className="text-center">
              <span className="block font-headline font-black text-6xl leading-none tabular-nums">
                {pad(value)}
              </span>
              <span className="font-label text-[10px] uppercase tracking-[0.2em] text-[#484848] mt-1 block">
                {unit}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
