function clock() {
  const now = new Date();
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  ctx.save();
  ctx.clearRect(0, 0, 150, 150);
  ctx.translate(75, 75);
  // 안티엘리어싱을 위해 완전 크게 제작 후 scale 조정 (현재 50% 수준으로 줄임)
  ctx.scale(0.5, 0.5);
  ctx.rotate(-Math.PI / 2);
  ctx.strokeStyle = "black";
  ctx.fillStyle = "white";
  ctx.lineWidth = 8;
  ctx.lineCap = "round";

  ctx.stroke();

  // 시 .. 표시
  ctx.save();
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6);
    ctx.moveTo(100, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
  }
  ctx.restore();

  // 분 .. 표시
  ctx.save();
  ctx.lineWidth = 4;
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      ctx.beginPath();
      ctx.lineTo(120, 0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 30);
  }
  ctx.restore();

  const sec = now.getSeconds();
  // To display a clock with a sweeping second hand, use:
  // const sec = now.getSeconds() + now.getMilliseconds() / 1000;
  const min = now.getMinutes();
  const hour = now.getHours();

  ctx.fillStyle = "black";
  canvas.innerText = `The Time is ${hour} : ${min}`;

  // 시침
  ctx.save();
  ctx.rotate(
    (Math.PI / 6) * hour +
      (Math.PI / (6 * 60)) * min +
      (Math.PI / (6 * 60 * 10)) * sec
  );
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();
  ctx.restore();

  // 분침
  ctx.save();
  ctx.rotate((Math.PI / 30) * min + (Math.PI / (30 * 60)) * sec);
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(112, 0);
  ctx.stroke();
  ctx.restore();

  // 초침
  ctx.save();
  ctx.rotate((sec * Math.PI) / 30);
  ctx.strokeStyle = "#D40000";
  ctx.fillStyle = "blue";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-30, 0);
  ctx.lineTo(83, 0);
  ctx.stroke();

  // 바늘 고정 핀
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
  ctx.fill();

  // 초침 끝 circle - 외곽선
  ctx.strokeStyle = "gray";
  ctx.beginPath();
  ctx.arc(95, 0, 10, 0, Math.PI * 2, true);
  ctx.stroke();

  // 초침 끝 circle - fill
  ctx.fillStyle = "red";
  ctx.arc(0, 0, 3, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore();

  // 시계 바깥 테두리
  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.strokeStyle = "#325FA2";
  ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
  ctx.stroke();

  ctx.restore();

  window.requestAnimationFrame(clock);
}

window.requestAnimationFrame(clock);
// window.addEventListener("load", clock);
