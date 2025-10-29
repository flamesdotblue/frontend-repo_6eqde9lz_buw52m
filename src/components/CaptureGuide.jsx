import { useEffect, useRef, useState } from "react";
import { RefreshCcw, Zap, Camera } from "lucide-react";

export default function CaptureGuide({ stream, onCaptureBurst, images, onReset, highlight }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturing, setCapturing] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (v && stream) {
      v.srcObject = stream;
      v.play().catch(() => {});
    }
  }, [stream]);

  const captureFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const w = video.videoWidth || 1280;
    const h = video.videoHeight || 720;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, w, h);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
    onCaptureBurst((prev) => [...prev, dataUrl]);
  };

  const handleAutoCapture = async () => {
    if (!stream || capturing) return;
    setCapturing(true);
    // Capture 8 images à ~250ms d'intervalle pour simuler un tour 360°
    const shots = 8;
    for (let i = 0; i < shots; i++) {
      captureFrame();
      // petite lueur de feedback
      const v = videoRef.current;
      if (v) {
        v.classList.add("ring-4", "ring-emerald-400/70");
        setTimeout(() => v.classList.remove("ring-4", "ring-emerald-400/70"), 120);
      }
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, 250));
    }
    setCapturing(false);
  };

  return (
    <section id="guide" className="relative">
      <div
        className={`mx-auto max-w-5xl px-6 py-14 transition ${
          highlight ? "animate-pulse ring-2 ring-emerald-400/60 rounded-2xl" : ""
        }`}
      >
        <h2 className="text-2xl font-semibold text-white">Guide de capture 360°</h2>
        <p className="mt-1 text-white/70">Autorisez l'accès à la caméra arrière, tenez-vous à ~1m, tournez autour de l'objet et laissez l'appareil auto-capturer.</p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="aspect-video overflow-hidden rounded-xl bg-black/60">
              {stream ? (
                <video ref={videoRef} playsInline muted className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-white/60">
                  Autorisez la caméra puis appuyez sur Auto-capture
                </div>
              )}
              <canvas ref={canvasRef} className="hidden" />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={handleAutoCapture}
                disabled={!stream || capturing}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-4 py-2 font-medium text-emerald-950 shadow transition enabled:hover:-translate-y-0.5 disabled:opacity-50"
              >
                <Zap className="h-4 w-4" />
                Auto-capture (x8)
              </button>
              <button
                onClick={() => onCaptureBurst([])}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-white/80 hover:bg-white/10"
              >
                <Camera className="h-4 w-4" />
                Réinitialiser images
              </button>
              <button
                onClick={onReset}
                className="ml-auto inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-white/80 hover:bg-white/10"
              >
                <RefreshCcw className="h-4 w-4" />
                Recommencer
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm text-white/70">Aperçu des prises</div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {images.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`capture-${idx}`}
                  className="aspect-square w-full rounded-lg object-cover"
                />
              ))}
              {images.length === 0 && (
                <div className="col-span-4 rounded-lg border border-white/10 p-6 text-center text-white/50">
                  Aucune image capturée pour le moment
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
