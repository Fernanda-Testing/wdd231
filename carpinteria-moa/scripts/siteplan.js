const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

const today = new Date();

currentYear.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;

lastModified.innerHTML = `<span class="highlight">Last modified: ${document.lastModified}</span>`;