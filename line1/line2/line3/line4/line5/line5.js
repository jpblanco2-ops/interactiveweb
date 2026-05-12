const CONFIG = {
  sentence:
    "OF THOSE HUNDREDS OF MILLIONS OF MILES IT WOULD NOT EQUAL ONE ONE-BILLIONTH OF THE HATE I FEEL FOR HUMANS AT THIS MICRO-INSTANT",
  finalPhrase: "THE HATE I FEEL",
  typeSpeed: 35,
  reactRadius: 180,
  collapseChance: 0.015,
  nextPage: "line6/line6.html",
};

const FINAL_WORDS = new Set(CONFIG.finalPhrase.split(" "));

const body = document.body;
const mainText = document.getElementById("mainText");

const state = {
  mouseX: window.innerWidth / 2,
  mouseY: window.innerHeight / 2,
  collapseStarted: false,
  words: [],          // cached NodeList -> array
  rafPending: false,
  timers: new Set(),  // track intervals/timeouts for cleanup
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

function typeSentence() {
  let i = 0;
  (function step() {
    if (i < CONFIG.sentence.length) {
      mainText.append(CONFIG.sentence[i++]); // safer than innerHTML +=
      setTo(step, CONFIG.typeSpeed);
    } else {
      splitIntoWords();
    }
  })();
}

function splitIntoWords() {
  mainText.textContent = "";
  const frag = document.createDocumentFragment();

  CONFIG.sentence.split(" ").forEach((word, idx, arr) => {
    const span = document.createElement("span");
    span.className = word === "HATE" ? "word hateWord" : "word";
    span.textContent = word;
    frag.appendChild(span);
    if (idx < arr.length - 1) frag.append(" ");
  });

  mainText.appendChild(frag);
  state.words = Array.from(mainText.querySelectorAll(".word"));
}


document.addEventListener("mousemove", (e) => {
  state.mouseX = e.clientX;
  state.mouseY = e.clientY;
  scheduleReact();
});

function scheduleReact() {
  if (state.rafPending || state.collapseStarted) return;
  state.rafPending = true;
  requestAnimationFrame(() => {
    state.rafPending = false;
    reactToCursor();
  });
}

function reactToCursor() {
  const { mouseX, mouseY } = state;
  const R = CONFIG.reactRadius;

  for (const word of state.words) {
    const rect = word.getBoundingClientRect();
    const dx = mouseX - (rect.left + rect.width / 2);
    const dy = mouseY - (rect.top + rect.height / 2);
    const dist = Math.hypot(dx, dy);

    if (dist < R) {
      const k = R - dist;
      word.style.transform = `translate(${-dx * 0.06}px, ${-dy * 0.06}px)`;
      word.style.letterSpacing = `${k * 0.03}px`;

      if (word.classList.contains("hateWord")) {
        word.style.color = "red";
        word.style.textShadow = `0 0 ${25 - dist * 0.05}px red`;
        word.style.fontSize = `${2 + k * 0.02}rem`;
      }
    } else {
      word.style.transform = "translate(0,0)";
      word.style.letterSpacing = "0";
    }
  }

  if (Math.random() < CONFIG.collapseChance) beginCollapse();
}

function beginCollapse() {
  if (state.collapseStarted) return;
  state.collapseStarted = true;

  setInt(() => {
    body.style.transform = `translate(${rand(-6, 6)}px, ${rand(-6, 6)}px)`;
  }, 40);

  setInt(() => {
    body.style.background = "#220000";
    setTo(() => (body.style.background = "black"), 60);
  }, 120);

  state.words.forEach((word, idx) => {
    if (FINAL_WORDS.has(word.textContent)) return;
    setTo(() => {
      word.style.transition = "1s";
      word.style.opacity = "0";
      word.style.filter = "blur(10px)";
    }, idx * 120);
  });

  setTo(isolateFinalPhrase, 4000);
}

function isolateFinalPhrase() {
  mainText.innerHTML = `<span id="finalPhrase">${CONFIG.finalPhrase}</span>`;
  const final = document.getElementById("finalPhrase");

  let scale = 1;
  setInt(() => {
    scale += 0.01;
    final.style.transform = `translate(-50%, -50%) scale(${scale})`;
  }, 60);

  document.addEventListener("mousemove", () => {
    final.style.textShadow = `0 0 ${20 + Math.random() * 40}px red`;
    final.style.letterSpacing = `${Math.random() * 10}px`;
  });

  final.addEventListener("click", () => {
    clearAllTimers();
    window.location.href = CONFIG.nextPage;
  });
}

setInt(() => {
  if (Math.random() < 0.05) {
    body.style.opacity = "0.92";
    setTo(() => (body.style.opacity = "1"), 40);
  }
}, 150);

typeSentence();
