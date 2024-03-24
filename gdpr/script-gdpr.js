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
const box_array = [
    document.getElementById("icon_box_1"),
    document.getElementById("icon_box_2"),
    document.getElementById("icon_box_3"),
    document.getElementById("icon_box_4"),
    document.getElementById("icon_box_5"),
    document.getElementById("icon_box_6"),
    document.getElementById("icon_box_7"),
    document.getElementById("icon_box_8")
];

const icon_array = [
    document.getElementById("icon_collection_1"),
    document.getElementById("icon_collection_2"),
    document.getElementById("icon_collection_3"),
    document.getElementById("icon_collection_4"),
    document.getElementById("icon_collection_5"),
    document.getElementById("icon_collection_6"),
    document.getElementById("icon_collection_7"),
    document.getElementById("icon_collection_8")
];

// går gjennom hvert element i icon_array, og for hvert element i arrayen utføres en funksjon
icon_array.forEach((icon, x) => {
    icon.addEventListener("mouseover", () => {
        hoverIkoner(x);
    });

    icon.addEventListener("mouseout", () => {
        avIkoner(x);
    });
});

function hoverIkoner(x) {
    box_array[x].classList.add("active_box");
    icon_array[x].style.color = "#012A4A";
    icon_array[x].style.fontSize = "50px";
}

function avIkoner(x) {
    box_array[x].classList.remove("active_box");
    icon_array[x].style.color = "skyblue";
    icon_array[x].style.fontSize = "40px";
}
