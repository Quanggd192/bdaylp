import { useState } from "react";
import { photos } from "../data/photos.js";
import Lightbox from "./Lightbox.jsx";

export default function Album() {
  const [index, setIndex] = useState(null);
  const step = `${360 / photos.length}deg`;

  return (
    <section className="album-section">
      <h2 className="section-title">
        <span aria-hidden="true">♥</span> Album
      </h2>
      <svg className="heart-clip-svg" aria-hidden="true">
        <clipPath id="albumHeart" clipPathUnits="objectBoundingBox">
          <path d="M0.5,0.16 C0.5,0.16,0.36,0.02,0.2,0.08 C0.02,0.16,-0.02,0.4,0.16,0.6 L0.5,0.96 L0.84,0.6 C1.02,0.4,0.98,0.16,0.8,0.08 C0.64,0.02,0.5,0.16,0.5,0.16 Z" />
        </clipPath>
      </svg>
      <div className={`orbit-scene${index !== null ? " is-paused" : ""}`}>
        <div className="orbit-core" aria-hidden="true">
          ♥
        </div>
        <div className="orbit-ring">
          {photos.map((photo, i) => (
            <button
              key={`${photo.src}-${i}`}
              type="button"
              className="orbit-item"
              style={{ "--i": i, "--step": step }}
              onClick={() => setIndex(i)}
              aria-label={photo.caption}
            >
              <span className="heart-frame">
                <img src={photo.src} alt="" />
              </span>
            </button>
          ))}
        </div>
      </div>
      <p className="hint">Chạm trái tim để xem lớn · đưa chuột vào để tạm dừng</p>
      {index !== null && (
        <Lightbox
          photos={photos}
          index={index}
          onClose={() => setIndex(null)}
          onPrev={() => setIndex((i) => (i + photos.length - 1) % photos.length)}
          onNext={() => setIndex((i) => (i + 1) % photos.length)}
        />
      )}
    </section>
  );
}
