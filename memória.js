let elemek = ["🐢", "🐢", "🍄", "🍄", "🍄‍🟫", "🍄‍🟫", "👨‍🔧", "👨‍🔧", "🦔", "🦔", "🐧", "🐧", "🐸", "🐸", "🎮", "🎮"]
let megoldás = []

document.getElementById('nyíló').addEventListener('click', function() {
    const letezoSzoveg = document.getElementById('megjelento-felirat');
    
    if (letezoSzoveg) {
        letezoSzoveg.remove();
    } else {
        const ujSzoveg = document.createElement('p');
        ujSzoveg.id = 'megjelento-felirat';
        ujSzoveg.textContent = 'Készítette Pogasits Ákos és Csepregi József';
        
        this.parentNode.insertBefore(ujSzoveg, this.nextSibling);
    }
});

let kártyák = document.getElementById("kártyák");
let pontszám = document.getElementById("pont");
let időKijelző = document.getElementById("idő");
let győzelemSzöveg = document.getElementById("győzelem");
let újraGomb = document.getElementById("újra-gomb");

let előzőSor = -1
let előzőOszlop = -1
let pont = 0
let mutat = false
let másodperc = 0
let időzítő = null
let játékMegy = false

function keverés() {
  megoldás = []
  let masolat = [...elemek]
  
  //Ezt azért raktam bele, hogy összekeverje a kártyákat a program újraindításkor. 
  for (let i = masolat.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = masolat[i];
    masolat[i] = masolat[j];
    masolat[j] = temp;
  }

  for (let i = 0; i < 4; i++) {
    megoldás[i] = []
    for (let j = 0; j < 4; j++) {
      megoldás[i][j] = masolat[i * 4 + j]
    }
  }
}
//Ezt csak azért tettem bele hogy legyen egy kis kihívás. :)
function stoppetIndít() {
  clearInterval(időzítő)
  másodperc = 0
  időKijelző.textContent = "Idő: 0s"
  időzítő = setInterval(() => {
    másodperc++
    időKijelző.textContent = "Idő: " + másodperc + "s"
  }, 1000)
}

function újJáték() {
  keverés()
  pont = 0
  előzőSor = -1
  előzőOszlop = -1
  mutat = false
  játékMegy = false
  clearInterval(időzítő)
  
  pontszám.textContent = "Pontszám: 0"
  időKijelző.textContent = "Idő: 0s"
  győzelemSzöveg.style.display = "none"

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      kártyák.rows[i].cells[j].textContent = "?"
    }
  }
}

újraGomb.onclick = function() {
  újJáték()
}

for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 4; j++) {
    kártyák.rows[i].cells[j].onclick = function() {
      if (mutat == true || (i == előzőSor && j == előzőOszlop) || kártyák.rows[i].cells[j].textContent != "?") {
        return;
      }

      if (!játékMegy) {
        játékMegy = true
        stoppetIndít()
      }

      kártyák.rows[i].cells[j].textContent = megoldás[i][j]

      if (előzőSor == -1) {
        előzőSor = i;
        előzőOszlop = j;
        return;
      }

      if (kártyák.rows[i].cells[j].textContent == kártyák.rows[előzőSor].cells[előzőOszlop].textContent) {
        előzőSor = -1
        előzőOszlop = -1
        pont += 1
        pontszám.textContent = "Pontszám: " + pont

        if (pont == 8) {
          clearInterval(időzítő)
          győzelemSzöveg.style.display = "block"
        }
      } 
      else {
        mutat = true
        setTimeout(() => {
          kártyák.rows[i].cells[j].textContent = "?";
          kártyák.rows[előzőSor].cells[előzőOszlop].textContent = "?";
          előzőSor = -1
          előzőOszlop = -1
          mutat = false
        }, 1000)
      }
    }
  }
}

újJáték()
