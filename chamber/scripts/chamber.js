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



/* Grid for companies information */

// const src = "data/members.json";
// const cards = document.querySelector('#cards');

// const getCompaniesData = async () => {
//     try {
//         const response = await fetch(src); // Wait for the fetch to complete
//         const data = await response.json(); // Wait for the response to be converted to JSON
//         // Output the fetched data
//         displayCompanies(data.companies);
//     } catch (error) {
//         console.error("Error fetching data:", error); // Handle any errors
//     }
// };

// getCompanieData(src);

// const displayCompanies = (company) => {
//     companies.forEach((company) => {
//         let card = document.createElement("section");
//         card.classList.add("companie-card");

//         let name = document.createElement("h2");

//         let address = document.createElement("p");
//         let phoneNumber = document.createElement("p");

//         let photo = document.createElement("img");


//         name.textContent = `${company.name}`;

//         address.textContent = `Address: ${company.address}`;
//         phoneNumber.textContent = `Phone number: ${company.phoneNumber}`;

//         photo.setAttribute("src", company.imageurl); //rever
//         photo.setAttribute("alt", `Photo of ${company.name}`);
//         photo.setAttribute("loading", "lazy");
//         photo.setAttribute("width", "150");
//         photo.setAttribute("height", "150");

//         // Append the section(card) with the created elements

//         card.appendChild(name);
//         card.appendChild(address);
//         card.appendChild(phoneNumber);
//         card.appendChild(photo);

//         cards.appendChild(card);

//     });
// }
