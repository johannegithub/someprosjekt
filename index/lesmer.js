
paragraf.addEventListener("click", toggleUlovig);
function toggleUlovig() {
    var div = document.getElementById("ulovlig");
    if (div.style.display === "none") {
      div.style.display = "block";
    } else {
      div.style.display = "none";
    }
  }