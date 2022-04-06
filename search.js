import {apiKey, weather, kelvin} from "./main.js"
const q = (selector) => document.querySelector(selector);
const cityEl = q('.cityName'); 
const iconEl = q('#img-container');
const descriptionEl = q('.description');
const degrees = q('#temperature'); 

let city = null;
console.log(city);

let inputName = q("#search");

inputName.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {

        event.preventDefault();

        city = inputName.value.split(" ").join("+").toLowerCase(); // qui mi vado a sostituire gli spazi con + e imposto lower case
        console.log(city);
        getSearchWeather(city);
        
    }
});

function getSearchWeather(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
    .then(function (response) {
        let data = response.json()
        return data;
    })
    .then(function (data) {
        weather.city = data.name,
        weather.main = data.weather[0].main,
        weather.description = data.weather[0].description,
        weather.temperature = data.main.temp
    })
    .then( () => {
        displayWeather()
    });
};

function displayWeather() { // assegno i valori ai tag
    cityEl.innerHTML = weather.city;
    iconEl.innerHTML = `<img class="icon" src="./icons/${weather.main}.png" alt="icona meteo"/>` // inserisce l'icona meteo
    // todayWthrEl.innerHTML = weather.main;
    descriptionEl.innerHTML = weather.description;
    degrees.innerHTML = Math.round(weather.temperature-kelvin)+" C°";
};