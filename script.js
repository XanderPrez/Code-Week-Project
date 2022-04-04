
/* SELETTORE */
const q = (selector) => document.querySelector(selector);

/* FUNZIONE SELECT CITY */
const selectedEl = q('.citySelector'); // seleziono il select in html

let apiKey = '1d00d4c9d5554bbb1fc814776caff71d'; // la mia chiave API

selectedEl.addEventListener('change', () => { //con questa funzione, al cambio del valore nel selettore html, modifico l'url dell'API e aggiungo la key
    let city = selectedEl.value;
    let daUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+apiKey;
    // console.log(daUrl)
});
