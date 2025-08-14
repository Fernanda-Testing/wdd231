import { places } from "../data/places.mjs";    
console.log(places)

const showHere = document.querySelector("#allplaces")

function displayItems(places) { 
    places.forEach(x => {
        const thecard = document.createElement('div')
        const thephoto = document.createElement('img')
        thephoto.src = `images/${x.photo_url}`
        thephoto.alt = x.name
        thecard.appendChild(thephoto)
        const thetitle = document.createElement('h2')
        thetitle.innerText = x.name
        thecard.appendChild(thetitle)
        const theadress = document.createElement('address')
        theadress.innerText = x.address
        thecard.appendChild(theadress)
        const thedesc = document.createElement('p')
        thedesc.innerText = x.description
        thecard.appendChild(thedesc)

        showHere.appendChild(thecard)
    });
}

displayItems(places)