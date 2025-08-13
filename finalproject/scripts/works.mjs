const src = "data/works.json";
const cards = document.querySelector('#cards');
let worksGlobal = [];

const getWorksData = async () => {
    try {
        const response = await fetch(src);
        const data = await response.json();
        worksGlobal = data.works;

        if (document.querySelector("#cards")) {
            displayWorks(worksGlobal);
        }

        if (document.querySelector("#spotlights")) {
            displaySpotlights(worksGlobal);
        }

    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

getWorksData();

const displayWorks = (worksArray) => {
    cards.innerHTML = "";
    cards.classList.add("grid");

    worksArray.forEach((work) => {
        const card = document.createElement("section");
        card.classList.add("companie-card");

        const photo = document.createElement("img");
        photo.setAttribute("src", work.image);
        photo.setAttribute("alt", `${work.name}`);
        photo.setAttribute("loading", "lazy");
        photo.setAttribute("width", "200");
        photo.setAttribute("height", "200");

        photo.addEventListener("click", () => openModal(work)); //new line

        const name = document.createElement("h3");
        name.textContent = work.name;

        card.appendChild(photo);
        card.appendChild(name);

        cards.appendChild(card);
    });
};

function getRandomWorks(worksArray, count) {
    const shuffled = [...worksArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function displaySpotlights(worksArray) {
    const spotlightsContainer = document.querySelector("#spotlights");
    spotlightsContainer.innerHTML = "";

    const filteredWorks = worksArray.filter(work =>
        work.sizework === "Large" || work.sizework === "Medium"
    );

    const selectedWorks = getRandomWorks(filteredWorks, 3);

    selectedWorks.forEach(work => {
        const spotlightCard = document.createElement("section");
        spotlightCard.classList.add("work-card", "spotlights");

        const img = document.createElement("img");
        img.src = work.image;
        img.alt = `${work.name}`;
        img.width = 200;
        img.height = 200;
        img.loading = "lazy";

        const name = document.createElement("h3");
        name.textContent = work.name;

        spotlightCard.appendChild(img);
        spotlightCard.appendChild(name);
        spotlightsContainer.appendChild(spotlightCard);
    });

    const goToAlbumBtn = document.createElement("button");
    goToAlbumBtn.textContent = `SEE MORE`;
    goToAlbumBtn.setAttribute("id", "see-more-btn");
    goToAlbumBtn.addEventListener('click', function () {
        window.location.href = "https://fernanda-testing.github.io/wdd231/finalproject/album.html";
    });
    spotlightsContainer.appendChild(goToAlbumBtn);
}

function filterWorks(worksArray, filterProperty, filterValue, containerId) {
    const filteredWorks = worksArray.filter(work => {
        return work[filterProperty] === filterValue;
    });
    displayWorks(filteredWorks);
}

function setActiveFilterLink(clickedId) {
    const links = document.querySelectorAll(".nav-filters a");
    links.forEach(link => {
        if (link.id === clickedId) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

function setupFilter(id, property, value) {
    const link = document.getElementById(id);
    if (!link) return;

    link.addEventListener("click", (e) => {
        e.preventDefault();
        setActiveFilterLink(id);

        if (document.getElementById("cards")) {
            if (property === "all") {
                displayWorks(worksGlobal);
            } else {
                filterWorks(worksGlobal, property, value, "cards");
            }
        }
    });
}

setupFilter("woodworking", "isItWoodWork", true);
setupFilter("plastering", "isItWoodWork", false);
setupFilter("small", "sizework", "Small");
setupFilter("medium", "sizework", "Medium");
setupFilter("large", "sizework", "Large");
setupFilter("indoor", "IsItOutdoorFurniture", false);
setupFilter("outdoor", "IsItOutdoorFurniture", true);
setupFilter("all-works", "all", null);

const dialogBox = document.querySelector("#dialogBox");
const dialogTitle = dialogBox.querySelector("h2");
const closeButton = dialogBox.querySelector("button");

function openModal(work) {
    const imageContainer = dialogBox.querySelector("#dialog-image-container");
    imageContainer.innerHTML = '';

    dialogTitle.textContent = work.name;

    const photo = document.createElement("img");
    photo.setAttribute("src", work.image);
    photo.setAttribute("alt", `${work.name}`);
    photo.setAttribute("loading", "lazy");
    photo.setAttribute("width", "100%");
    photo.setAttribute("height", "auto");
    photo.setAttribute("display", "block");
    photo.setAttribute("margin", "0 auto");

    imageContainer.appendChild(photo);

    dialogBox.showModal();
}

function openModalFromImage(src, alt) {
    const imageContainer = dialogBox.querySelector("#dialog-image-container");
    imageContainer.innerHTML = '';

    dialogTitle.textContent = alt;

    const photo = document.createElement("img");
    photo.src = src;
    photo.alt = alt;
    photo.loading = "lazy";
    photo.style.width = "100%";
    photo.style.height = "auto";
    photo.style.display = "block";
    photo.style.margin = "0 auto";

    imageContainer.appendChild(photo);
    dialogBox.showModal();
}

document.querySelectorAll(".clickable-img").forEach(img => {
    img.addEventListener("click", () => {
        openModalFromImage(img.src, img.alt);
    });
});

closeButton.addEventListener("click", () => {
    dialogBox.close();
});