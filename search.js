import {q, cityEl, descriptionEl, degrees, iconEl, apiKey, weather, kelvin} from "./main.js"

let city = null;

const paProvince = [
    "alia",
    "alimena",
    "aliminusa",
    "altavilla milicia",
    "altofonte",
    "bagheria",
    "balestrate",
    "baucina",
    "belmonte mezzagno",
    "bisacquino",
    "blufi",
    "bolognetta",
    "bompietro",
    "borgetto",
    "caccamo",
    "caltavuturo",
    "campofelice di fitalia",
    "campofelice di roccella",
    "campofiorito",
    "camporeale",
    "capaci",
    "castelbuono",
    "casteldaccia",
    "castellana sicula",
    "castronovo di sicilia",
    "carini",
    "cefalà diana",
    "cefalù",
    "cerda",
    "chiusa sclafani",
    "ciminna",
    "cinisi",
    "collesano",
    "contessa entellina",
    "corleone",
    "ficarazzi",
    "gangi",
    "geraci siculo",
    "giardinello",
    "giuliana",
    "godrano",
    "gratteri",
    "isnello",
    "isola delle femmine",
    "lascari",
    "lercara friddi",
    "marineo",
    "mezzojuso",
    "misilmeri",
    "montelepre",
    "montemaggiore belsito",
    "monreale",
    "palazzo adriano",
    "palermo",
    "partinico",
    "petralia soprana",
    "petralia sottana",
    "piana degli albanesi",
    "polizzi generosa",
    "pollina",
    "prizzi",
    "roccamena",
    "roccapalumba",
    "san cipirello",
    "san giuseppe jato",
    "san mauro castelverde",
    "santa cristina gela",
    "santa flavia",
    "sclafani bagni",
    "sciara",
    "scillato",
    "termini imerese",
    "terrasini",
    "torretta",
    "trabia",
    "trappeto",
    "ustica",
    "valledolmo",
    "ventimiglia di sicilia",
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
            inputName.value = "";
        } else {
            alert("Il nome inserito non corrisponde a nessun comune della provincia di Palermo")
            inputName.value = "";
        }
        
        
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

function displayWeather() {
    cityEl.innerHTML = weather.city;
    iconEl.innerHTML = `<img class="icon" src="./icons/${weather.main}.png" alt="icona meteo"/>` 
    descriptionEl.innerHTML = weather.description;
    degrees.innerHTML = Math.round(weather.temperature-kelvin)+" C°";
};