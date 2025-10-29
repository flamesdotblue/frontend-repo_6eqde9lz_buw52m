import { Rocket, Camera } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroAR({ onStart }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-gradient-to-tr from-violet-600/40 to-fuchsia-500/40 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-cyan-500/40 to-emerald-400/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 py-20 text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur">
          <Rocket className="h-4 w-4 text-amber-300" />
          Capture 360° → Clone AR taille réelle
        </div>

        <h1 className="mt-6 font-semibold tracking-tight text-white" style={{fontSize:'clamp(2rem,5vw,3.5rem)'}}>
          Scannez un produit en 360° et partagez-le en AR
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          Démarrez la capture multi-angle, nous simulons le pipeline de photogrammétrie et générons un lien WebAR + QR code à partager.
        </p>

        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            onClick={onStart}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-slate-900 shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            <Camera className="h-5 w-5" />
            Démarrer une capture
          </button>
          <a
            href="#guide"
            className="rounded-xl border border-white/20 px-5 py-3 text-white/80 transition hover:bg-white/10"
          >
            Voir comment ça marche
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-12 grid max-w-3xl grid-cols-3 gap-3 text-left text-white/80"
        >
          {[
            "Tournez autour du produit",
            "Capture automatique à intervalles",
            "Traitement en 6 étapes",
          ].map((t) => (
            <div key={t} className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="text-sm">{t}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
