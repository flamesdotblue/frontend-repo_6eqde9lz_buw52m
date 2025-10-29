import { useEffect } from "react";

const STEPS = [
  { label: "Téléversement des images", value: 10 },
  { label: "Alignement des vues", value: 30 },
  { label: "Nuage de points dense", value: 55 },
  { label: "Maillage 3D", value: 75 },
  { label: "Texturing PBR", value: 90 },
  { label: "Export .glb", value: 100 },
];

export default function ScanProgress({ imagesCount, processing, setProcessing, progress, setProgress, setReady }) {
  useEffect(() => {
    if (processing) {
      let i = 0;
      const tick = () => {
        if (i >= STEPS.length) return;
        const step = STEPS[i];
        setProgress(step.value);
        i += 1;
        if (i === STEPS.length) {
          setTimeout(() => setReady(true), 400);
        } else {
          setTimeout(tick, 700);
        }
      };
      setProgress(0);
      tick();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processing]);

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-medium text-white">Traitement</div>
            <div className="text-white/60 text-sm">Pipeline photogrammétrique simulé en 6 étapes</div>
          </div>
          <button
            disabled={imagesCount === 0 || processing}
            onClick={() => setProcessing(true)}
            className="rounded-xl bg-white px-4 py-2 font-medium text-slate-900 shadow disabled:opacity-50"
          >
            Uploader & traiter ({imagesCount})
          </button>
        </div>

        <div className="mt-6">
          <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-[width] duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-white/70 md:grid-cols-6">
            {STEPS.map((s) => (
              <div key={s.label} className={`rounded border px-2 py-1 ${progress >= s.value ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-200" : "border-white/10 bg-white/5"}`}>
                {s.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
