function visCookies() {
    var cookies = document.getElementById("cookies");
    if (cookies.classList.contains("hidden")) {
        cookies.classList.remove("hidden"); // Fjern skjultklassen
    } else {
        cookies.classList.add("hidden"); // Legg til skjultklassen
    }
}

function scrollToSection(sectionId) {
    var section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
}