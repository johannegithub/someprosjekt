
function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
  }

  const card = document.getElementById("card")
  card.addEventListener("click", flipCard);

  function flipCard() {
    card.classList.toggle("flipCard");
  }