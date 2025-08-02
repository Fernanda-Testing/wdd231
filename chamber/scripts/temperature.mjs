//Select html elements in the document
const currentTemperature = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const weatherDesc = document.querySelector('#desc');
const weatherHigh = document.querySelector('#high');
const weatherLow = document.querySelector('#low');
const weatherHumidity = document.querySelector('#humidity');
const weatherSunrise = document.querySelector('#sunrise');
const weatherSunset = document.querySelector('#sunset');
const forecastToday = document.querySelector('#today');
const forecastTomorrow = document.querySelector('#tomorrow');
const forecastAfterTomorrow = document.querySelector('#after-tomorrow');

//Required variables for the url
const myKey = '7220dbb9a474f5b3c4bef9c288f01112';
const myLat = -34.91;
const myLong = -56.19;

//Construct a full path using template literals
const url = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`;

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

//try to grab the forecast weather data
const getForecast = async () => {
    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) throw Error(await response.text());
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.log(error);
    }
};

//Display the json data unto my web page
function displayResults(data) {

    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', data.weather[0].description);

    currentTemperature.innerHTML = `<strong>${data.main.temp}&deg;C<strong>`;
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

function displayForecast(data) {
    const forecastMap = {
        today: [],
        tomorrow: [],
        afterTomorrow: []
    };

    const today = new Date();
    const day1 = today.toDateString();

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const day2 = tomorrow.toDateString();

    const afterTomorrow = new Date(today);
    afterTomorrow.setDate(today.getDate() + 2);
    const day3 = afterTomorrow.toDateString();

    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const itemDay = date.toDateString();

        if (itemDay === day1) {
            forecastMap.today.push(item);
        } else if (itemDay === day2) {
            forecastMap.tomorrow.push(item);
        } else if (itemDay === day3) {
            forecastMap.afterTomorrow.push(item);
        }
    });

    const getMiddayForecast = (dayArray) => {
        if (!dayArray || dayArray.length === 0) return null;
        return dayArray.find(item => item.dt_txt.includes("12:00:00")) || dayArray[Math.floor(dayArray.length / 2)];
    };

    const setForecast = (element, data, label) => {
        if (!data) {
            element.innerHTML = `<p>No forecast data available for ${label}</p>`;
            return;
        }

        const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        const temp = Math.round(data.main.temp);
        const desc = data.weather[0].description;

        element.innerHTML = `
        <div class="forecast-card">
            <div class="forecast-left">
                <strong>${label}</strong>
                <img src="${iconUrl}" alt="${desc}">
            </div>
            <div class="forecast-right">
                <p>${desc}</p>
                <p>${temp}&deg;C</p>
            </div>
        </div>
    `;
    };

    const todayForecast = getMiddayForecast(forecastMap.today);
    if (todayForecast) {
        setForecast(forecastToday, todayForecast, "Today");
    } else {

        const iconUrl = weatherIcon.getAttribute('src');
        const desc = weatherDesc.textContent;
        const temp = parseInt(currentTemperature.textContent) || "N/A";

        forecastToday.innerHTML = `
        <div class="forecast-card">
            <div class="forecast-left">
                <strong>Today (Current)</strong>
                <img src="${iconUrl}" alt="${desc}">
            </div>
            <div class="forecast-right">
                <p>${desc}</p>
                <p>${temp}&deg;C</p>
            </div>
        </div>
        `;
    }

    setForecast(forecastTomorrow, getMiddayForecast(forecastMap.tomorrow), "Tomorrow");
    setForecast(forecastAfterTomorrow, getMiddayForecast(forecastMap.afterTomorrow), "After Tomorrow");
}

//Start the process
apiFetch();

getForecast();