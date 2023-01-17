import { addNewWeatherTile } from "./tiles.js";
import { addToLocalStorage, localStorageContains } from "./localStorage.js";

export let citiesList = [];
export const downloadCities = async () => {
    const response = await fetch('https://countriesnow.space/api/v0.1/countries/population/cities');
    const data = await response.json();

    data.data.forEach((e) => {
        citiesList.push(e.city);
    });
}

export const downloadWeather = async (city, weatherTilesCounter, tileFromSearch = true) => {
    //TODO: funkcja z usuwaniem nawiasow --> washington (dc) --> washington
    const weatherApiKey = 'fc5403d4e2c34014d016cb54168a0c0b';
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherApiKey}&units=metric`;
    await fetch(weatherApiUrl)
        .then((response) => {
            if (response.ok)
                return response.json();
            return Promise.reject(response);
        })
        .then((responseJson) => {
            if (tileFromSearch === true && localStorageContains(responseJson.city.name))
                return Promise.reject(responseJson.city.name+' already added to local storage');
            if (tileFromSearch === true) {
                addToLocalStorage(responseJson.city.name);
            }
            addNewWeatherTile(responseJson, weatherTilesCounter);
            weatherTilesCounter.counterIncrease();
            weatherTilesCounter.counterCheckLimit();
        })
        .catch((response) => {
            alert("Something went wrong...")
            console.error(response);
        });
}


//TODO: co3h updateWeather (in main.js foreach weatherTile downloadWeather)