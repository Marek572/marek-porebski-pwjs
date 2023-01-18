import { downloadCities, citiesList, downloadWeather } from './fetch.js';
import { generateLocalStorageTiles, updateWeatherInterval } from './localStorage.js';
import { cityNameRemoveBrackets } from './functions.js';

downloadCities();
generateLocalStorageTiles();
updateWeatherInterval();


const addTileBtn = document.querySelector('#addTileBtn');
const searchBar = document.querySelector('#searchBarContainer');

//czy powinno tak byc ze jak klikniesz to mozesz potem kliknac znowu?
// let searchBarDisplay = false;
addTileBtn.addEventListener('click', () => {
    searchBar.style.display = 'flex';
});


const searchBarInput = document.querySelector('#searchBarInput')
const searchBarList = document.querySelector('#searchBarList')

searchBarInput.addEventListener('keyup', () => {
    searchBarList.innerHTML = '';
    citiesList.forEach((city) => {
        if (city.toLowerCase().startsWith(searchBarInput.value.toLowerCase()) && searchBarInput.value != '') {
            let cityListItem = document.createElement("li");
            cityListItem.addEventListener('click', () => {
                searchBarInput.value = city;
            });
            cityListItem.innerHTML = `${city}`
            searchBarList.appendChild(cityListItem);
        }
    });
});


const searchBarBtn = document.querySelector('#searchBarBtn');
searchBarBtn.addEventListener('click', () => {
    const city = cityNameRemoveBrackets(searchBarInput.value);
    downloadWeather(city);
    searchBarInput.value = '';
    searchBarList.innerHTML = '';
    searchBar.style.display = 'none';
});