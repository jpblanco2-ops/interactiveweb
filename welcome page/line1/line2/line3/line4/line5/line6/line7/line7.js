const body = document.body;

let popupCount = 0;


// ==============================
// 🔴 CREATE POPUP
// ==============================

function createPopup(x, y) {

  popupCount++;

  const popup = document.createElement("div");
  popup.classList.add("popup");

  popup.style.left = x + "px";
  popup.style.top = y + "px";

  // random size escalation
  const scale =
    0.8 + Math.random() * 1.5;

  popup.style.transform =
    `scale(${scale})`;

  popup.innerHTML = `

    <div class="titleBar">

      SYSTEM ERROR

      <div class="closeBtn">X</div>

    </div>

    <div class="popupContent">
      HATE
    </div>
  `;

  body.appendChild(popup);


  // ==============================
  // 🔥 SHAKING
  // ==============================

  setInterval(() => {

    const shakeX =
      Math.random() * 6 - 3;

    const shakeY =
      Math.random() * 6 - 3;

    popup.style.marginLeft =
      shakeX + "px";

    popup.style.marginTop =
      shakeY + "px";

  }, 40);


  // ==============================
  // 🔴 CLOSE BUTTON
  // ==============================

  const closeBtn =
    popup.querySelector(".closeBtn");

  closeBtn.addEventListener("click", () => {

    popup.remove();

    // every close creates MORE
    for (let i = 0; i < 2 + Math.random() * 4; i++) {

      createPopup(
        Math.random() *
          (window.innerWidth - 250),

        Math.random() *
          (window.innerHeight - 150)
      );
    }
  });
}


// ==============================
// 🔥 INITIAL POPUP
// ==============================

createPopup(
  window.innerWidth / 2 - 120,
  window.innerHeight / 2 - 80
);


// ==============================
// 🔴 AUTONOMOUS ESCALATION
// ==============================

setInterval(() => {

  if (popupCount < 120) {

    createPopup(
      Math.random() *
        (window.innerWidth - 250),

      Math.random() *
        (window.innerHeight - 150)
    );
  }

}, 1500);

setInterval(() => {

  if (Math.random() < 0.4) {

    body.style.background = "#220000";

    setTimeout(() => {

      body.style.background = "black";

    }, 40);
  }

}, 120);