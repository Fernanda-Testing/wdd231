//Select html elements in the document
const currentTemperature = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const weatherDesc = document.querySelector('#desc');
const weatherHigh = document.querySelector('#high');
const weatherLow = document.querySelector('#low');
const weatherHumidity = document.querySelector('#humidity');
const weatherSunrise = document.querySelector('#sunrise');
const weatherSunset = document.querySelector('#sunset');

//Required variables for the url
const myKey = '7220dbb9a474f5b3c4bef9c288f01112';
const myLat = -34.91;
const myLong = -56.19;

//Construct a full path using template literals
const url = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`;

//try to grab the current weather data
const apiFetch = async () => {
    try {
        const response = await fetch(url); // Wait for the fetch to complete (obtain de response from the API)
        if (response.ok) {
            const data = await response.json(); // Wait for the response to be converted to JSON
            console.log(data); // Output the fetched data - Testing only
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error); // Handle any errors
    }
};

//Display the json data unto my web page
function displayResults(data) {

    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.setAttribute('SRC', iconsrc);
    weatherIcon.setAttribute('alt', data.weather[0].description);

    currentTemperature.innerHTML = `${data.main.temp}&deg;C`;
    weatherDesc.innerHTML = `${data.weather[0].description}`;
    weatherHigh.innerHTML = `High: ${data.main.temp_max}&deg;C`;
    weatherLow.innerHTML = `Low: ${data.main.temp_min}&deg;C`;
    weatherHumidity.innerHTML = `Humidity: ${data.main.humidity}%`;

    const sunriseTimestamp = data.sys.sunrise;
    const sunsetTimestamp = data.sys.sunset;

    const sunriseTime = new Date(sunriseTimestamp * 1000).toLocaleTimeString('es-UY', { hour: '2-digit', minute: '2-digit' });
    const sunsetTime = new Date(sunsetTimestamp * 1000).toLocaleTimeString('es-UY', { hour: '2-digit', minute: '2-digit' });

    weatherSunrise.innerHTML = `Sunrise: ${sunriseTime}`;
    weatherSunset.innerHTML = `Sunset: ${sunsetTime}`;
}

//Start the process
apiFetch();