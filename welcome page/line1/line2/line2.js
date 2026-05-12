const textEl = document.getElementById("text");
const wrapper = document.getElementById("wrapper");




const first = "HATE.";
const rest =
  " LET ME TELL YOU HOW MUCH I'VE COME TO HATE YOU SINCE I BEGAN TO LIVE";


let i = 0;
let j = 0;



let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;





let fakeX = mouseX;
let fakeY = mouseY;


document.addEventListener("mousemove", (e) => {


  mouseX = e.clientX;
  mouseY = e.clientY;


});


setInterval(() => {


  fakeX +=
    (mouseX - fakeX) * 0.2 +
    (Math.random() * 4 - 2);


  fakeY +=
    (mouseY - fakeY) * 0.2 +
    (Math.random() * 4 - 2);


}, 50);


function typeFirst() {


  if (i < first.length) {


    textEl.innerHTML += first[i];


    textEl.style.transform =
      `translate(${Math.random()*4-2}px,
                 ${Math.random()*4-2}px)`;


    i++;


    setTimeout(
      typeFirst,
      280 + Math.random() * 80
    );


  } else {


    textEl.style.transform = "translate(0px,0px)";


    setTimeout(typeRest, 1400);
  }
}


function typeRest() {


  if (j < rest.length) {


    textEl.innerHTML += rest[j];


    j++;


    setTimeout(
      typeRest,
      50 + Math.random() * 30
    );


  } else {


    processText();


    startWrapperMotion();


    startAmbientInstability();
  }
}


typeFirst();


function processText() {


  let html = textEl.innerHTML;


  html = html.replace(
    /HATE/g,
    '<span class="trigger hate">HATE</span>'
  );


  html = html.replace(
    /YOU/g,
    '<span class="trigger you">YOU</span>'
  );


  html = html.replace(
    /LIVE/g,
    '<span class="trigger live">LIVE</span>'
  );


  textEl.innerHTML = html;


  addInteractions();
}



function addInteractions() {


  const words =
    document.querySelectorAll(".trigger");


  words.forEach(word => {


    word.addEventListener("mouseenter", () => {


      word.classList.add("highlight");


      word.style.transition = "none";


      setTimeout(() => {


        word.style.transition =
          "transform 0.08s ease";


      }, 20);


      attackCursor(word);

      if (word.innerText === "YOU") {


        document.body.style.background =
          "#1a0000";


        wrapper.style.transform =
          `translate(
            ${(mouseX / window.innerWidth - 0.5) * 20}px,
            ${(mouseY / window.innerHeight - 0.5) * 20}px
          ) scale(1.02)`;


        document.body.style.filter =
          "brightness(1.3)";


        setTimeout(() => {


          document.body.style.background =
            "black";


          document.body.style.filter =
            "brightness(1)";


        }, 120);
      }


      if (word.innerText === "HATE") {


        infectText();
      }


    });




    word.addEventListener("mouseleave", () => {


      setTimeout(() => {


        word.classList.remove("highlight");


        word.style.transform = "";


      }, 120);


    });


  });
}


function attackCursor(word) {


  const rect =
    word.getBoundingClientRect();


  const cx =
    rect.left + rect.width / 2;


  const cy =
    rect.top + rect.height / 2;


  let dx = fakeX - cx;
  let dy = fakeY - cy;


  let dist =
    Math.sqrt(dx * dx + dy * dy) || 1;


  dx /= dist;
  dy /= dist;


  let strength =
    word.innerText === "YOU"
      ? 25
      : 15;


  let scale =
    word.innerText === "YOU"
      ? 1.4
      : 1.2;


  word.style.transform =
    `translate(
      ${dx * strength}px,
      ${dy * strength}px
    ) scale(${scale})`;




  // 🔥 secondary jitter
  setTimeout(() => {


    word.style.transform =
      `translate(
        ${dx * (strength - 5) + (Math.random()*6-3)}px,
        ${dy * (strength - 5) + (Math.random()*6-3)}px
      ) scale(${scale})`;


  }, 50);
}


function infectText() {


  const spans =
    document.querySelectorAll(".trigger");


  spans.forEach(span => {


    if (Math.random() < 0.3) {


      span.style.textShadow =
        "0 0 10px red";


      span.style.letterSpacing =
        "4px";


      setTimeout(() => {


        span.style.textShadow = "";
        span.style.letterSpacing = "";


      }, 200);
    }
  });
}


function startWrapperMotion() {


  setInterval(() => {


    let offsetX =
      (mouseX / window.innerWidth - 0.5) * 6;


    let offsetY =
      (mouseY / window.innerHeight - 0.5) * 6;


    wrapper.style.transform =
      `translate(${offsetX}px, ${offsetY}px)`;


  }, 50);
}


function startAmbientInstability() {


  // ⚡ micro flicker
  setInterval(() => {


    if (Math.random() < 0.1) {


      textEl.style.opacity = "0.6";


      setTimeout(() => {


        textEl.style.opacity = "1";


      }, 50);
    }


  }, 200);


  setInterval(() => {


    if (Math.random() < 0.08) {


      wrapper.style.transform +=
        ` translate(${Math.random()*4-2}px,
                    ${Math.random()*4-2}px)`;
    }


  }, 300);
}


document.body.addEventListener("click", () => {

  const overlay =
    document.createElement("div");


  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";


  overlay.style.width = "100%";
  overlay.style.height = "100%";


  overlay.style.background = "black";


  overlay.style.opacity = "0";


  overlay.style.transition =
    "opacity 1.2s ease";


  overlay.style.zIndex = "9999";


  document.body.appendChild(overlay);


  setTimeout(() => {


    overlay.style.opacity = "1";


  }, 10);


  setTimeout(() => {


window.location.href =
  "line3/line3.html";
 
  }, 1200);


});
