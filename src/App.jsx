import React, { useEffect, useMemo, useState } from 'react';
import HeroAR from './components/HeroAR';
import CaptureGuide from './components/CaptureGuide';
import ScanProgress from './components/ScanProgress';
import ShareCard from './components/ShareCard';

export default function App() {
  const [started, setStarted] = useState(false);
  const [highlightGuide, setHighlightGuide] = useState(false);
  const [images, setImages] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  const modelId = useMemo(() => (ready ? 'xyz123' : 'pending'), [ready]);

  useEffect(() => {
    if (!started) return;
    const el = document.getElementById('guide');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setHighlightGuide(true);
      const t = setTimeout(() => setHighlightGuide(false), 1400);
      return () => clearTimeout(t);
    }
  }, [started]);

  const captureBurst = () => {
    setImages((prev) => Math.min(prev + 4, 48));
  };

  const resetCapture = () => {
    setImages(0);
    setProgress(0);
    setProcessing(false);
    setReady(false);
  };

  const simulateUploadAndProcess = () => {
    setProcessing(true);
    setReady(false);
    setProgress(0);
    const steps = [10, 30, 55, 75, 90, 100];
    let i = 0;
    const timer = setInterval(() => {
      setProgress(steps[i]);
      i += 1;
      if (i >= steps.length) {
        clearInterval(timer);
        setProcessing(false);
        setReady(true);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <HeroAR onStart={() => setStarted(true)} />

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CaptureGuide
              images={images}
              onCaptureBurst={captureBurst}
              onReset={resetCapture}
              highlight={highlightGuide}
            />
            <ScanProgress
              images={images}
              progress={progress}
              processing={processing}
              onUpload={simulateUploadAndProcess}
            />
            {ready && <ShareCard ready={ready} modelId={modelId} />}
          </div>
          <aside className="space-y-4">
            <Card>
              <h4 className="font-semibold text-slate-900">Spécifications clés</h4>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                <li>Format export: .glb (PBR) compressé DRACO</li>
                <li>Poids cible: ≤ 10 Mo • ≤ 100k poly</li>
                <li>WebAR: Three.js + WebXR</li>
                <li>QR + lien click-to-AR</li>
              </ul>
            </Card>
            <Card>
              <h4 className="font-semibold text-slate-900">Sécurité</h4>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                <li>HTTPS obligatoire</li>
                <li>Scan privé par défaut (token)</li>
                <li>Suppression auto après X jours</li>
              </ul>
            </Card>
          </aside>
        </div>
      </div>

      <footer className="mt-10 border-t bg-white/60 py-6">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-slate-600 md:px-6">
          © {new Date().getFullYear()} • Scan 360° → Clone AR • Démo UI
        </div>
      </footer>
    </div>
  );
}

function Card({ children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {children}
    </div>
  );
}
