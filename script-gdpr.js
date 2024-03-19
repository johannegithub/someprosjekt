function visCookies() {
    let cookies = document.getElementById("cookies");
    if (cookies.classList.contains("hidden")) {
        cookies.classList.remove("hidden"); // Fjern skjultklassen
    } else {
        cookies.classList.add("hidden"); // Legg til skjultklassen
    }
}

function scrollToSection(sectionId) {
    let section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
}