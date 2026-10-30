import { useEffect } from "react";

export default function Lightbox({ photos, index, onClose, onPrev, onNext }) {
  const photo = photos[index];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  if (!photo) return null;

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <button type="button" className="lightbox-close" onClick={onClose} aria-label="Đóng">
        ×
      </button>
      <button
        type="button"
        className="lightbox-nav prev"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Ảnh trước"
      >
        ‹
      </button>
      <img
        src={photo.src}
        alt={photo.caption}
        onClick={(e) => e.stopPropagation()}
      />
      <button
        type="button"
        className="lightbox-nav next"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Ảnh sau"
      >
        ›
      </button>
      <p className="lightbox-caption">{photo.caption}</p>
    </div>
  );
}
