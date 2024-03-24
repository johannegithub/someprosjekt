//Amina
// Henter elementer fra DOM

const cookiesSection = document.getElementById("cookies");
const arrow = document.getElementById("arrow");
const cookiesLink = document.querySelector('a[href="#cookies"]');
const privacyLink = document.querySelector('a[href="#personvern"]');
const gdprLink = document.querySelector('a[href="#GDPR"]');

arrow.addEventListener('click', function (event) {
    event.preventDefault();
    toggleCookiesSection();
});

cookiesLink.addEventListener('click', function (event) {
    event.preventDefault();
    toggleCookiesSection();
});

privacyLink.addEventListener('click', function (event) {
    event.preventDefault();
    scrollToSection("#personvern");
});

gdprLink.addEventListener('click', function (event) {
    event.preventDefault();
    scrollToSection("#GDPR");
});

function toggleCookiesSection() {
    if (cookiesSection.classList.contains("hidden")) {
        cookiesSection.classList.remove("hidden");
        scrollToSection("#cookies");
    } else {
        cookiesSection.classList.add("hidden");
    }
}

function scrollToSection(sectionId, offsetAdjustment = 20) {
    const section = document.querySelector(sectionId);
    if (section) {
        const navHeight = document.querySelector('header').offsetHeight;
        const offset = navHeight + offsetAdjustment;
        window.scrollTo({
            top: section.offsetTop - offset,
            behavior: "smooth"
        });
    }
}

//Når man klikker på 'cookie'-lenken skal man ikke kunne lukke cookies-section, men åpne og skrolle
cookiesLink.addEventListener('click', function (event) {
    event.preventDefault(); //preventer derfor togglebuttom 
    // Sjekker om cookies seksjonen er skjult
    if (cookiesSection.classList.contains("hidden")) {
        // Hvis den er skjult, åpne den og rull til cookies seksjonen
        toggleCookiesSection();
    } else {
        // Hvis den allerede er åpen, bare rull til cookies seksjonen
        scrollToSection("#cookies");
    }
});

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
