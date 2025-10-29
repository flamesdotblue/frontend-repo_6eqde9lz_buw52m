import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket, Camera, QrCode } from 'lucide-react';

export default function HeroAR({ onStart }) {
  return (
    <section className="relative isolate w-full min-h-[70vh] overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white shadow-xl">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/1r3oQNo4l7RkQm9N/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs backdrop-blur">
          <Rocket className="h-3.5 w-3.5" />
          <span>MVP WebAR • Scan → Clone → Partage</span>
        </div>
        <h1 className="mt-6 font-manrope text-4xl font-extrabold leading-tight md:text-6xl">
          Scanne ton produit. Obtiens son clone en AR.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/80 md:text-lg">
          Capture 360°, reconstruction 3D optimisée, lien WebAR et QR code prêts à partager. Un clic, la caméra s’ouvre.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onStart}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-medium text-slate-900 shadow ring-emerald-400 transition hover:bg-emerald-400 focus:outline-none focus:ring"
          >
            <Camera className="h-5 w-5" />
            Démarrer un scan
          </button>
          <a
            href="#guide"
            className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 font-medium text-white ring-1 ring-white/20 transition hover:bg-white/15"
          >
            <QrCode className="h-5 w-5" />
            Voir comment ça marche
          </a>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-800/90 to-transparent" />
    </section>
  );
}
