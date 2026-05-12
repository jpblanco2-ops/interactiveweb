const body = document.body;
const centerText = document.getElementById("centerText");
const meterFill = document.getElementById("meterFill");
const instruction = document.getElementById("instruction");

let intensity = 1;
let pressure = 0;
let activated = false;
let transitioning = false;

const beforeHate = "IF THE WORD ";
const hateWord = "HATE";
const afterHate = " WAS ENGRAVED ON EACH NANOANGSTROM...";

let i = 0;
let j = 0;
let k = 0;

function typeBefore() {
  if (i < beforeHate.length) {
    centerText.innerHTML += beforeHate[i];
    i++;
    setTimeout(typeBefore, 25);
  } else {
    setTimeout(typeHate, 300);
  }
}

function typeHate() {
  if (j < hateWord.length) {
    const current = hateWord.substring(0, j + 1);

    centerText.innerHTML =
      beforeHate +
      `<span class="bigHate">${current}</span>`;

    j++;
    setTimeout(typeHate, 250);
  } else {
    setTimeout(typeAfter, 500);
  }
}

function typeAfter() {
  if (k < afterHate.length) {
    centerText.innerHTML =
      beforeHate +
      `<span class="bigHate">${hateWord}</span>` +
      afterHate.substring(0, k + 1);

    k++;
    setTimeout(typeAfter, 20);
  } else {
    activateHateSystem();
  }
}

typeBefore();

function activateHateSystem() {
  activated = true;

  document.addEventListener("mousemove", (e) => {
    if (!activated || transitioning) return;

    pressure += 0.45;

    for (let i = 0; i < intensity; i++) {
      spawnHate(
        e.clientX + (Math.random() * 40 - 20),
        e.clientY + (Math.random() * 40 - 20)
      );
    }

    if (pressure > 35) {
      instruction.innerText = "KEEP CARVING";
    }

    if (pressure > 65) {
      instruction.innerText = "IT IS TOO SMALL TO HOLD";
      body.classList.add("overloaded");
    }

    if (pressure >= 100) {
      pressure = 100;
      beginFracture();
    }

    meterFill.style.width = pressure + "%";
  });

  setInterval(() => {
    if (!activated || transitioning) return;

    intensity += 0.15;

    if (pressure > 0 && pressure < 100) {
      pressure -= 0.25;
      meterFill.style.width = pressure + "%";
    }
  }, 500);

  setInterval(() => {
    if (transitioning) return;

    if (Math.random() < 0.08) {
      body.style.background = "#110000";

      setTimeout(() => {
        body.style.background = "black";
      }, 60);
    }
  }, 200);

  setTimeout(() => {
    document.addEventListener("mousemove", randomBurst);
  }, 8000);
}

function spawnHate(x, y) {
  const word = document.createElement("div");

  word.classList.add("hateTrail");
  word.innerText = "HATE";

  word.style.left = x + "px";
  word.style.top = y + "px";

  word.style.fontSize =
    10 + Math.random() * 26 + "px";

  word.style.opacity =
    0.2 + Math.random() * 0.8;

  word.style.transform =
    `rotate(${Math.random() * 30 - 15}deg)`;

  body.appendChild(word);

  setTimeout(() => {
    word.remove();
  }, 4000);
}

function randomBurst(e) {
  if (transitioning) return;

  if (Math.random() < 0.3) {
    for (let i = 0; i < 20; i++) {
      spawnHate(
        e.clientX + (Math.random() * 220 - 110),
        e.clientY + (Math.random() * 220 - 110)
      );
    }
  }
}

function beginFracture() {
  transitioning = true;
  instruction.innerText = "ENGRAVED";
  meterFill.style.width = "100%";
  body.classList.add("overloaded");

  centerText.innerHTML =
    `<span class="bigHate">HATE</span>
     <span class="bigHate">HATE</span>
     <span class="bigHate">HATE</span>`;

  for (let i = 0; i < 120; i++) {
    setTimeout(() => {
      spawnHate(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight
      );
    }, i * 8);
  }

  const fracture = document.createElement("div");
  fracture.classList.add("fracture");
  body.appendChild(fracture);

  setTimeout(() => {
    window.location.href = "line5/line5.html";
  }, 1150);
}
