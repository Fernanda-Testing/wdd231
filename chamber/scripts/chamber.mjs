const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

const hamButton = document.querySelector('#menu');
const pages = document.querySelector('.pages');

const today = new Date();

currentYear.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;
lastModified.innerHTML = `<span class="highlight">Last Modification: ${document.lastModified}</span>`;

if (hamButton && pages) {
    hamButton.addEventListener('click', () => {
        pages.classList.toggle('open');
        hamButton.classList.toggle('open');
    });
}