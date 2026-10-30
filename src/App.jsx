import { useCallback, useState } from "react";
import Album from "./components/Album.jsx";
import BackgroundMusic from "./components/BackgroundMusic.jsx";
import Countdown from "./components/Countdown.jsx";
import GreetingCard from "./components/GreetingCard.jsx";
import Hearts from "./components/Hearts.jsx";
import LuckyWheel from "./components/LuckyWheel.jsx";
import Reveal from "./components/Reveal.jsx";

export default function App() {
  const [phase, setPhase] = useState("countdown");

  const toReveal = useCallback(() => setPhase("reveal"), []);
  const toMain = useCallback(() => setPhase("main"), []);

  return (
    <div className="app">
      <Hearts />
      <BackgroundMusic />
      {phase === "countdown" && <Countdown onDone={toReveal} />}
      {phase === "reveal" && <Reveal onDone={toMain} />}
      {phase === "main" && (
        <main className="main-stage">
          <header className="hero-header">
            <p>Birthday</p>
            <h1>Lan Phương</h1>
          </header>
          <div className="layout">
            <GreetingCard />
            <Album />
            <LuckyWheel />
          </div>
        </main>
      )}
    </div>
  );
}
