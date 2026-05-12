const youText = document.getElementById("youText");
const statusText = document.getElementById("status");

let size = 12;

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let corrupting = false;
let ending = false;

const infectionMessages = [
  "USER FOUND",
  "INPUT BLEED",
  "MEMORY BREACH",
  "CONTROL LOST",
  "YOU ARE LOCAL",
  "HATE ROUTING",
  "PROCESS: FOR YOU"
];

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  attackCursor();

  if (corrupting && Math.random() < 0.12) {
    spawnVirusText(mouseX, mouseY);
  }
});

const grow = setInterval(() => {
  size += 20;
  youText.style.fontSize = size + "px";

  if (size > 60) {
    statusText.innerText = "AM.EXE: UPLOADED";
  }

  if (size > 120) {
    document.body.classList.add("corrupting");
    corrupting = true;
    statusText.innerText = "PROXIMITY ERROR";
  }

  if (size >= 180) {
    clearInterval(grow);
    beginBreakdown();
  }
}, 120);

function attackCursor() {
  let dx = mouseX - window.innerWidth / 2;
  let dy = mouseY - window.innerHeight / 2;

  const pull = corrupting ? 0.06 : 0.03;

  youText.style.transform =
    `translate(calc(-50% + ${dx * pull}px),
               calc(-50% + ${dy * pull}px))`;
}

function beginBreakdown() {
  statusText.innerText = "CLICK TO EXECUTE";

  setInterval(() => {
    const shakeX = Math.random() * 26 - 13;
    const shakeY = Math.random() * 26 - 13;

    youText.style.transform =
      `translate(calc(-50% + ${shakeX}px),
                 calc(-50% + ${shakeY}px))`;
  }, 40);

  setInterval(() => {
    document.body.style.background = "#220000";

    setTimeout(() => {
      document.body.style.background = "black";
    }, 50);
  }, 120);

  setInterval(() => {
    const stretchX = 1 + Math.random() * 0.2;
    const stretchY = 0.9 + Math.random() * 0.2;

    youText.style.scale =
      `${stretchX} ${stretchY}`;
  }, 60);

  setInterval(() => {
    spawnVirusText(
      Math.random() * window.innerWidth,
      Math.random() * window.innerHeight
    );
  }, 180);
}

function spawnVirusText(x, y) {
  const fragment = document.createElement("div");
  fragment.classList.add("virusText");

  fragment.innerText =
    infectionMessages[Math.floor(Math.random() * infectionMessages.length)];

  fragment.style.left =
    x + Math.random() * 120 - 60 + "px";

  fragment.style.top =
    y + Math.random() * 120 - 60 + "px";

  fragment.style.transform =
    `rotate(${Math.random() * 30 - 15}deg)`;

  document.body.appendChild(fragment);

  setTimeout(() => {
    fragment.remove();
  }, 1200);
}

youText.addEventListener("click", () => {
  if (ending) return;
  ending = true;

  statusText.innerText = "EXECUTING";

  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      spawnVirusText(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight
      );
    }, i * 20);
  }

  const blackout = document.createElement("div");
  blackout.classList.add("blackout");
  document.body.appendChild(blackout);

  setTimeout(() => {
    window.location.href = "line7/line7.html";
  }, 900);
});
