const memberships = [
    {
        type: 'Non Profit Membership Level',
        cost: 0,
        benefit: 'N/A',
        description: 'Designed for non-profit organizations that want to connect with the community. This membership is free of charge Simply fill out the form and we will contact you to schedule a short interview.',
    },
    {
        type: 'Bronze Membership Level',
        cost: 20,
        benefit: '1 training/month + event discounts.',
        description: 'Perfect for those starting their journey with us. Includes monthly training sessions and discounts on events.',
    },
    {
        type: 'Silver Membership Level',
        cost: 25,
        benefit: '2 trainings/month + event discounts.',
        description: 'Ideal for those who want more regular engagement and learning. Access to training sessions every 15 days and event discounts.'
    },
    {
        type: 'Gold Membership Level',
        cost: 40,
        benefit: '2 trainings/month + event discounts + homepage spotlight.',
        description: 'Our most complete plan for maximum exposure and learning. Biweekly training, event discounts, and priority spotlight on our homepage.',
    },
]

const cardsContainer = document.querySelector('#membership-cards');
const dialogBox = document.querySelector("#dialogBox");
const dialogTitle = dialogBox.querySelector("h2");
const dialogList = dialogBox.querySelector("ul");
const closeButton = dialogBox.querySelector("button");

function displayCards(data) {
    data.forEach((membership, index) => {
        const card = document.createElement("section");
        card.classList.add("membership-card");

        const title = document.createElement("h2");
        title.textContent = membership.type;

        const button = document.createElement("button");
        button.textContent = "Learn More";
        button.addEventListener("click", () => openModal(membership));

        card.appendChild(title);
        card.appendChild(button);
        cardsContainer.appendChild(card);
    });
}

function openModal(membership) {
    dialogTitle.textContent = membership.type;

    dialogList.innerHTML = ""; 

    const description = document.createElement("li");
    description.textContent = membership.description;

    const cost = document.createElement("li");
    cost.textContent = `Cost: $${membership.cost} USD/month`;

    const benefit = document.createElement("li");
    benefit.textContent = `Benefits: ${membership.benefit}`;

    dialogList.appendChild(description);
    dialogList.appendChild(cost);
    dialogList.appendChild(benefit);

    dialogBox.showModal();
}

closeButton.addEventListener("click", () => {
    dialogBox.close();
});

displayCards(memberships);