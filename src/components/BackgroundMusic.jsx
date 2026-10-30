import { useCallback, useEffect, useRef, useState } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const play = useCallback(async () => {
    const el = audioRef.current;
    if (!el) return false;
    el.volume = 0.42;
    try {
      await el.play();
      setPlaying(true);
      return true;
    } catch {
      setPlaying(false);
      return false;
    }
  }, []);

  const toggle = useCallback(async () => {
    const el = audioRef.current;
    if (!el) return;
    if (!el.paused) {
      el.pause();
      setPlaying(false);
      return;
    }
    await play();
  }, [play]);

  useEffect(() => {
    play();

    const unlock = (e) => {
      if (e.target.closest?.(".music-btn")) return;
      play();
    };
    const pauseForPrize = () => {
      audioRef.current?.pause();
      setPlaying(false);
    };
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("lucky-prize-open", pauseForPrize);
    window.addEventListener("lucky-prize-close", play);
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("lucky-prize-open", pauseForPrize);
      window.removeEventListener("lucky-prize-close", play);
    };
  }, [play]);

  return (
    <>
      <audio
        ref={audioRef}
        src={encodeURI(
          "/music/Happy Birthday Remix 2020 - Bản Nhạc Của HeineKen Đang Được Sử Dụng Nhiều Trên TikTok - Hương Ly Music.mp3",
        )}
        loop
        preload="auto"
        playsInline
      />
      <button
        type="button"
        className={`music-btn${playing ? " is-on" : ""}`}
        onClick={toggle}
        aria-label={playing ? "Tắt nhạc" : "Bật nhạc"}
      >
        <span aria-hidden="true">♪</span>
        {playing ? "Đang phát nhạc" : "Bật nhạc nền"}
      </button>
    </>
  );
}
