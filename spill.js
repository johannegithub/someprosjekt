// Amina
// Henter elementer fra DOM
const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const resultTime = document.querySelector('.resultTime');
const controls = document.querySelector(".controls-container");
const clickSound = document.getElementById("clickSound");
const winSound = document.getElementById("winSound");
const celebrationSound = document.getElementById("celebrationSound");

// Deklarerer variabler
let cards;
let interval;
let firstCard = false;
let secondCard = false;

// Lager items array med bildeinfo
const items = [
    { name: "facebook", image: "bilder/facebook.png" },
    { name: "snap", image: "bilder/snapchat.png" },
    { name: "tiktok", image: "bilder/tiktok.png" },
    { name: "pintrest", image: "bilder/pintrest.png" },
    { name: "instagram", image: "bilder/instagram.png" },
    { name: "whatsapp", image: "bilder/whatsapp.png" },
    { name: "twitter", image: "bilder/twitter.png" },
    { name: "facetime", image: "bilder/facetime.png" },
    { name: "skype", image: "bilder/skype.png" },
    { name: "messenger", image: "bilder/messenger.png" },
    { name: "youtube", image: "bilder/youtube.png" },
    { name: "vine", image: "bilder/vine.png" },
];

// Initialiserer tid og tellevariabler
let seconds = 0,
    minutes = 0;

let movesCount = 0;
let winCount = 0;

//Funk. for å oppdatere tiden
const timeGenerator = () => {
    seconds += 1;

    // Minutter logikk
    if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
    }

    // Formaterer tid før visning
    let secondsValue = seconds < 10 ? `0${seconds}` : seconds; // dersom sekunder er mindre enn 10 da skal det stå 0 først
    let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
    timeValue.innerHTML = `<span>Tid: </span>${minutesValue}:${secondsValue}`;
    resultTime.innerHTML = `<h4>Tid: ${minutesValue}:${secondsValue}</h4>`;
};

// For å øke ant. trekk
const movesCounter = () => {
    movesCount += 1;
    moves.innerHTML = `<span>Trekk: </span>${movesCount}`;
};

// Lydspillfunksjon
const playSound = (audioElement) => {
    audioElement.currentTime = 0; // Tilbakestiller lyden til starten
    audioElement.play();
};

// Velger random object fra items array
const generateRandom = (size = 4) => {
    // Temporary array
    let tempArray = [...items];
    // Initialiserer cardValues array
    let cardValues = [];
    // Størrelsen skal være dobbel (4*4 matrix)/2 siden det vil eksistere par med objekter
    size = (size * size) / 2;
    // Random object valg
    for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * tempArray.length);
        cardValues.push(tempArray[randomIndex]);
        // Fjern objektet fra den midlertidige arrayet, når du har valgt
        tempArray.splice(randomIndex, 1);
    }
    return cardValues;
};

// Genererer spillmatrisen
const matrixGenerator = (cardValues, size = 4) => {
    gameContainer.innerHTML = "";
    cardValues = [...cardValues, ...cardValues]; //dobbler card vales

    // Stokking
    cardValues.sort(() => Math.random() - 0.5); //tilfeldig sortering cardValues-array
    for (let i = 0; i < size * size; i++) {
        gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before"> ? </div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
    }

    // Grid
    gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

    // Kort
    cards = document.querySelectorAll(".card-container");
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            // Hvis kortet ikke er parret eller flipped enda, kjør. (Kort som er parret eller snudd ignoreres ved klikk.)
            if (!card.classList.contains("matched") && !card.classList.contains("flipped")) {
                // Flipp det klikkede kortet
                card.classList.add("flipped");
                if (!firstCard) {
                    // Gjeldene kort vil bli firstCard
                    firstCard = card;
                    // Verdien til det gjeldende kortet blir firstCardValue
                    firstCardValue = card.getAttribute("data-card-value");
                } else {
                    // Øker moves siden brukern valgte det andre kortet
                    movesCounter();
                    // SecondCard og verdi
                    secondCard = card;
                    let secondCardValue = card.getAttribute("data-card-value");

                    if (firstCardValue == secondCardValue) {
                        // Hvis begge kort matcher legg til matched klasse så kortene vil bli ignorert neste gang
                        firstCard.classList.add("matched");
                        secondCard.classList.add("matched");
                        // Setter firstCard til false fordi neste kort vil bli det første
                        firstCard = false;
                        // winCount øker når spiller finner en match
                        winCount += 1;
                        // Sjekker hvis winCount == halvparten av cardValues
                        if (winCount == Math.floor(cardValues.length / 2)) {
                            result.innerHTML = `<h2>Du vant!</h2>
                              <h4>Du brukte ${movesCount} trekk</h4>`;
                            stopGame();

                            // Spill av celebrationSound når alle par er matchet, og spillet er vunnet
                            playSound(celebrationSound);
                        }
                        else {
                            playSound(winSound);
                        }
                    }

                    else {
                        // Hvis kortet ikke matcher flipper det tilbake
                        let [tempFirst, tempSecond] = [firstCard, secondCard];
                        firstCard = false;
                        secondCard = false;
                        let delay = setTimeout(() => {
                            tempFirst.classList.remove("flipped");
                            tempSecond.classList.remove("flipped");
                        }, 900);
                    }
                }
            }
        });
    });
};

// Legger til tastaturnavigasjon for å starte og stoppe spillet
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        if (startButton.classList.contains("hide")) {
            // Hvis startknappen er skjult, stopper spillet
            stopGame();
        } else {
            // Hvis startknappen er synlig, starter spillet
            startGame();
        }
    }
});

// Starter spillet når brukeren klikker på Start-knappen eller trykker Enter
startButton.addEventListener("click", startGame);
startButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        startGame();
    }
});

// Stopper spillet når brukeren klikker på Stopp-knappen eller trykker Enter
stopButton.addEventListener("click", stopGame);
stopButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        stopGame();
    }
});

// Starter spillet og initialiserer verdier og funksjonsanrop
function startGame() {
    movesCount = 0;
    seconds = 0;
    minutes = 0;

    // Kontrollerer knapper og synlighet
    controls.classList.add("hide");
    stopButton.classList.remove("hide");
    startButton.classList.add("hide");
    // Starter tiden
    interval = setInterval(timeGenerator, 1000);
    // Initialiserer trekk
    moves.innerHTML = `<span>Trekk: </span> ${movesCount}`;
    playSound(clickSound); // Spiller av startlyden
    initializer();
}

// Stopper spillet og viser resultater
function stopGame() {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);

    playSound(clickSound); // Spiller av stopplyden ved stopp
}

// Initialiser verdier og funk. anrop
const initializer = () => {
    result.innerText = "";
    winCount = 0;

    let cardValues = generateRandom();
    console.log(cardValues); //viser i console
    matrixGenerator(cardValues);
};