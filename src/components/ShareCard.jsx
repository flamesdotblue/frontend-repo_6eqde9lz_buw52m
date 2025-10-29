import React, { useMemo, useState } from 'react';
import { Link as LinkIcon, QrCode, Share2, Copy } from 'lucide-react';

export default function ShareCard({ ready, modelId }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = useMemo(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://app.example.com';
    return `${origin}/webar/${modelId}`;
  }, [modelId]);

  const qrSrc = useMemo(() => {
    const data = encodeURIComponent(shareUrl);
    return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${data}`;
  }, [shareUrl]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <section className="mx-auto mt-8 max-w-6xl rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200">
            <QrCode className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-manrope text-xl font-bold text-slate-900">{ready ? 'Prêt à partager' : 'Génération du lien'}</h3>
            <p className="mt-1 text-sm text-slate-700">QR code unique + lien click-to-AR. Ouvre la caméra automatiquement sur mobile compatible.</p>

            <div className="mt-4 flex items-center gap-2 rounded-xl bg-white p-2 ring-1 ring-slate-200">
              <div className="truncate px-2 text-sm text-slate-800">{shareUrl}</div>
              <button onClick={copy} className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800">
                <Copy className="h-3.5 w-3.5" />
                {copied ? 'Copié' : 'Copier'}
              </button>
              <a href={shareUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500">
                <LinkIcon className="h-3.5 w-3.5" />
                Ouvrir
              </a>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-slate-600">
              <Share2 className="h-3.5 w-3.5" />
              Partage rapide: WhatsApp, Mail, Copier lien
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <img src={qrSrc} alt="QR code" className="h-[220px] w-[220px] rounded-lg bg-white p-2 shadow-sm ring-1 ring-slate-200" />
          <p className="text-xs text-slate-600">Scanne pour ouvrir en AR</p>
        </div>
      </div>
    </section>
  );
}
