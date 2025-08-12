const currentYear = document.querySelector("#currentyear");

const hamButton = document.querySelector('#menu');
const pages = document.querySelector('.pages');

const today = new Date();

currentYear.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;

if (hamButton && pages) {
    hamButton.addEventListener('click', () => {
        pages.classList.toggle('open');
        hamButton.classList.toggle('open');
    });
}

window.addEventListener("load", () => {
    document.querySelector(".hero-img").classList.add("loaded");
});