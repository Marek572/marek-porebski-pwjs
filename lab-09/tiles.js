const tileContainer = document.querySelector('#tileContainer')
export const addNewWeatherTile = async (weatherInfo, weatherTilesCounter) => {

    if (weatherTilesCounter.counter < 5) {

        const newWeatherTile = document.createElement('div');
        newWeatherTile.id = weatherInfo.city.name;
        newWeatherTile.classList.add('weatherTile');
        tileEvents(newWeatherTile);


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
        weatherHumidity.innerHTML = `${weatherInfo.list[0].main.humidity}%`;
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

        const detailedWeatherContainer = document.createElement('div');
        detailedWeatherContainer.classList.add('detailedWeatherContainer');
        detailedInfo.appendChild(detailedWeatherContainer);

        const detailedWeather = [];
        const time = [];
        const icon = [];
        const temperature = [];
        const humidity = [];
        for(let i = 0; i<4; i++){

            detailedWeather[i] = document.createElement('div');
            detailedWeather[i].id = weatherInfo.city.name + i;
            detailedWeather[i].classList.add('smol');
            detailedWeatherContainer.appendChild(detailedWeather[i]);

            time[i] = document.createElement('p');
            time[i].innerHTML = weatherInfo.list[i].dt_txt.slice(-8, -3);
            time[i].classList.add('time');
            detailedWeather[i].appendChild(time[i]);

            icon[i] = new Image();
            icon[i].src = `http://openweathermap.org/img/wn/${weatherInfo.list[i].weather[0].icon}.png`;
            icon[i].classList.add('weatherIcon');
            detailedWeather[i].appendChild(icon[i]);

            temperature[i] = document.createElement('p');
            temperature[i].innerHTML = `${weatherInfo.list[i].main.temp}°C`;
            temperature[i].classList.add('weatherTemp');
            detailedWeather[i].appendChild(temperature[i]);

            humidity[i] = document.createElement('p');
            humidity[i].innerHTML = `${weatherInfo.list[i].main.humidity}%`;
            humidity[i].classList.add('weatherHumidity');
            detailedWeather[i].appendChild(humidity[i]);
        }
        //

        tileContainer.prepend(newWeatherTile);

    } else
        return console.error("You've reached the limit of weatherTiles");
}


const tileEvents = (tile) => {
    let clicked = false;
    tile.addEventListener('click', () => {
        clicked = true;
        const generalInfo = tile.firstChild;
        const detailedInfo = tile.lastChild;
        generalInfo.style.display = 'none';
        detailedInfo.style.display = 'flex';
    });
    tile.addEventListener('mouseleave', () => {
        if(clicked){
            clicked = false;
            const generalInfo = tile.firstChild;
            const detailedInfo = tile.lastChild;
            detailedInfo.style.display = 'none';
            generalInfo.style.display = 'flex';
        }
    });
}