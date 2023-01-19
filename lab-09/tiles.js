import { removeFromLocalStorage } from './localStorage.js';
import { removeTileEvent, strRemoveSpaces } from './functions.js';
import { TilesCounter } from './tilesCounter.js';
import { createChart/*, updateChart */ } from './chart.js';

const weatherTilesCounter = new TilesCounter;

const tileContainer = document.querySelector('#tileContainer')
export const addNewWeatherTile = (weatherInfo) => {

    if (weatherTilesCounter.counter < 5) {

        weatherTilesCounter.counterIncrease();
        weatherTilesCounter.counterCheckLimit();

        const newWeatherTile = document.createElement('div');
        newWeatherTile.id = strRemoveSpaces(weatherInfo.city.name);
        newWeatherTile.classList.add('weatherTile');
        tileEventListeners(newWeatherTile);


        //generalInfo
        const generalInfo = document.createElement('div');
        generalInfo.classList.add('generalInfo');
        newWeatherTile.appendChild(generalInfo);

        const cityName = document.createElement('p');
        cityName.innerHTML = weatherInfo.city.name;
        cityName.classList.add('cityName');
        generalInfo.appendChild(cityName);

        const weatherIcon = new Image();
        const iconId = weatherInfo.list[0].weather[0].icon;
        const iconSrc = `http://openweathermap.org/img/wn/${iconId}@2x.png`
        weatherIcon.src = iconSrc;
        weatherIcon.classList.add('weatherIcon');
        generalInfo.appendChild(weatherIcon);

        const weatherTemp = document.createElement('p');
        weatherTemp.innerHTML = `${weatherInfo.list[0].main.temp}°C`;
        weatherTemp.classList.add('weatherTemp');
        generalInfo.appendChild(weatherTemp);

        const weatherHumidity = document.createElement('p');
        weatherHumidity.innerHTML = `<i class="fa-solid fa-droplet-degree"></i> ${weatherInfo.list[0].main.humidity}%`;
        weatherHumidity.classList.add('weatherHumidity');
        generalInfo.appendChild(weatherHumidity);
        //


        //detailedInfo
        const detailedInfo = document.createElement('div');
        detailedInfo.classList.add('detailedInfo');
        detailedInfo.style.display = 'none';
        newWeatherTile.appendChild(detailedInfo);

        const cityNameCopy = document.createElement('p');
        cityNameCopy.innerHTML = weatherInfo.city.name;
        cityNameCopy.classList.add('cityName');
        detailedInfo.appendChild(cityNameCopy);

        const detailedWeatherBtnContainer = document.createElement('div');
        detailedWeatherBtnContainer.classList.add('detailedWeatherBtnContainer');

        const removeTile = document.createElement('div');
        removeTile.innerHTML = '<i class="fa-solid fa-trash"></i>'
        removeTile.classList.add('removeTileBtn');
        removeTileBtnEvent(removeTile, weatherInfo.city.name);
        detailedWeatherBtnContainer.appendChild(removeTile);

        const switchToChart = document.createElement('div');
        switchToChart.innerHTML = '<i class="fa-solid fa-chart-line"></i>'
        switchToChart.classList.add('switchToChartBtn');
        switchToChartBtnEvent(switchToChart, weatherInfo.city.name);
        detailedWeatherBtnContainer.appendChild(switchToChart);

        detailedInfo.appendChild(detailedWeatherBtnContainer);

        const detailedWeatherContainer = document.createElement('div');
        detailedWeatherContainer.classList.add('detailedWeatherContainer');
        detailedInfo.appendChild(detailedWeatherContainer);

        const detailedWeather = [];
        const detailedTime = [];
        const detailedIcon = [];
        const detailedTemperature = [];
        const detailedHumidity = [];
        for (let i = 0; i < 4; i++) {

            detailedWeather[i] = document.createElement('div');
            detailedWeather[i].id = weatherInfo.city.name + i;
            detailedWeather[i].classList.add('smol');
            detailedWeatherContainer.appendChild(detailedWeather[i]);

            detailedTime[i] = document.createElement('p');
            detailedTime[i].innerHTML = weatherInfo.list[i].dt_txt.slice(-8, -3);
            detailedTime[i].classList.add('time');
            detailedWeather[i].appendChild(detailedTime[i]);

            detailedIcon[i] = new Image();
            detailedIcon[i].src = `http://openweathermap.org/img/wn/${weatherInfo.list[i].weather[0].icon}.png`;
            detailedIcon[i].classList.add('weatherIcon');
            detailedWeather[i].appendChild(detailedIcon[i]);

            detailedTemperature[i] = document.createElement('p');
            detailedTemperature[i].innerHTML = `${weatherInfo.list[i].main.temp}°C`;
            detailedTemperature[i].classList.add('weatherTemp');
            detailedWeather[i].appendChild(detailedTemperature[i]);

            detailedHumidity[i] = document.createElement('p');
            detailedHumidity[i].innerHTML = `<i class="fa-solid fa-droplet-degree"></i> ${weatherInfo.list[i].main.humidity}%`;
            detailedHumidity[i].classList.add('weatherHumidity');
            detailedWeather[i].appendChild(detailedHumidity[i]);
        }

        const detailedWeatherChart = document.createElement('canvas');
        detailedWeatherChart.style.display = 'none';
        detailedWeatherChart.classList.add('detailedWeatherChart');
        createChart(detailedWeatherChart, weatherInfo);
        detailedInfo.appendChild(detailedWeatherChart);
        //


        tileContainer.prepend(newWeatherTile);

    } else
        return console.error("You've reached the limit of weatherTiles");
}


export const updateWeatherTile = async (weatherInfo) => {

    const tileToUpdate = document.querySelector(`#${strRemoveSpaces(weatherInfo.city.name)}`);

    const generalInfo = tileToUpdate.childNodes[0];
    const weatherIcon = generalInfo.childNodes[1];
    const weatherTemp = generalInfo.childNodes[2];
    const weatherHumidity = generalInfo.childNodes[3];

    const newIconId = weatherInfo.list[0].weather[0].icon
    const newIconSrc = `http://openweathermap.org/img/wn/${newIconId}@2x.png`
    weatherIcon.src = newIconSrc;

    weatherTemp.innerHTML = `${weatherInfo.list[0].main.temp}°C`;

    weatherHumidity.innerHTML = `<i class="fa-solid fa-droplet-degree"></i> ${weatherInfo.list[0].main.humidity}%`

    // const detailedWeatherChart = document.querySelector('canvas');
    // updateChart(detailedWeatherChart, weatherInfo)
    // detailedWeatherChart.remove();

    const detailedInfo = tileToUpdate.childNodes[1].childNodes[2];

    const detailedTime = detailedInfo.querySelectorAll('.time')
    const detailedIcon = detailedInfo.querySelectorAll('.weatherIcon');
    const detailedTemperature = detailedInfo.querySelectorAll('.weatherTemp');
    const detailedHumidity = detailedInfo.querySelectorAll('.weatherHumidity');;
    for (let i = 0; i < 4; i++) {

        detailedTime[i].innerHTML = weatherInfo.list[i].dt_txt.slice(-8, -3);

        detailedIcon[i].src = `http://openweathermap.org/img/wn/${weatherInfo.list[i].weather[0].icon}.png`;

        detailedTemperature[i].innerHTML = `${weatherInfo.list[i].main.temp}°C`;

        detailedHumidity[i].innerHTML = `<i class="fa-solid fa-droplet-degree"></i> ${weatherInfo.list[i].main.humidity}%`;

    }

}

const tileEventListeners = (tile) => {
    let clicked = false;
    tile.addEventListener('click', () => {
        clicked = true;
        const generalInfo = tile.firstChild;
        const detailedInfo = tile.lastChild;
        generalInfo.style.display = 'none';
        detailedInfo.style.display = 'flex';
    });
    tile.addEventListener('mouseleave', () => {
        if (clicked) {
            clicked = false;
            const generalInfo = tile.firstChild;
            const detailedInfo = tile.lastChild;
            detailedInfo.style.display = 'none';
            generalInfo.style.display = 'flex';
        }
    });
}


const removeTileBtnEvent = (btn, city) => {
    const cityId = strRemoveSpaces(city);
    btn.addEventListener('click', () => {
        console.log('clicked', city);
        removeFromLocalStorage(city);
        removeTileEvent(cityId);
        weatherTilesCounter.counterDecrease();
        weatherTilesCounter.counterCheckLimit();
    });
}

const switchToChartBtnEvent = (btn, city) => {
    let chartVisibility = false;
    btn.addEventListener('click', () => {
        chartVisibility = !chartVisibility;
        city = strRemoveSpaces(city);
        const detailedInfo = document.querySelector(`#${city}`);
        const detailedWeatherContainer = detailedInfo.querySelector('.detailedWeatherContainer');
        const detailedWeatherChart = detailedInfo.querySelector('.detailedWeatherChart');

        if (chartVisibility) {
            detailedWeatherContainer.style.display = 'none';
            detailedWeatherChart.style.display = 'flex';
        }
        else {
            detailedWeatherContainer.style.display = 'flex';
            detailedWeatherChart.style.display = 'none';
        }
    });
}