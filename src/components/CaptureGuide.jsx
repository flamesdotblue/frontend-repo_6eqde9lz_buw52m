import React from 'react';
import { Sun, Aperture, Compass, Image as ImageIcon } from 'lucide-react';

export default function CaptureGuide({ images, onCaptureBurst, onReset }) {
  return (
    <section id="guide" className="mx-auto mt-12 max-w-6xl rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm">
      <h2 className="font-manrope text-2xl font-bold text-slate-900 md:text-3xl">Guide de capture 360°</h2>
      <p className="mt-2 text-slate-600">
        Place l’objet sur une surface stable et bien éclairée. Tourne autour pour capturer 20 à 48 photos nettes.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <Tip icon={<Sun className="h-5 w-5" />} title="Éclairage">
          Évite les ombres dures. Privilégie la lumière diffuse.
        </Tip>
        <Tip icon={<Aperture className="h-5 w-5" />} title="Netteté">
          Tiens le téléphone fermement. Attends l’autofocus.
        </Tip>
        <Tip icon={<Compass className="h-5 w-5" />} title="Angles">
          Fais un tour complet à hauteur d’objet + un cercle plus haut.
        </Tip>
        <Tip icon={<ImageIcon className="h-5 w-5" />} title="Diversité">
          Évite les photos redondantes. Varie les angles de 10–20°.
        </Tip>
      </div>

      <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-xl bg-slate-50 p-4 md:flex-row md:items-center">
        <div>
          <p className="font-medium text-slate-900">Images capturées</p>
          <p className="text-sm text-slate-600">{images} / 24 recommandées (min. 20)</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onReset}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Réinitialiser
          </button>
          <button
            onClick={onCaptureBurst}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Auto-capture (x4)
          </button>
        </div>
      </div>
    </section>
  );
}

function Tip({ icon, title, children }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-2 text-slate-800">
        {icon}
        <p className="font-semibold">{title}</p>
      </div>
      <p className="mt-2 text-sm text-slate-600">{children}</p>
    </div>
  );
}
