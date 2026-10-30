const files = ["/photos/anh1.png", "/photos/anh2.png", "/photos/anh3.png", "/photos/anh4.png", "/photos/anh5.png"];
const captions = [
  "Nụ cười ấy",
  "Ngày dịu dàng",
  "Ánh mắt",
  "Khoảnh khắc",
  "Hồng và đêm",
  "Một nhịp tim",
  "Tia nắng",
  "Bên em",
  "Mộng mơ",
  "Lan Phương",
];

export const photos = captions.map((caption, i) => ({
  src: files[i % files.length],
  caption,
}));
