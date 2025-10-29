import { useEffect, useRef, useState } from "react";
import HeroAR from "./components/HeroAR";
import CaptureGuide from "./components/CaptureGuide";
import ScanProgress from "./components/ScanProgress";
import ShareCard from "./components/ShareCard";

export default function App() {
  const [started, setStarted] = useState(false);
  const [highlightGuide, setHighlightGuide] = useState(false);
  const [stream, setStream] = useState(null);
  const [images, setImages] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  const guideRef = useRef(null);

  useEffect(() => {
    return () => {
      // stop stream on unmount
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [stream]);

  const startScan = async () => {
    try {
      const media = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      setStream(media);
      setStarted(true);
      setTimeout(() => {
        const el = document.getElementById("guide");
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
        setHighlightGuide(true);
        setTimeout(() => setHighlightGuide(false), 1400);
      }, 50);
    } catch (e) {
      alert("Impossible d'accéder à la caméra. Veuillez autoriser l'accès.");
    }
  };

  const resetAll = () => {
    setStarted(false);
    setImages([]);
    setProcessing(false);
    setProgress(0);
    setReady(false);
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <HeroAR onStart={startScan} />

      <div ref={guideRef}>
        <CaptureGuide
          stream={stream}
          onCaptureBurst={setImages}
          images={images}
          onReset={resetAll}
          highlight={highlightGuide}
        />
      </div>

      <ScanProgress
        imagesCount={images.length}
        processing={processing}
        setProcessing={setProcessing}
        progress={progress}
        setProgress={setProgress}
        setReady={setReady}
      />

      <ShareCard ready={ready} />

      <footer className="mx-auto max-w-5xl px-6 pb-16 text-center text-white/40">
        <div>Prototype de flux 360° → WebAR • Capture simulée et traitement factice</div>
      </footer>
    </div>
  );
}
