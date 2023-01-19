export const createChart = (canvas, weatherInfo) => {
    const chart = canvas.getContext('2d');

    const time = [];
    const temperature = [];
    const humidity = [];
    for (let i = 0; i < 4; i++) {
        time[i] = weatherInfo.list[i].dt_txt.slice(-8, -3);
        temperature[i] = weatherInfo.list[i].main.temp;
        humidity[i] = weatherInfo.list[i].main.humidity;
    }

    new Chart(chart, {
        type: 'line',
        data: {
            labels: [`${time[0]}`, `${time[1]}`, `${time[2]}`, `${time[3]}`],
            datasets: [
                {
                    label: 'Temperature',
                    data: [`${temperature[0]}`, `${temperature[1]}`, `${temperature[2]}`, `${temperature[3]}`],
                },
                {
                    label: 'Humidity',
                    data: [`${humidity[0]}`, `${humidity[1]}`, `${humidity[2]}`, `${humidity[3]}`],
                },
            ]
        }
    });
}

// export const updateChart = (canvas, weatherInfo) => {

//     const chart = canvas.getContext('2d');
//     // const updatedChart = Chart(chart);

//     const newTime = [];
//     const newTemperature = [];
//     const newHumidity = [];
//     for (let i = 0; i < 4; i++) {
//         newTime[i] = weatherInfo.list[i].dt_txt.slice(-8, -3);
//         newTemperature[i] = weatherInfo.list[i].main.temp;
//         newHumidity[i] = weatherInfo.list[i].main.humidity;
//     }

//     console.log(chart)

//     chart['data']['labels'] = newTime
//     chart['datasets'][0]['data'] = newTemperature
//     chart['datasets'][1]['data'] = newHumidity


// }