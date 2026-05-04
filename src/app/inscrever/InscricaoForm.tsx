"use client";

import { useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { track } from "@/lib/track";

type FormStatus = "idle" | "loading" | "success" | "error";

interface SuccessData {
  nome: string;
  nickname: string;
  whatsapp: string;
  jogo: string;
  comprovantivoUrl: string;
}

export default function InscricaoForm() {
  const searchParams = useSearchParams();
  const jogoParam = searchParams.get("jogo") || "FC25";
  const preco = jogoParam === "Fortnite" ? 200 : 800;
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fileName, setFileName] = useState("");
  const [successData, setSuccessData] = useState<SuccessData | null>(null);
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

      track("form_submit", { game: data.jogo, page: "inscrever" });
      setStatus("success");
      setSuccessData({
        nome: data.nome,
        nickname: data.nickname,
        whatsapp: data.whatsapp,
        jogo: data.jogo,
        comprovantivoUrl: data.comprovantivoUrl,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro desconhecido.";
      setStatus("error");
      setErrorMsg(message);
    }
  }

  if (status === "success" && successData) {
    const whatsappMsg = encodeURIComponent(
      `Olá MGX Gaming! 🎮\n\n` +
        `Acabei de me inscrever no torneio de ${successData.jogo}.\n\n` +
        `✅ Nome: ${successData.nome}\n` +
        `🎮 Nickname: ${successData.nickname}\n` +
        `📱 WhatsApp: ${successData.whatsapp}\n\n` +
        `Já fiz o pagamento de 800mt. Segue o comprovativo:\n` +
        `${successData.comprovantivoUrl}\n\n` +
        `Por favor, confirmar a inscrição! ✅`
    );

    return (
      <div className="bg-[#131313] p-12 text-center border-l-4 border-green-500 space-y-6">
        <div className="text-green-400">
          <span className="material-symbols-outlined text-6xl">check_circle</span>
        </div>
        <h2 className="font-headline font-black text-3xl uppercase">
          Inscrição Enviada!
        </h2>
        <p className="text-[#ababab]">
          A tua inscrição foi registada. Vais receber um <strong className="text-white">email de confirmação</strong> assim que o pagamento for verificado.
        </p>
        <div className="bg-[#1f1f1f] p-4 border border-[#484848] max-w-xs mx-auto">
          <p className="text-[#ababab] text-xs uppercase tracking-widest mb-3 font-bold">
            Comprovativo enviado
          </p>
          <img
            src={successData.comprovantivoUrl}
            alt="Comprovativo"
            className="w-full h-auto"
          />
        </div>
        <a
          href={`https://wa.me/258846190531?text=${whatsappMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-headline font-black py-4 px-8 uppercase tracking-widest transition-all"
        >
          <span className="material-symbols-outlined text-sm">chat</span>
          Confirmar via WhatsApp
        </a>
        <p className="text-[#484848] text-xs uppercase tracking-widest">
          Receberás um email quando o pagamento for aprovado
        </p>
        <div className="bg-[#1f1f1f] border border-[#484848] p-4 text-left max-w-xs mx-auto">
          <p className="text-[#ababab] text-xs flex items-start gap-2">
            <span className="material-symbols-outlined text-sm text-yellow-400 flex-shrink-0 mt-0.5">info</span>
            <span>O email de confirmação pode chegar à pasta de <strong className="text-white">spam/lixo</strong>. Verifica lá se não aparecer na caixa de entrada.</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status === "error" && (
        <div className="bg-red-900/30 border-l-4 border-red-500 p-4">
          <p className="text-red-400 font-bold text-sm">Erro:</p>
          <p className="text-red-300 text-sm mt-1">{errorMsg}</p>
          <p className="text-red-300/70 text-xs mt-3">
            Se o erro persiste, contacta: <strong>84 619 0531</strong>
          </p>
        </div>
      )}

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

      {/* Email */}
      <div>
        <label className="block font-headline font-bold uppercase text-xs tracking-widest text-[#ababab] mb-2">
          Email *
          <span className="ml-2 text-[#ffe792]/60 normal-case tracking-normal font-normal">
            (para receber confirmação)
          </span>
        </label>
        <input
          type="email"
          name="email"
          required
          placeholder="o_teu_email@gmail.com"
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
          defaultValue={jogoParam}
          className="w-full bg-[#262626] border-2 border-[#484848] px-6 py-4 text-white font-body focus:border-[#ffe792] focus:ring-0 outline-none transition-all"
        >
          <option value="FC25">FC25</option>
          <option value="Fortnite">Fortnite</option>
          <option value="Tekken 8" disabled>Tekken 8 (Em Breve)</option>
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
              <p className="text-[#ababab] text-sm">Clica para seleccionar o comprovativo</p>
              <p className="text-[#ababab]/50 text-xs mt-1">PNG, JPG ou PDF — máx. 5MB</p>
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
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
        />
      </div>

      {/* Payment Info */}
      <div className="bg-[#1f1f1f] border-l-4 border-[#ffe792] p-6">
        <h4 className="font-headline font-black uppercase text-sm mb-3 text-[#ffe792]">
          DADOS DE PAGAMENTO
        </h4>
        <div className="space-y-2 text-sm text-[#ababab]">
          <p>Valor: <span className="text-white font-bold">{preco} Meticais</span></p>
          <p>M-Pesa / E-mola: <span className="text-[#ffe792] font-bold text-lg">84 619 0531</span></p>
          <p className="text-xs text-[#ababab]/70 mt-2">Após o pagamento, faz upload do comprovativo acima.</p>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-6 bg-[#ffd709] text-black font-headline font-black text-xl uppercase tracking-tight hover:bg-[#ffe792] transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        {status === "loading" ? (
          <>
            <span className="material-symbols-outlined animate-spin">progress_activity</span>
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
