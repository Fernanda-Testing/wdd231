const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

const hamButton = document.querySelector('#menu');
const pages = document.querySelector('.pages');

const today = new Date();

currentYear.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;
lastModified.innerHTML = `<span class="highlight">Last Modification: ${document.lastModified}</span>`;

hamButton.addEventListener('click', () => {
    pages.classList.toggle('open');
    hamButton.classList.toggle('open');
});

const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("#cards");

gridbutton.addEventListener("click", () => {
    displayCompaniesByGrid(companiesGlobal);
    setActiveButton(gridbutton);
});

listbutton.addEventListener("click", () => {
    if (window.innerWidth >= 900) {
        displayCompaniesByList(companiesGlobal);
        setActiveButton(listbutton);
    }
});

/* Grid for companies information */

const src = "data/members.json";
const cards = document.querySelector('#cards');
let companiesGlobal = [];

const getCompaniesData = async () => {
    try {
        const response = await fetch(src);
        const data = await response.json();
        companiesGlobal = data.companies;

        displayCompaniesByGrid(companiesGlobal);
        setActiveButton(gridbutton);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

getCompaniesData();

const displayCompaniesByGrid = (companiesArray) => {
    cards.innerHTML = "";
    cards.classList.add("grid");
    cards.classList.remove("list");

    companiesArray.forEach((company) => {
        const card = document.createElement("section");
        card.classList.add("companie-card");

        const photo = document.createElement("img");
        photo.setAttribute("src", company.image);
        photo.setAttribute("alt", `About ${company.name}`);
        photo.setAttribute("loading", "lazy");
        photo.setAttribute("width", "150");
        photo.setAttribute("height", "150");

        const address = document.createElement("p");
        address.textContent = company.address;

        const phoneNumber = document.createElement("p");
        phoneNumber.textContent = company.phoneNumber;

        const webUrl = document.createElement("a");
        webUrl.textContent = company.webSiteUrl;
        webUrl.href = company.webSiteUrl;
        webUrl.target = "_blank";

        card.appendChild(photo);
        card.appendChild(address);
        card.appendChild(phoneNumber);
        card.appendChild(webUrl);

        cards.appendChild(card);
    });
};

const displayCompaniesByList = (companiesArray) => {
    cards.innerHTML = "";
    cards.classList.remove("grid");
    cards.classList.add("list");

    const table = document.createElement("table");
    const tbody = document.createElement("tbody");

    companiesArray.forEach((company) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td id="companyname">${company.name}</td>
            <td>${company.address}</td>
            <td>${company.phoneNumber}</td>
            <td><a href="${company.webSiteUrl}" target="_blank">${company.webSiteUrl}</a></td>`;
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    cards.appendChild(table);
};

function setActiveButton(activeBtn) {
    gridbutton.classList.remove("active");
    listbutton.classList.remove("active");
    activeBtn.classList.add("active");
}

window.addEventListener("resize", () => {

    if (window.innerWidth < 900 && display.classList.contains("list")) {
        displayCompaniesByGrid(companiesGlobal);
        setActiveButton(gridbutton);
    }

    if (window.innerWidth >= 900) {
        pages.classList.remove("open");
        hamButton.classList.remove("open");
    }
});

function getRandomCompanies(companiesArray, count) {
    const shuffled = [...companiesArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function displaySpotlights(companiesArray) {
    const spotlightsContainer = document.querySelector("#spotlights");
    spotlightsContainer.innerHTML = "";

    const selectedCompanies = getRandomCompanies(companiesArray, 3);

    selectedCompanies.forEach(company => {
        const spotlightCard = document.createElement("section");
        spotlightCard.classList.add("companie-card", "spotlight");

        const img = document.createElement("img");
        img.src = company.image;
        img.alt = `Logo of ${company.name}`;
        img.width = 100;
        img.height = 100;
        img.loading = "lazy";

        const info = document.createElement("div");
        info.innerHTML = `
            <h4>${company.name}</h4>
            <p>${company.address}</p>
            <p>${company.phoneNumber}</p>
            <a href="${company.webSiteUrl}" target="_blank">${company.webSiteUrl}</a>
        `;

        spotlightCard.appendChild(img);
        spotlightCard.appendChild(info);

        spotlightsContainer.appendChild(spotlightCard);
    });
}

getCompaniesData = async () => {
    try {
        const response = await fetch(src);
        const data = await response.json();
        companiesGlobal = data.companies;

        displayCompaniesByGrid(companiesGlobal);
        displaySpotlights(companiesGlobal); 
        setActiveButton(gridbutton);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};