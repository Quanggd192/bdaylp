const giftFiles = [
  "/Gift/sn-sen-gif.png",
  "/Gift/KHÚC HÁT MỪNG SINH NHẬT - PHAN ĐINH TÙNG ( OFFICIAL VIDEO) - Phan Đinh Tùng.mp3",
  "/Gift/Trình birthday (by Nhạc Vô Tri))) - Zô Tri Music)).mp3",
  "/Gift/Bai-hat-Happy-SnapYT.App.mp4",
];

function typeFromSrc(src) {
  const ext = src.split(".").pop().toLowerCase();
  if (["mp3", "wav", "ogg", "m4a"].includes(ext)) return "audio";
  if (["mp4", "webm", "mov"].includes(ext)) return "video";
  if (ext === "gif" || src.toLowerCase().includes("gif")) return "gif";
  return "image";
}

export const prizes = giftFiles.map((src, i) => {
  const label = `Gift ${i + 1}`;
  return { type: typeFromSrc(src), label, title: label, src };
});

export const prizeColors = ["#ff4d8d", "#1a0d12", "#ff8fb3", "#2a1018", "#c2185b", "#12080c", "#ff6b9d", "#241018"];
