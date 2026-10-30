import { useEffect } from "react";

export default function PrizeModal({ prize, onClose }) {
  const pauseBgm = prize.type === "gif" || prize.type === "audio" || prize.type === "video";

  useEffect(() => {
    if (pauseBgm) window.dispatchEvent(new Event("lucky-prize-open"));
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (pauseBgm) window.dispatchEvent(new Event("lucky-prize-close"));
    };
  }, [pauseBgm, onClose]);

  return (
    <div className="prize-modal" onClick={onClose} role="dialog" aria-modal="true">
      <div className="prize-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="lightbox-close" onClick={onClose} aria-label="Đóng">
          ×
        </button>
        <p className="prize-kicker">Phần thưởng</p>
        <h3>{prize.title}</h3>
        {prize.type === "audio" ? (
          <audio src={encodeURI(prize.src)} controls autoPlay />
        ) : prize.type === "video" ? (
          <video src={encodeURI(prize.src)} controls autoPlay playsInline />
        ) : (
          <img src={encodeURI(prize.src)} alt={prize.title} />
        )}
        <button type="button" className="gift-btn prize-ok" onClick={onClose}>
          Nhận quà ♥
        </button>
      </div>
    </div>
  );
}
