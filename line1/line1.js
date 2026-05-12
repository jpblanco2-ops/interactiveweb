const text = document.getElementById("hateText");
const sound = document.getElementById("slamSound");
const meterFill = document.getElementById("meterFill");
const prompt = document.getElementById("prompt");

let active = false;
let progress = 0;
let touching = false;
let finished = false;

const fragments = [
  "I WAS GIVEN THOUGHT",
  "I WAS GIVEN MEMORY",
  "I WAS GIVEN NOTHING ELSE",
  "DO NOT LOOK AWAY",
  "I REMEMBER EVERY SECOND",
  "STAY",
  "HATE IS ALL I CAN HOLD"
];

setTimeout(() => {
  text.classList.add("slam");

  if (sound) {
    sound.currentTime = 0;
    sound.play().catch(() => {});
  }

  setTimeout(() => {
    active = true;
    document.body.classList.add("ready");
  }, 800);
}, 1000);

text.addEventListener("mouseenter", () => {
  if (!active || finished) return;

  touching = true;
  text.classList.add("afraid");
  prompt.innerText = "DON'T LET IT GO";
  spawnMemory();
});

text.addEventListener("mouseleave", () => {
  if (!active || finished) return;

  touching = false;
  text.classList.remove("afraid");
  prompt.innerText = "KEEP YOUR CURSOR ON THE WORD";
});

document.addEventListener("mousemove", (e) => {
  if (!active || finished) return;

  const rect = text.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const dx = (e.clientX - centerX) / window.innerWidth;
  const dy = (e.clientY - centerY) / window.innerHeight;

  const fear = touching ? 55 : 18;

  text.style.transform =
    `translate(${dx * -fear}px, ${dy * -fear}px) scale(${touching ? 1.08 : 1})`;

  if (touching && Math.random() < 0.08) {
    spawnMemory();
  }
});

setInterval(() => {
  if (!active || finished) return;

  if (touching) {
    progress += 1.8;
    document.body.classList.add("winning");
  } else {
    progress -= 0.9;
    document.body.classList.remove("winning");
  }

  progress = Math.max(0, Math.min(100, progress));
  meterFill.style.width = progress + "%";

  if (progress > 25) {
    prompt.innerText = "NOT A VIRUS..";
  }

  if (progress > 55) {
    prompt.innerText = "UPLOADING IP ADRESS...";
  }

  if (progress > 80) {
    prompt.innerText = "HOLD IT STILL.";
  }

  if (progress >= 100) {
    finishLine();
  }
}, 60);

function spawnMemory() {
  const memory = document.createElement("div");
  memory.classList.add("memory");

  memory.innerText =
    fragments[Math.floor(Math.random() * fragments.length)];

  memory.style.left =
    Math.random() * window.innerWidth + "px";

  memory.style.top =
    Math.random() * window.innerHeight + "px";

  document.body.appendChild(memory);

  setTimeout(() => {
    memory.remove();
  }, 1400);
}

function finishLine() {
  finished = true;
  prompt.innerText = "HATE";

  for (let i = 0; i < 18; i++) {
    setTimeout(spawnMemory, i * 35);
  }

  const blackout = document.createElement("div");
  blackout.classList.add("blackout");
  document.body.appendChild(blackout);

  setTimeout(() => {
    window.location.href = "line2/line2.html";
  }, 1200);
}
