import { useEffect, useState } from "react";
import HeartIcon from "./HeartIcon.jsx";

const BURST = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2;
  return {
    id: i,
    dx: `${Math.cos(angle) * (90 + (i % 3) * 30)}px`,
    dy: `${Math.sin(angle) * (70 + (i % 4) * 28)}px`,
    rot: `${i * 24}deg`,
  };
});

export default function Countdown({ onDone }) {
  const [n, setN] = useState(3);

  useEffect(() => {
    if (n < 1) {
      onDone();
      return undefined;
    }
    const t = setTimeout(() => setN((v) => v - 1), 900);
    return () => clearTimeout(t);
  }, [n, onDone]);

  if (n < 1) return null;

  return (
    <div className="overlay" role="status" aria-live="polite">
      <div className="burst-layer">
        {BURST.map((b) => (
          <HeartIcon
            key={`${n}-${b.id}`}
            className="burst-heart"
            style={{ "--dx": b.dx, "--dy": b.dy, "--rot": b.rot }}
          />
        ))}
      </div>
      <div key={n} className="countdown-number">
        {n}
      </div>
    </div>
  );
}
