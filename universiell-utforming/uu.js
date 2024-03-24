const btn = document.querySelector(".scroll-btn")

btn.addEventListener("click", () => {
    window.scrollTo({
        top: 700,
        behavior: "smooth"
    })
});

function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}

// Flip-cards (Syn)
const card = document.getElementById("card")
card.addEventListener("click", flipCard);

function flipCard() {
    card.classList.toggle("flipCard");
}


// Kontrast
const ikon_kontrast = document.querySelector(".fa-circle-half-stroke")

ikon_kontrast.addEventListener("click", changeColor);

function changeColor() {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    ikon_kontrast.style.color = "#" + randomColor
}

// Musikk

const musikk = document.getElementById("horsel_musikk")
const ikon_musikk = document.querySelector(".ikon_musikk")
const h5_tekst = document.getElementById("musikk_h5")

function AvPaaMusikk() {
    if (musikk.paused) {
        musikk.play();
        ikon_musikk.classList.remove("fa-headphones")
        ikon_musikk.classList.add("fa-volume-high")
        h5_tekst.innerHTML = "MELODI"
    }
    else {
        musikk.pause();
        ikon_musikk.classList.remove("fa-volume-high")
        ikon_musikk.classList.add("fa-headphones")
        h5_tekst.innerHTML = "Trykk på ikonet for å spille av lyd"
    }
}
