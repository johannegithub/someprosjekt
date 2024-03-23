//Amina
// Henter elementer fra DOM
const arrow = document.getElementById("arrow");
const cookiesSection = document.getElementById("cookies");
const cookiesLink = document.querySelector('a[href="#cookies"]');
const privacyLink = document.querySelector('a[href="#personvern"]');

// Vis cookies-seksjonen ved click
arrow.addEventListener("click", cookiesToggle);

function cookiesToggle() {
    if (cookiesSection.classList.contains("hidden")) {
        cookiesSection.classList.remove("hidden");
        scrollToSection("cookies"); // Åpne og rull til cookies-seksjonen hvis den er skjult
    } else {
        cookiesSection.classList.add("hidden");
    }
}

// Scroller til cookies-seksjonen når lenken klikkes
cookiesLink.addEventListener('click', function(event) {
    event.preventDefault(); // For å unngå at lenken ruller siden til toppen
    if (cookiesSection.classList.contains("hidden")) { // Hvis skjult - åpne og scroll 
        cookiesSection.classList.remove("hidden");
        scrollToSection("cookies");
    } else {
        scrollToSection("cookies"); // Hvis allere åpen - scroll
    }
});

// Scroller til personvern-seksjon når lenken klikkes
privacyLink.addEventListener('click', function(event) {
    event.preventDefault(); // For å unngå at lenken ruller siden til toppen
    scrollToSection("personvern");
});

// Funk. for å rulle til bestemt section
function scrollToSection(sectionId) {
    let section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
}

// GDPR SIKELEN
let icon_array = [icon_collection_1, icon_collection_2, icon_collection_3, icon_collection_4, icon_collection_5, icon_collection_6, icon_collection_7, icon_collection_8]
let ikoner = document.querySelectorAll(".icon")
const icon_1 = document.getElementById("icon_collection_1")

icon_1.addEventListener("click", hoverIkoner)

function hoverIkoner() {
    icon_1.classList.add("active_icon");
}