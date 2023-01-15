let weatherTilesCounter = 0;

const checkWeatherTiles = () => {
    if (weatherTilesCounter === 5)
        addTileBtn.style.display = 'none';
}

const downloadWeather = async (city) => {
    const weatherApiKey = 'fc5403d4e2c34014d016cb54168a0c0b';
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherApiKey}&units=metric`;
    await fetch(weatherApiUrl)
        .then((response) => {
            if(response.ok)
                return response.json();
            return Promise.reject(response);
        })
        .then((responseJson) => {
            addNewWeatherTile(responseJson);
            weatherTilesCounter++;
            checkWeatherTiles();
        })
        .catch((response) => {
            console.error(response);
        });
}


const tileContainer = document.querySelector('#tileContainer')
const addNewWeatherTile = async (weatherInfo) => {

    if (weatherTilesCounter < 5) {

        const newWeatherTile = document.createElement('div');
        newWeatherTile.id = weatherInfo.city.name;
        newWeatherTile.classList.add('weatherTile');

        const infoContainer = document.createElement('div');
        infoContainer.classList.add('infoContainer');
        newWeatherTile.appendChild(infoContainer);

        const cityName = document.createElement('p');
        cityName.innerHTML = weatherInfo.city.name;
        cityName.classList.add('cityName');
        infoContainer.appendChild(cityName);

        const weatherIcon = new Image();
        const iconId = weatherInfo.list[0].weather[0].icon;
        const iconSrc = `http://openweathermap.org/img/wn/${iconId}@2x.png`
        weatherIcon.src = iconSrc;
        weatherIcon.classList.add('weatherIcon');
        infoContainer.appendChild(weatherIcon);

        const weatherTemp = document.createElement('p');
        weatherTemp.innerHTML = `${weatherInfo.list[0].main.temp}°C`;
        weatherTemp.classList.add('weatherTemp');
        infoContainer.appendChild(weatherTemp);

        const weatherHumidity = document.createElement('p');
        weatherHumidity.innerHTML = `${weatherInfo.list[0].main.humidity}%`;
        weatherHumidity.classList.add('weatherHumidity');
        infoContainer.appendChild(weatherHumidity);


        tileContainer.prepend(newWeatherTile);

    } else
        return console.error("You've reached the limit of weatherTiles");
}


let citiesList = [];
const downloadCities = async () => {
    const response = await fetch('https://countriesnow.space/api/v0.1/countries/population/cities');
    const data = await response.json();

    data.data.forEach((e) => {
        citiesList.push(e.city);
    });
}
downloadCities();


const addTileBtn = document.querySelector('#addTileBtn');
const searchBar = document.querySelector('#searchBarContainer');

let searchBarDisplay = false;
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
    downloadWeather(searchBarInput.value);
    searchBarInput.value = '';
    searchBarList.innerHTML = '';
    searchBar.style.display = 'none';
});

