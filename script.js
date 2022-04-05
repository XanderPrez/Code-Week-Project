
/* SELETTORI */
const q = (selector) => document.querySelector(selector);

const selectedEl = q('.citySelector'); // seleziono il select in html
const cityEl = q('.cityName'); // seleziono l'elemento città nella card
const todayWthrEl = q('.todayWeather'); // seleziono il meteo odierno
const descriptionEl = q('.description'); // seleziono la descrizione meteo


/* FUNZIONE SELECT CITY */
let apiKey = '1d00d4c9d5554bbb1fc814776caff71d'; // la mia chiave API

const weather = {};

selectedEl.addEventListener('change', () => { //con questa funzione, al cambio del valore nel selettore html, modifico l'url dell'API e aggiungo la key
    
    let city = selectedEl.value;
    let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+apiKey;
    console.log(apiUrl);
    fetch(apiUrl)
    .then(function (response) {
        let data = response.json();
        return data;
    })
    .then(function(data) {
        weather.city = data.name,
        weather.main = data.weather[0].main,
        weather.description = data.weather[0].description
    })
    .then(() => displayWeather());
});

function displayWeather() {
    cityEl.innerHTML = weather.city;
    todayWthrEl.innerHTML = weather.main;
    descriptionEl.innerHTML = weather.description;
};


