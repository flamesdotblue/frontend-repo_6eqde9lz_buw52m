import React from 'react';
import { Cpu, CloudUpload } from 'lucide-react';

export default function ScanProgress({ images, progress, processing, onUpload }) {
  const canUpload = images >= 20 && !processing;

  return (
    <section className="mx-auto mt-8 max-w-6xl rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-manrope text-xl font-bold text-slate-900">Préparation & traitement</h3>
          <p className="text-sm text-slate-600">Photogrammétrie • Reconstruction mesh • Texturage • GLB optimisé</p>
        </div>
        <button
          disabled={!canUpload}
          onClick={onUpload}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white transition ${canUpload ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-slate-300 cursor-not-allowed'}`}
        >
          <CloudUpload className="h-4 w-4" />
          {processing ? 'En cours…' : 'Uploader & traiter'}
        </button>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center gap-2 text-slate-700">
          <Cpu className="h-4 w-4" />
          <span className="text-sm">Progression pipeline</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 text-right text-xs text-slate-500">{progress}%</div>
      </div>

      <ul className="mt-4 grid grid-cols-1 gap-2 text-sm text-slate-700 md:grid-cols-3">
        <li>• Alignement photos</li>
        <li>• Densification nuage</li>
        <li>• Mesh + UV</li>
        <li>• Réduction polycount</li>
        <li>• Texture bake</li>
        <li>• GLB/DRACO</li>
      </ul>
    </section>
  );
}
