import { useMemo, useState } from "react";
import { prizeColors, prizes } from "../data/prizes.js";
import PrizeModal from "./PrizeModal.jsx";

const SIZE = 420;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = 188;

function polar(deg, radius = R) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [CX + radius * Math.cos(rad), CY + radius * Math.sin(rad)];
}

function slicePath(i, slice) {
  const start = i * slice;
  const end = (i + 1) * slice;
  const [x1, y1] = polar(start);
  const [x2, y2] = polar(end);
  const large = slice > 180 ? 1 : 0;
  return `M ${CX} ${CY} L ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} Z`;
}

export default function LuckyWheel() {
  const slice = 360 / prizes.length;
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winIndex, setWinIndex] = useState(null);
  const [prize, setPrize] = useState(null);

  const paths = useMemo(
    () => prizes.map((_, i) => slicePath(i, slice)),
    [slice],
  );

  const spin = () => {
    if (spinning) return;
    const index = Math.floor(Math.random() * prizes.length);
    const center = index * slice + slice / 2;
    const extra = 5 + Math.floor(Math.random() * 4);
    const normalized = ((rotation % 360) + 360) % 360;
    let delta = ((360 - center - normalized) % 360 + 360) % 360;
    if (delta < 8) delta += 360;
    setSpinning(true);
    setWinIndex(index);
    setRotation(rotation + extra * 360 + delta);
  };

  return (
    <section className="wheel-section">
      <h2 className="section-title">
        <span aria-hidden="true">♥</span> Vòng quay may mắn
      </h2>
      <p className="hint wheel-intro">Quay để nhận quà.</p>
      <div className="wheel-stage">
        <div className="wheel-pointer" aria-hidden="true" />
        <div
          className={`wheel-disc${spinning ? " is-spinning" : ""}`}
          style={{ transform: `rotate(${rotation}deg)` }}
          onTransitionEnd={(e) => {
            if (e.propertyName !== "transform" || !spinning) return;
            setSpinning(false);
            setPrize(prizes[winIndex]);
          }}
        >
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label="Vòng quay phần thưởng">
            {paths.map((d, i) => (
              <path key={prizes[i].title + i} d={d} fill={prizeColors[i % prizeColors.length]} />
            ))}
            <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(255,214,231,0.45)" strokeWidth="6" />
            {prizes.map((item, i) => {
              const mid = i * slice + slice / 2;
              const [x, y] = polar(mid, 118);
              return (
                <text
                  key={item.label + i}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${mid} ${x} ${y})`}
                  fill="#fff4f8"
                  fontSize="16"
                  fontFamily="Outfit, sans-serif"
                  fontWeight="600"
                >
                  {item.label}
                </text>
              );
            })}
          </svg>
        </div>
        <button type="button" className="wheel-spin" onClick={spin} disabled={spinning}>
          {spinning ? "..." : "Quay"}
        </button>
      </div>
      {prize && <PrizeModal prize={prize} onClose={() => setPrize(null)} />}
    </section>
  );
}
