import { downloadWeather, updateWeather } from './fetch.js';
import { removeTileEvent } from './functions.js';

const praseLocalStorage = () => {
    const localStorageCities = localStorage.getItem('cities');
    if (localStorageCities === null) {
        localStorage.setItem('cities', JSON.stringify([]));
        return;
    }
    const parsedCities = JSON.parse(localStorageCities);

    return parsedCities;
}
let parsedCities = praseLocalStorage();

const updateLocalStorage = () => {
    localStorage.setItem('cities', JSON.stringify(parsedCities));
}

export const addToLocalStorage = (city) => {
    parsedCities.push(city);
    updateLocalStorage();
}

export const removeFromLocalStorage = (city) => {
    const cityId = parsedCities.indexOf(city);
    if (cityId === -1) return console.error(city + ' not found in local storage');
    parsedCities.splice(cityId, 1);
    updateLocalStorage();
}

export const generateLocalStorageTiles = () => {
    if (parsedCities.length > 0) {
        parsedCities.forEach((city) => {
            downloadWeather(city, false);
        });
    }
}

export const localStorageContains = (city) => {
    const cityId = parsedCities.indexOf(city);
    if (cityId !== -1) return true;
    else return false;
}

export const updateWeatherInterval = () => {
    if (parsedCities.length > 0) {
        setInterval(() => {
            console.log('updateWeatherInterval')
            parsedCities.forEach((city) => {
                updateWeather(city);
            });
        }, 300000);
    }
}