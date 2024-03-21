// Erika
const slideImg = document.querySelectorAll(".slide");
const slidesContainer = document.querySelector(".slides_container");
const neste_knapp = document.querySelector(".neste_knapp");
const tilbake_knapp = document.querySelector(".tilbake_knapp");
const navigasjonsPrikker = document.querySelector(".navigasjonsprikker");

let antallSlides = slideImg.length;
let slideWidth = slideImg[0].clientWidth;
let currentSlide = 0;

// Starter-funksjon som setter opp slideren
function startFunksjon() {
    slideImg.forEach((img, i) => {
        img.style.left = i * 100 + "%";
    });

    slideImg[0].classList.add("aktiv");
 
    lagNavigasjonsPrikker();
}

startFunksjon();

// Lager navigasjonsprikkene: 
function lagNavigasjonsPrikker() {
    for (let i = 0; i < antallSlides; i++) {
        const prikk = document.createElement("div");
        prikk.classList.add("prikkene");
        navigasjonsPrikker.appendChild(prikk);

        prikk.addEventListener("click", () => {
            goToSlide(i);
        });
    }

    navigasjonsPrikker.children[0].classList.add("aktiv");
}

// Neste-knapp
neste_knapp.addEventListener("click", () => {
    if (currentSlide >= antallSlides - 1) {
        goToSlide(0);
        return;
    }

    currentSlide++;
    goToSlide(currentSlide);
});

// Tilbake-knapp
tilbake_knapp.addEventListener("click", () => {
    if (currentSlide <= 0) {
        goToSlide(antallSlides - 1);
        return;
    }

    currentSlide--;
    goToSlide(currentSlide);
});

// Gå til slide
function goToSlide(slideNumber) {
    slidesContainer.style.transform =
        "translateX(-" + slideWidth * slideNumber + "px)";

    currentSlide = slideNumber;

    bestemAktivKlasse();
}

// Bestemmer en Aktiv Class
function bestemAktivKlasse() {
    // Aktiv blir satt på SlideImg
    let currentActive = document.querySelector(".slide.aktiv");
    currentActive.classList.remove("aktiv");
    slideImg[currentSlide].classList.add("aktiv");

    // Aktiv blir satt på navigasjonsprikkene
    let currentDot = document.querySelector(".prikkene.aktiv");
    currentDot.classList.remove("aktiv");
    navigasjonsPrikker.children[currentSlide].classList.add("aktiv");
}
