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

//Highscore 
const URL = "https://rasmusweb.no/hs.php";
const GameID = "memory-game";

async function getHighscore() {
    const response = await fetch(URL + "?id=" + GameID, {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    });

    const highscoreData = await response.json();
    return highscoreData;
}

async function saveHighscore(time, moves) {
    const playerName = prompt("Gratulerer! Du har satt en highscore!\nSkriv inn navnet ditt:");

    const data = {
        id: GameID,
        time: time,
        moves: moves,
        playerName: playerName,
    };

    const response = await fetch(URL, {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
        body: JSON.stringify(data),
    });

    const responseData = await response.json();
    console.log(responseData);
}

async function displayHighscore() {
    const highscoreData = await getHighscore();

    const highscoreContainer = document.getElementById("highscore-container");
    highscoreContainer.innerHTML = ""; // fjerner eksisterende highscore date 

    if (Array.isArray(highscoreData)) { // Sjekker om highscoreData er  array
        const highscoreList = document.createElement("ol");

        highscoreData.forEach((entry, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${index + 1}. ${entry.playerName} - Tid: ${entry.time}, Trekk: ${entry.moves}`;
            highscoreList.appendChild(listItem);
        });

        highscoreContainer.appendChild(highscoreList);
    } else {
        const noHighscoreMessage = document.createElement("p");
        noHighscoreMessage.textContent = "Ingen highscore-data tilgjengelig.";
        highscoreContainer.appendChild(noHighscoreMessage);
    }
}

// Funk. for å oppdatere highscore når spillet er vunnet
async function updateHighscore(time, moves) {
    const highscoreData = await getHighscore();

    // Hvis det ikke er noen highscore enda, eller hvis spillers poeng er bedre enn den dårligste highscoren
    if (!highscoreData || highscoreData.length < 10 || (time < highscoreData[highscoreData.length - 1].time && moves < highscoreData[highscoreData.length - 1].moves)) {
        saveHighscore(time, moves);
    }

    // Oppdaterer highscore 
    displayHighscore();
}

// Kaller funksjonen når spillet er vunnet for å oppdatere highscore
// Men tiden brukt og ant. trekk som parametere
updateHighscore(minutes * 60 + seconds, movesCount);