const sun = new Image();
const moon = new Image();
const earth = new Image();

function init() {
  sun.src = "./img/sun.png";
  moon.src = "./img/moon.png";
  earth.src = "./img/earth.jpg";

  // requestAnimationFrame
  // 화면에 애니메이션을 업데이트할 준비가 될 때마다 이 메서드를 호출해야 합니다.
  // 이는 브라우저가 다음 리페인트를 수행하기 전에 애니메이션 함수를 호출하도록 요청합니다. 콜백의 수는 보통 1초에 60회지만, 일반적으로 대부분의 웹 브라우저에서는 W3C 권장사항에 따라 디스플레이 주사율과 일치됩니다.
  window.requestAnimationFrame(draw);
}

function draw() {
  const ctx = document.getElementById("canvas").getContext("2d");

  // 합성 유형 - destination-over (생성순으로 z-index 배치)
  ctx.globalCompositeOperation = "destination-over";
  ctx.clearRect(0, 0, 300, 300); // clear canvas

  ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
  ctx.strokeStyle = "rgba(0, 153, 255, 0.4)";
  ctx.save();

  // moveTo : lineTo
  // translate :  rotate (종이를 밀어놓고 시작하는거임)
  // [[[ translate 1 ]]] 150 / 150 (중앙) 으로 이동
  ctx.translate(150, 150);

  // earth
  const time = new Date();
  // 60초 진행, 1초당 60번씩 회전
  // ctx.rotate((45 * Math.PI) / 180)
  ctx.rotate(
    ((2 * Math.PI) / 60) * time.getSeconds() +
      ((2 * Math.PI) / 60000) * time.getMilliseconds()
  );
  // [[[ translate 2 ]]] 중앙에서 105 떨어진 곳으로 이동
  ctx.translate(105, 0);
  ctx.fillRect(0, -12, 40, 24); // shadow
  ctx.drawImage(earth, -12, -12, 20, 20); // drawImage(image, dx, dy, w, h)

  // moon
  ctx.save();
  // 6초 진행, 1초당 60번씩 회전
  ctx.rotate(
    ((2 * Math.PI) / 6) * time.getSeconds() +
      ((2 * Math.PI) / 6000) * time.getMilliseconds()
  );
  // [[[ translate 3 ]]] earth 에서 28.5 떨어진 지점으로 이동
  ctx.translate(0, 28.5);
  ctx.drawImage(moon, -3.5, -3.5, 10, 10); // drawImage(image, dx, dy, w, h)

  // 처음까지  restore 하는 이유 : translate 넘 많이함. 프레임이 중첩되면 산으로 갈  translate
  // rotate 애니메이션 중첩될수도 : requestAnimationFrame 함수 자체가 재귀함수라 중첩의 중첩의 중첩의 중첩되면 산으로 감
  ctx.restore(); // 시점 2 -> 시점 1
  ctx.restore(); // 시점 1 -> 처음

  ctx.beginPath();
  // arc(x, y, radius, startAngle, endAngle, counterclockwise)
  // 시작점: x 150, y 150, 반지름 : 105, 각도: 0 ~ 360 (반시계방향),
  ctx.arc(150, 150, 105, 0, (360 * Math.PI) / 180, false); // 지구 궤도
  ctx.stroke();

  // ctx.drawImage(sun, 125, 125, 50, 50); // drawImage(image, dx, dy, w, h)
  ctx.drawImage(sun, 125, 125, 50, 50);

  window.requestAnimationFrame(draw);
}

// requestAnimationFrame(callback);
// callback 안에는 requestAnimationFrame(callback)

//   window.requestAnimationFrame(()=>{
//     window.requestAnimationFrame(()=>{
//       window.requestAnimationFrame(()=>{
//         ...
//       })
//     })
//   }, (1초 / 60));

// setInterval(()=>{
//   dosomething()
// }, 100)

init();
