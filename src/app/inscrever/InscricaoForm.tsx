"use client";

import { useState, useRef } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function InscricaoForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fileName, setFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/inscricao", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao processar inscrição.");
      }

      setStatus("success");

      // Open WhatsApp with formatted message
      const nome = formData.get("nome") as string;
      const nickname = formData.get("nickname") as string;
      const whatsapp = formData.get("whatsapp") as string;
      const jogo = formData.get("jogo") as string;

      const msg = encodeURIComponent(
        `Olá MGX Gaming! Acabei de me inscrever no torneio.\n\n` +
          `✅ Nome: ${nome}\n` +
          `🎮 Nickname: ${nickname}\n` +
          `📱 WhatsApp: ${whatsapp}\n` +
          `🕹️ Jogo: ${jogo}\n\n` +
          `Já fiz o pagamento de 800mt. Confirmar inscrição!`
      );

      setTimeout(() => {
        window.open(`https://wa.me/258846190531?text=${msg}`, "_blank");
      }, 1500);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro desconhecido.";
      setStatus("error");
      setErrorMsg(message);
    }
  }

  if (status === "success") {
    return (
      <div className="bg-[#131313] p-12 text-center border-l-4 border-green-500">
        <div className="text-green-400 mb-4">
          <span className="material-symbols-outlined text-6xl">
            check_circle
          </span>
        </div>
        <h2 className="font-headline font-black text-3xl uppercase mb-4">
          Inscrição Enviada!
        </h2>
        <p className="text-[#ababab] mb-6">
          A tua inscrição foi registada com sucesso. Estamos a abrir o
          WhatsApp para confirmares com a equipa MGX Gaming.
        </p>
        <p className="text-[#ffe792] font-bold text-sm uppercase tracking-widest">
          Se o WhatsApp não abrir automaticamente, envia uma mensagem para{" "}
          <a
            href="https://wa.me/258846190531"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            84 619 0531
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nome */}
      <div>
        <label className="block font-headline font-bold uppercase text-xs tracking-widest text-[#ababab] mb-2">
          Nome Completo *
        </label>
        <input
          type="text"
          name="nome"
          required
          placeholder="O teu nome completo"
          className="w-full bg-[#262626] border-2 border-[#484848] px-6 py-4 text-white font-body focus:border-[#ffe792] focus:ring-0 outline-none transition-all placeholder:text-[#ababab]/40"
        />
      </div>

      {/* WhatsApp */}
      <div>
        <label className="block font-headline font-bold uppercase text-xs tracking-widest text-[#ababab] mb-2">
          Número WhatsApp *
        </label>
        <input
          type="tel"
          name="whatsapp"
          required
          placeholder="84 XXX XXXX ou 85 XXX XXXX"
          className="w-full bg-[#262626] border-2 border-[#484848] px-6 py-4 text-white font-body focus:border-[#ffe792] focus:ring-0 outline-none transition-all placeholder:text-[#ababab]/40"
        />
      </div>

      {/* Nickname */}
      <div>
        <label className="block font-headline font-bold uppercase text-xs tracking-widest text-[#ababab] mb-2">
          Gamertag / Nickname *
        </label>
        <input
          type="text"
          name="nickname"
          required
          placeholder="O teu nickname no jogo"
          className="w-full bg-[#262626] border-2 border-[#484848] px-6 py-4 text-white font-body focus:border-[#ffe792] focus:ring-0 outline-none transition-all placeholder:text-[#ababab]/40"
        />
      </div>

      {/* Jogo */}
      <div>
        <label className="block font-headline font-bold uppercase text-xs tracking-widest text-[#ababab] mb-2">
          Torneio *
        </label>
        <select
          name="jogo"
          required
          defaultValue="FIFA 24"
          className="w-full bg-[#262626] border-2 border-[#484848] px-6 py-4 text-white font-body focus:border-[#ffe792] focus:ring-0 outline-none transition-all"
        >
          <option value="FIFA 24">FIFA 24</option>
          <option value="Tekken 8" disabled>
            Tekken 8 (Em Breve)
          </option>
        </select>
      </div>

      {/* Upload Comprovativo */}
      <div>
        <label className="block font-headline font-bold uppercase text-xs tracking-widest text-[#ababab] mb-2">
          Comprovativo de Pagamento * (M-Pesa / E-mola)
        </label>
        <div
          className="w-full bg-[#262626] border-2 border-dashed border-[#484848] px-6 py-8 text-center cursor-pointer hover:border-[#ffe792] transition-all"
          onClick={() => fileRef.current?.click()}
        >
          <span className="material-symbols-outlined text-4xl text-[#ffe792]/60 block mb-2">
            upload_file
          </span>
          {fileName ? (
            <p className="text-white font-bold">{fileName}</p>
          ) : (
            <>
              <p className="text-[#ababab] text-sm">
                Clica para seleccionar o comprovativo
              </p>
              <p className="text-[#ababab]/50 text-xs mt-1">
                PNG, JPG ou PDF — máx. 5MB
              </p>
            </>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          name="comprovativo"
          accept="image/*,.pdf"
          required
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            setFileName(file ? file.name : "");
          }}
        />
      </div>

      {/* Payment Info */}
      <div className="bg-[#1f1f1f] border-l-4 border-[#ffe792] p-6">
        <h4 className="font-headline font-black uppercase text-sm mb-3 text-[#ffe792]">
          DADOS DE PAGAMENTO
        </h4>
        <div className="space-y-2 text-sm text-[#ababab]">
          <p>
            Valor:{" "}
            <span className="text-white font-bold">800 Meticais</span>
          </p>
          <p>
            M-Pesa / E-mola:{" "}
            <span className="text-[#ffe792] font-bold text-lg">84 619 0531</span>
          </p>
          <p className="text-xs text-[#ababab]/70 mt-2">
            Após o pagamento, faz upload do comprovativo acima.
          </p>
        </div>
      </div>

      {/* Error Message */}
      {status === "error" && (
        <div className="bg-red-900/30 border border-red-500 p-4 text-red-300 text-sm">
          {errorMsg}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-6 bg-[#ffd709] text-black font-headline font-black text-xl uppercase tracking-tight hover:bg-[#ffe792] transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        {status === "loading" ? (
          <>
            <span className="material-symbols-outlined animate-spin">
              progress_activity
            </span>
            A PROCESSAR...
          </>
        ) : (
          <>
            CONFIRMAR INSCRIÇÃO
            <span className="material-symbols-outlined">sports_esports</span>
          </>
        )}
      </button>

      <p className="text-center text-xs text-[#ababab]/60">
        Ao confirmar, aceitas as regras do torneio MGX Gaming.
      </p>
    </form>
  );
}
