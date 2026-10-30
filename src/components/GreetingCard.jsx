import { useState } from "react";

export default function GreetingCard() {
  const [open, setOpen] = useState(false);

  return (
    <section>
      <h2 className="section-title">
        <span aria-hidden="true">♥</span> Thiệp chúc mừng
      </h2>
      <div className="card-scene">
        <div
          className={`greeting-card${open ? " open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setOpen((v) => !v);
            }
          }}
          role="button"
          tabIndex={0}
          aria-pressed={open}
        >
          <div className="card-face card-front">
            <div className="seal" aria-hidden="true">
              ♥
            </div>
            <h2>Happy Birthday</h2>
            <p>Lan Phương</p>
          </div>
          <div className="card-face card-back">
            <h3>Gửi Lan Phương</h3>
            <p>Hôm nay thế giới như dịu hơn một nhịp, vì có thêm một năm em ở đây, rạng rỡ, ấm áp, và rất đáng được yêu.</p>
            <p>Chúc mọi điều em thầm mong đều nở như hoa, chúc tim em luôn được giữ nhẹ, và mỗi bình minh đều có lý do để mỉm cười.</p>
            <p>Sinh nhật vui vẻ. Mãi là ánh hồng giữa đêm đen.</p>
          </div>
        </div>
      </div>
      <p className="hint">{open ? "Chạm lần nữa để đóng thiệp" : "Chạm vào thiệp để mở"}</p>
    </section>
  );
}
