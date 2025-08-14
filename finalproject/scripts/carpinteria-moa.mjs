const currentYear = document.querySelector("#currentyear");

const hamButton = document.querySelector('#menu');
const pages = document.querySelector('.pages');

const today = new Date();

currentYear.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;

hamButton.addEventListener('click', () => {

    if (window.innerWidth < 900) {
        pages.classList.toggle('open');
        hamButton.classList.toggle('open');
    }
});

function handleResize() {
    if (window.innerWidth >= 900) {
        pages.classList.remove('open');
        hamButton.classList.remove('open');
    }
}

window.addEventListener('resize', handleResize);
window.addEventListener('load', handleResize);

window.addEventListener("load", () => {
    document
        .querySelectorAll(".hero-img, .main-content-contact img")
        .forEach(img => img.classList.add("loaded"));
});

document.addEventListener("DOMContentLoaded", () => {
    const tsField = document.getElementById("formTimestamp");
    if (tsField) {
        tsField.value = new Date().toLocaleString();
    }
});