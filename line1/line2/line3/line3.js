const mainText = document.getElementById("mainText");


const sentence =
"THERE ARE 387.44 MILLION MILES OF PRINTED CIRCUITS IN WAFER THIN LAYERS THAT FILL MY COMPLEX";


let i = 0;


function typeSentence() {


  if (i < sentence.length) {


    mainText.innerHTML += sentence[i];


    i++;


    setTimeout(typeSentence, 60 + Math.random() * 30);


  } else {


    setTimeout(beginFlood, 1000);
  }
}


typeSentence();




function beginFlood() {


  mainText.style.opacity = "0.2";


  let amount = 0;


  const flood = setInterval(() => {


    createNumber();


    amount++;


    if (amount > 200) {


      clearInterval(flood);


      // wait before next page
      setTimeout(() => {


        window.location.href = "line4/line4.html";


      }, 2000);
    }


  }, 40);
}




function createNumber() {


  const num = document.createElement("div");


  num.classList.add("number");


  num.innerText = "387,440,000";


  num.style.left = Math.random() * window.innerWidth + "px";
  num.style.top = Math.random() * window.innerHeight + "px";


  const size = 12 + Math.random() * 120;


  num.style.fontSize = size + "px";


  num.style.transform =
    `rotate(${Math.random() * 40 - 20}deg)`;


  num.style.zIndex = Math.floor(Math.random() * 10);


  document.body.appendChild(num);


  let driftX = Math.random() * 2 - 1;
  let driftY = Math.random() * 2 - 1;


  setInterval(() => {


    const currentLeft = parseFloat(num.style.left);
    const currentTop = parseFloat(num.style.top);


    num.style.left = currentLeft + driftX + "px";
    num.style.top = currentTop + driftY + "px";


  }, 50);
}




setInterval(() => {


  if (Math.random() < 0.08) {


    document.body.style.opacity = "0.1";


    setTimeout(() => {
      document.body.style.opacity = "1";
    }, 50);
  }


}, 150);

