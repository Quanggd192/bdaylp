import { useEffect } from "react";
import HeartIcon from "./HeartIcon.jsx";

const NAME = "Lan Phương";

const BURST = Array.from({ length: 20 }, (_, i) => {
  const angle = (i / 20) * Math.PI * 2;
  return {
    id: i,
    dx: `${Math.cos(angle) * (140 + (i % 5) * 40)}px`,
    dy: `${Math.sin(angle) * (110 + (i % 4) * 36)}px`,
    rot: `${i * 18}deg`,
  };
});

export default function Reveal({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 4200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="overlay">
      <div className="burst-layer">
        {BURST.map((b) => (
          <HeartIcon
            key={b.id}
            className="burst-heart"
            style={{
              "--dx": b.dx,
              "--dy": b.dy,
              "--rot": b.rot,
              width: 18 + (b.id % 5) * 4,
              height: 18 + (b.id % 5) * 4,
              animationDuration: "1.4s",
            }}
          />
        ))}
      </div>
      <div className="reveal">
        <p className="reveal-kicker">Today is yours</p>
        <h2 className="reveal-title">Chúc mừng sinh nhật</h2>
        <p className="reveal-name" aria-label={NAME}>
          {NAME.split("").map((ch, i) => (
            <span key={`${ch}-${i}`} style={{ animationDelay: `${0.55 + i * 0.08}s` }}>
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </p>
        <p className="reveal-sub">Một ngày đặc biệt cho một người đặc biệt.</p>
        <button type="button" className="gift-btn" onClick={onDone}>
          Mở quà ♥
        </button>
      </div>
    </div>
  );
}
