function draw() {
  const canvas = document.querySelector("#tutorial");

  // canvas 지원여부 판별
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    // img
    const img = new Image();
    img.src = "./img/test1.png";

    // ctx.fillStyle = "rgb(200,0,0)";  // 채우기스타일
    // ctx.fillRect(10, 10, 50, 50);  // 면사각형(왼위, 왼아래, 오른위, 오른아래)
    // ctx.strokeStyle = "rgb(200,0,0)"; // 선스타일
    // ctx.strokeRect(10, 10, 50, 50); // 외곽선사각형(왼위, 왼아래, 오른위, 오른아래)

    // 삼각형
    ctx.beginPath();
    ctx.moveTo(75, 50); // 펜 위치를 x,y 축으로 이동
    ctx.lineTo(100, 75); // 여기 점찍고
    ctx.lineTo(100, 25); // 여기 점찍고
    // ctx.lineTo(75, 50); // 여기 점찍고
    // ctx.fill(); // 이어서 채워줘
    ctx.strokeStyle = "rgb(200,0,0)"; // 선스타일
    ctx.lineWidth = 5; // 선 굵기(px단위)
    ctx.lineCap = "round"; // butt / round / square // 선 끝 모양
    ctx.lineJoin = "miter"; // round / bevel / miter  // 선 결합 모양
    ctx.stroke();

    // 스마일
    // ctx.beginPath();
    // ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
    // ctx.moveTo(110, 75); // 다음 원이 그려질 시작점으로 가야됨 (원은 왼 -> 외)
    // ctx.arc(75, 75, 35, 0, Math.PI, false); // Mouth (clockwise)
    // ctx.moveTo(65, 65);
    // ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye
    // ctx.moveTo(95, 65);
    // ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye
    // ctx.stroke();

    // font
    ctx.font = "48px serif";
    //ctx.fillText("안녕", 10, 50); // x좌표, y좌표(bottom 값)
    ctx.strokeStyle = "rgb(0,0,0)"; // 선스타일
    ctx.lineWidth = 1; // 선 굵기(px단위)
    ctx.strokeText("안녕", 10, 50);

    // img
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 100, 150); // drawImage(img, x, y, w, h)
      // 슬라이싱도 가넝
      ctx.drawImage(img, 0, 0, 150, 100);
      // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    };
  }
}

window.addEventListener("load", draw);
