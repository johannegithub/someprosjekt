// Erika
const slideImage = document.querySelectorAll(".slide");
const slidesContainer = document.querySelector(".slides_container");
const neste_knapp = document.querySelector(".neste_knapp");
const tilbake_knapp = document.querySelector(".tilbake_knapp");
const navigasjonsPrikker = document.querySelector(".navigasjonsprikker");

let antallSlides = slideImage.length;
let slideWidth = slideImage[0].clientWidth;
let currentSlide = 0;

// Set up the slider

function startFunksjon() {
    /*   
      slideImage[0] = 0
      slideImage[1] = 100%
      slideImage[2] = 200%
      */

    slideImage.forEach((img, i) => {
        img.style.left = i * 100 + "%";
    });

    slideImage[0].classList.add("aktiv");

    lagNavigasjonsPrikker();
}

startFunksjon();

// Create navigation dots

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

// Next Button

neste_knapp.addEventListener("click", () => {
    if (currentSlide >= antallSlides - 1) {
        goToSlide(0);
        return;
    }

    currentSlide++;
    goToSlide(currentSlide);
});

// Previous Button

tilbake_knapp.addEventListener("click", () => {
    if (currentSlide <= 0) {
        goToSlide(antallSlides - 1);
        return;
    }

    currentSlide--;
    goToSlide(currentSlide);
});

// Go To Slide

function goToSlide(slideNumber) {
    slidesContainer.style.transform =
        "translateX(-" + slideWidth * slideNumber + "px)";

    currentSlide = slideNumber;

    bestemAktivKlasse();
}

// Set Active Class

function bestemAktivKlasse() {
    // Set active class for Slide Image

    let currentActive = document.querySelector(".slide.aktiv");
    currentActive.classList.remove("aktiv");
    slideImage[currentSlide].classList.add("aktiv");

    //   set active class for navigation dots

    let currentDot = document.querySelector(".prikkene.aktiv");
    currentDot.classList.remove("aktiv");
    navigasjonsPrikker.children[currentSlide].classList.add("aktiv");
}
