const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("#cards");

if (gridbutton && listbutton && display) {
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
}

/* Grid for companies information */

const src = "data/members.json";
const cards = document.querySelector('#cards');
let companiesGlobal = [];

const getCompaniesData = async () => {
    try {
        const response = await fetch(src);
        const data = await response.json();
        companiesGlobal = data.companies;

        if (document.querySelector("#cards")) {
            displayCompaniesByGrid(companiesGlobal);
            setActiveButton(gridbutton);
        }

        if (document.querySelector("#spotlights")) {
            displaySpotlights(companiesGlobal);
        }

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
    if (display && display.classList.contains("list") && window.innerWidth < 900) {
        displayCompaniesByGrid(companiesGlobal);
        setActiveButton(gridbutton);
    }

    if (pages && hamButton && window.innerWidth >= 900) {
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

    const filteredCompanies = companiesArray.filter(company =>
        company.membershiplevel === 2 || company.membershiplevel === 3
    );

    const selectedCompanies = getRandomCompanies(filteredCompanies, 3);

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
            <p><strong>Address:</strong> ${company.address}</p>
            <p><strong>Phone Number:</strong> ${company.phoneNumber}</p>
            <p><strong>Membership Level:</strong> ${getMembershipLevelText(company.membershiplevel)}</p>
            <p><strong>WebSite URL: </strong><a href="${company.webSiteUrl}" target="_blank">${company.webSiteUrl}</a></p>
        `;

        spotlightCard.appendChild(img);
        spotlightCard.appendChild(info);
        spotlightsContainer.appendChild(spotlightCard);
    });
}

function getMembershipLevelText(level) {
    switch (level) {
        case 1: return "Bronze";
        case 2: return "Silver";
        case 3: return "Gold";
        default: return "Standard";
    }
}