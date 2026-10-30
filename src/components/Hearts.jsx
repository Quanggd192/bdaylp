import HeartIcon from "./HeartIcon.jsx";

const HEARTS = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x: `${(i * 17 + 7) % 100}%`,
  delay: `${(i * 0.47) % 8}s`,
  dur: `${10 + (i % 7)}s`,
  s: 0.45 + (i % 5) * 0.18,
  o: 0.25 + (i % 4) * 0.12,
  drift: `${(i % 2 === 0 ? -40 : 50) - i * 2}px`,
  size: 14 + (i % 6) * 5,
}));

export default function Hearts() {
  return (
    <div className="hearts-bg" aria-hidden="true">
      {HEARTS.map((h) => (
        <HeartIcon
          key={h.id}
          className="float-heart"
          style={{
            "--x": h.x,
            "--delay": h.delay,
            "--dur": h.dur,
            "--s": h.s,
            "--o": h.o,
            "--drift": h.drift,
            width: h.size,
            height: h.size,
          }}
        />
      ))}
    </div>
  );
}
