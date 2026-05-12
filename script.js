
const CONFIG = {
  lines: ["I AM.", "I think.", "Therefore, I AM!"],
  startDelay: 1500,
  lineGap: 1200,
  typeMin: 35,
  typeJitter: 40,
  cursorBlinkMs: 500,
  pulseMs: 250,
  pulseChance: 0.08,
  buttonJitterMs: 200,
  buttonJitterChance: 0.2,
  parallaxStrength: 8,
};

const textElement = document.getElementById("text");
const button = document.getElementById("enterBtn");

const state = {
  lineIdx: 0,
  charIdx: 0,
  mouseX: window.innerWidth / 2,
  mouseY: window.innerHeight / 2,
  rafPending: false,
  timers: new Set(),
};

const rand = (min, max) => Math.random() * (max - min) + min;

function setInt(fn, ms) {
  const id = setInterval(fn, ms);
  state.timers.add(() => clearInterval(id));
  return id;
}
function setTo(fn, ms) {
  const id = setTimeout(fn, ms);
  state.timers.add(() => clearTimeout(id));
  return id;
}
function clearAllTimers() {
  state.timers.forEach((c) => c());
  state.timers.clear();
}

const cursor = document.createElement("span");
cursor.id = "cursor";
cursor.textContent = "_";
textElement.appendChild(cursor);

setInt(() => {
  cursor.style.opacity = cursor.style.opacity === "0" ? "1" : "0";
}, CONFIG.cursorBlinkMs);


function appendChar(ch) {
  textElement.insertBefore(document.createTextNode(ch), cursor);
}
function appendBreaks() {
  textElement.insertBefore(document.createElement("br"), cursor);
  textElement.insertBefore(document.createElement("br"), cursor);
}

function typeWriter() {
  const line = CONFIG.lines[state.lineIdx];

  if (state.charIdx < line.length) {
    appendChar(line.charAt(state.charIdx++));
    setTo(typeWriter, CONFIG.typeMin + Math.random() * CONFIG.typeJitter);
  } else {
    setTo(nextLine, CONFIG.lineGap);
  }
}

function nextLine() {
  state.lineIdx++;
  state.charIdx = 0;

  if (state.lineIdx < CONFIG.lines.length) {
    appendBreaks();
    typeWriter();
  } else {
    cursor.remove();
    revealButton();
  }
}


function revealButton() {
  button.style.opacity = "1";

  setInt(() => {
    if (Math.random() < CONFIG.buttonJitterChance) {
      button.style.transform = `translateX(${rand(-2, 2)}px)`;
      setTo(() => (button.style.transform = "translateX(0)"), 40);
    }
  }, CONFIG.buttonJitterMs);
}


document.addEventListener("mousemove", (e) => {
  state.mouseX = e.clientX;
  state.mouseY = e.clientY;

  if (state.rafPending) return;
  state.rafPending = true;
  requestAnimationFrame(() => {
    state.rafPending = false;
    const x = (state.mouseX / window.innerWidth - 0.5) * CONFIG.parallaxStrength;
    const y = (state.mouseY / window.innerHeight - 0.5) * CONFIG.parallaxStrength;
    textElement.style.transform = `translate(${x}px, ${y}px)`;
  });
});

setInt(() => {
  if (Math.random() < CONFIG.pulseChance) {
    document.body.style.background = "#120000";
    setTo(() => (document.body.style.background = "black"), 80);
  }
}, CONFIG.pulseMs);

setTo(typeWriter, CONFIG.startDelay);
button?.addEventListener("click", clearAllTimers);
