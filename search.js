import {q, cityEl, descriptionEl, degrees, iconEl, apiKey, weather, kelvin} from "./main.js"

/* VARIABLES */
let latitude = 0.0;
let longitude = 0.0;
let city = null;
const notificationEl = q(".error")

const paProvince = [
    "alia",
    "alimena",
    "aliminusa",
    "altavilla+milicia",
    "altofonte",
    "bagheria",
    "balestrate",
    "baucina",
    "belmonte+mezzagno",
    "bisacquino",
    "blufi",
    "bolognetta",
    "bompietro",
    "borgetto",
    "caccamo",
    "caltavuturo",
    "campofelice+di+fitalia",
    "campofelice+di+roccella",
    "campofiorito",
    "camporeale",
    "capaci",
    "castelbuono",
    "casteldaccia",
    "castellana+sicula",
    "castronovo+di+sicilia",
    "carini",
    "cefalà+diana",
    "cefalù",
    "cerda",
    "chiusa+sclafani",
    "ciminna",
    "cinisi",
    "collesano",
    "contessa+entellina",
    "corleone",
    "ficarazzi",
    "gangi",
    "geraci+siculo",
    "giardinello",
    "giuliana",
    "godrano",
    "gratteri",
    "isnello",
    "isola+delle+femmine",
    "lascari",
    "lercara+friddi",
    "marineo",
    "mezzojuso",
    "misilmeri",
    "montelepre",
    "montemaggiore+belsito",
    "monreale",
    "palazzo+adriano",
    "palermo",
    "partinico",
    "petralia+soprana",
    "petralia+sottana",
    "piana degli albanesi",
    "polizzi+generosa",
    "pollina",
    "prizzi",
    "roccamena",
    "roccapalumba",
    "san+cipirello",
    "san+giuseppe+jato",
    "san+mauro+castelverde",
    "santa+cristina gela",
    "santa+flavia",
    "sclafani+bagni",
    "sciara",
    "scillato",
    "termini+imerese",
    "terrasini",
    "torretta",
    "trabia",
    "trappeto",
    "ustica",
    "valledolmo",
    "ventimiglia+di+sicilia",
    "vicari",
    "villabate",
    "villafrati"
]

let inputName = q("#search");

/* SEARCH BAR EVENT */
inputName.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {

        event.preventDefault();

        city = inputName.value.split(" ").join("+").toLowerCase(); // qui mi vado a sostituire gli spazi con + e imposto lower case

        if (paProvince.some(x => x === city)) {
            getSearchWeather(city)
            inputName.value = null;
        } else {
            alert("Il nome inserito non corrisponde a nessun comune della provincia di Palermo")
            inputName.value = null;
        }
        
        
    }
});

/* GEOLOCATION TOOL */

if ("geolocation" in navigator) { // condizione se if true, funziona e mi rimanda ad una delle due funzioni;  
    navigator.geolocation.getCurrentPosition(getPosition, showError)
} else { // else, non applicabile al browser e parte un messaggio.
    notificationEl.style.display = 'block';
    notificationEl.innerHTML = `<p>This Browser doesn't support geolocation</p>`;
};

function getPosition(position) { // da qui ottengo i dati posizione
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    getLocWeather(latitude, longitude);
};

descriptionEl.addEventListener("load", (event) => { // avvio il processo al load della pagina
    getLocWeather(latitude, longitude);
});

function showError(error) { // questa funzione si avvia al blocco del permesso
    notificationEl.style.display = 'block';
    notificationEl.innerHTML = `<p> ${error.message} </p>`;
};

function getLocWeather(latitude, longitude) { // utilizzo i valori lat e long e li inserisco nella fetch per poi passarli alla funzione card render
    let apiUrl =  `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&&lon=${longitude}&appid=${apiKey}`;

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

/*--------------------------------------------*/

/* SEARCH FETCH */

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

/* CARD RENDER */

function displayWeather() {
    cityEl.innerHTML = weather.city;
    iconEl.innerHTML = `<img class="icon" src="./icons/${weather.main}.png" alt="icona meteo"/>` 
    descriptionEl.innerHTML = weather.description;
    descriptionEl.classList.add("fontItalic");
    degrees.innerHTML = Math.round(weather.temperature-kelvin)+" C°";
};