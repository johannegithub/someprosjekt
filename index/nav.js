document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.nav-toggle').addEventListener('click', function() {
        document.querySelector('.right-sections ul').classList.toggle('active');
    });
});