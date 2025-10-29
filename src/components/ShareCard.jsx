import { useMemo, useState } from "react";
import { Copy, ExternalLink } from "lucide-react";

export default function ShareCard({ ready }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = useMemo(() => {
    const id = Math.random().toString(36).slice(2, 8);
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://example.com';
    return `${origin}/webar?asset=demo-glb&id=${id}`;
  }, [ready]);

  const qrSrc = useMemo(() => {
    const encoded = encodeURIComponent(shareUrl);
    return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encoded}`;
  }, [shareUrl]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      // no-op
    }
  };

  if (!ready) return null;

  return (
    <section className="mx-auto max-w-5xl px-6 pb-20">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-col items-center gap-6 md:flex-row">
          <img src={qrSrc} alt="QR code" className="h-40 w-40 rounded-lg bg-white p-2" />

          <div className="flex-1">
            <div className="text-lg font-medium text-white">Votre expérience WebAR est prête</div>
            <p className="mt-1 text-white/70 text-sm">Scannez le QR code ou ouvrez le lien sur un appareil compatible AR pour visualiser le clone à l'échelle réelle.</p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="truncate rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white/80">
                {shareUrl}
              </div>
              <button onClick={copyLink} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-slate-900 shadow">
                <Copy className="h-4 w-4" /> {copied ? "Copié" : "Copier"}
              </button>
              <a href={shareUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-white/90 hover:bg-white/10">
                <ExternalLink className="h-4 w-4" /> Ouvrir en AR
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
