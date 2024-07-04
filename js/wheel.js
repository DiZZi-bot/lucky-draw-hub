function spinWheel() {
  const canvas = document.getElementById("wheelcanvas");
  const ctx = canvas.getContext("2d");
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = canvas.width / 2;
  const segments = ["Prize 1", "Prize 2", "Prize 3", "Prize 4"];
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A8"];
  const spinTimeTotal = Math.random() * 3000 + 4000; // 4 to 7 seconds
  let startAngle = 0;
  let spinTime = 0;
  let spinAngleStart = Math.random() * 10 + 10;

  function drawSegment() {
    const segmentAngle = (2 * Math.PI) / segments.length;
    for (let i = 0; i < segments.length; i++) {
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + segmentAngle);
      ctx.closePath();
      ctx.fillStyle = colors[i];
      ctx.fill();
      ctx.stroke();

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + segmentAngle / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#fff";
      ctx.font = "bold 20px Arial";
      ctx.fillText(segments[i], radius - 10, 10);
      ctx.restore();

      startAngle += segmentAngle;
    }
  }

  function rotateWheel() {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
      stopRotateWheel();
      return;
    }
    const spinAngle =
      spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI) / 180;
    drawSegment();
    setTimeout(rotateWheel, 30);
  }

  function stopRotateWheel() {
    const segmentAngle = (2 * Math.PI) / segments.length;
    const winningSegment = Math.floor(
      (startAngle % (2 * Math.PI)) / segmentAngle
    );
    alert(
      "Congratulations! You won " +
        segments[segments.length - 1 - winningSegment]
    );
  }

  function easeOut(t, b, c, d) {
    t /= d;
    t--;
    return c * (t * t * t + 1) + b;
  }

  drawSegment();
  rotateWheel();
}
