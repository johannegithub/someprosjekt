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
const icon_1 = document.getElementById("icon_collection_1")
const box_1 = document.getElementById("icon_box_1")
const icon_2 = document.getElementById("icon_collection_2")
const box_2 = document.getElementById("icon_box_2")
const icon_3 = document.getElementById("icon_collection_3")
const box_3 = document.getElementById("icon_box_3")
const icon_4 = document.getElementById("icon_collection_4")
const box_4 = document.getElementById("icon_box_4")
const icon_5 = document.getElementById("icon_collection_5")
const box_5 = document.getElementById("icon_box_5")
const icon_6 = document.getElementById("icon_collection_6")
const box_6 = document.getElementById("icon_box_6")
const icon_7 = document.getElementById("icon_collection_7")
const box_7 = document.getElementById("icon_box_7")
const icon_8 = document.getElementById("icon_collection_8")
const box_8 = document.getElementById("icon_box_8")

let icon_array = [icon_1, icon_2, icon_3, icon_4, icon_5, icon_6, icon_7, icon_8]

icon_1.addEventListener("mouseover", hoverIkoner)
icon_1.addEventListener("mouseout", avIkoner)

function hoverIkoner() {
    box_1.classList.add("active_box")
    icon_1.style.color = "#012A4A"
    icon_1.style.fontSize = "50px"
}

function avIkoner() {
    box_1.classList.remove("active_box")
    icon_1.style.color = "skyblue"
    icon_1.style.fontSize = "40px"
}