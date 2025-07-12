const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

const getProphetData = async () => {
    try {
        const response = await fetch(url); // Wait for the fetch to complete
        const data = await response.json(); // Wait for the response to be converted to JSON
        //console.table(data.prophets); // Output the fetched data
        displayProphets(data.prophets);
    } catch (error) {
        console.error("Error fetching data:", error); // Handle any errors
    }
};

getProphetData(url);

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        let card = document.createElement("section");
        card.classList.add("prophet-card");

        let fullName = document.createElement("h2");

        let dateOfBirth = document.createElement("p");
        let placeOfBirth = document.createElement("p");

        let portrait = document.createElement("img");


        fullName.textContent = `${prophet.name} ${prophet.lastname}`;

        dateOfBirth.textContent = `Date of Birth: ${prophet.birthdate}`;
        placeOfBirth.textContent = `Place of Birth: ${prophet.birthplace}`;

        portrait.setAttribute("src", prophet.imageurl);
        portrait.setAttribute("alt", `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "170");
        portrait.setAttribute("height", "220");

        // Append the section(card) with the created elements

        card.appendChild(fullName);
        card.appendChild(dateOfBirth);
        card.appendChild(placeOfBirth);
        card.appendChild(portrait);

        cards.appendChild(card);

    });
}

// otra manera:
// async function getProphetData() {
//     const response = await fetch(url);
//     const data = await response.json();
//     console.table(data.prophets); // temporary testing of data response
// }

// getProphetData();