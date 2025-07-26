//Select html elements in the document
const currentTemperature = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

//Required variables for the url
const myKey = '7220dbb9a474f5b3c4bef9c288f01112';
const myLat = 49.75;
const myLong = 6.63;

//Construct a full path using template literals
const url = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`;

//try to grab the current weather data
const apiFetch = async () => {
    try {
        const response = await fetch(url); // Wait for the fetch to complete (obtain de response from the API)
        if (response.ok) {
            const data = await response.json(); // Wait for the response to be converted to JSON
            console.log(data); // Output the fetched data - Testing only
            displayResults(data); // uncomment when ready
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error); // Handle any errors
    }
};

//Display the json data unto my web page
function displayResults(data) { 
    currentTemperature.innerHTML = `${data.main.temp}&deg;C`; 
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('SRC', iconsrc);
    weatherIcon.setAttribute('alt', data.weather[0].description);
    captionDesc.textContent = `${desc}`;
}

//Start the process
apiFetch();
