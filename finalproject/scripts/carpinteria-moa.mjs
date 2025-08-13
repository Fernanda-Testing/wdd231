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
    document.querySelector(".hero-img", "spotlight - container img").classList.add("loaded");
});