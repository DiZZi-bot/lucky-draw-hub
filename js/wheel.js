let names = ["돌려돌려돌림판"];

document.addEventListener("DOMContentLoaded", () => {
  updateNameList();
  drawWheel();
});

function handleKeyPress(event) {
  if (event.key === "Enter") {
    addName();
  }
}

function addName() {
  const nameInput = document.getElementById("name-input");
  const name = nameInput.value.trim();
  if (name) {
    names.push(name);
    updateNameList();
    nameInput.value = "";
    nameInput.focus();
    drawWheel();
  }
}

function removeName(index) {
  names.splice(index, 1);
  updateNameList();
  drawWheel();
}

function updateNameList() {
  const nameList = document.getElementById("name-list");
  nameList.innerHTML = "";
  names.forEach((name, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<input type="text" value="${name}" oninput="editName(${index}, this.value)"> <i class="fas fa-trash delete-button" onclick="removeName(${index})"></i>`;
    nameList.appendChild(listItem);
  });
}

function editName(index, newName) {
  names[index] = newName.trim();
  drawWheel();
}

function drawWheel() {
  const canvas = document.getElementById("wheelcanvas");
  const ctx = canvas.getContext("2d");
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = canvas.width / 2;
  const segmentAngle = (2 * Math.PI) / names.length;
  let startAngle = 0;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  names.forEach((name, index) => {
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + segmentAngle);
    ctx.closePath();
    ctx.fillStyle = `hsl(${index * (360 / names.length)}, 100%, 50%)`;
    ctx.fill();
    ctx.stroke();

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(startAngle + segmentAngle / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "bold 20px Arial";
    ctx.fillText(name, radius - 10, 10);
    ctx.restore();

    startAngle += segmentAngle;
  });
}

function spinWheel() {
  const canvas = document.getElementById("wheelcanvas");
  const ctx = canvas.getContext("2d");
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = canvas.width / 2;
  const spinTimeTotal = Math.random() * 3000 + 4000; // 4 to 7 seconds
  let startAngle = 0;
  let spinTime = 0;
  let spinAngleStart = Math.random() * 10 + 10;

  function rotateWheel() {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
      stopRotateWheel();
      return;
    }
    const spinAngle =
      spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI) / 180;
    drawRotatingWheel(startAngle);
    setTimeout(rotateWheel, 30);
  }

  function drawRotatingWheel(angle) {
    const segmentAngle = (2 * Math.PI) / names.length;
    let currentAngle = angle;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    names.forEach((name, index) => {
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(
        centerX,
        centerY,
        radius,
        currentAngle,
        currentAngle + segmentAngle
      );
      ctx.closePath();
      ctx.fillStyle = `hsl(${index * (360 / names.length)}, 100%, 50%)`;
      ctx.fill();
      ctx.stroke();

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(currentAngle + segmentAngle / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#fff";
      ctx.font = "bold 20px Arial";
      ctx.fillText(name, radius - 10, 10);
      ctx.restore();

      currentAngle += segmentAngle;
    });
  }

  function stopRotateWheel() {
    const segmentAngle = (2 * Math.PI) / names.length;
    const winningSegment = Math.floor(
      (startAngle % (2 * Math.PI)) / segmentAngle
    );
    alert(
      "Congratulations! You won " + names[names.length - 1 - winningSegment]
    );
  }

  function easeOut(t, b, c, d) {
    t /= d;
    t--;
    return c * (t * t * t + 1) + b;
  }

  rotateWheel();
}

function resetWheel() {
  names = [];
  updateNameList();
  drawWheel();
}
