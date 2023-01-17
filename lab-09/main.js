import {downloadCities, citiesList, downloadWeather} from './fetch.js';
import {TilesCounter} from './tilesCounter.js';
import {generateLocalStorageTiles} from './localStorage.js';

let weatherTilesCounter = new TilesCounter();
downloadCities();
generateLocalStorageTiles(weatherTilesCounter);

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
    console.log(searchBarInput.value);
    downloadWeather(searchBarInput.value, weatherTilesCounter);
    searchBarInput.value = '';
    searchBarList.innerHTML = '';
    searchBar.style.display = 'none';
});