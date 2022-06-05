require("isomorphic-fetch");

async function checkForecast() {
  let weatherData = await fetch(
    "http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/v1/341177?apikey=Pp9AP950NzazhlL6skzhK2hQZFqWjh4z"
  ).then((res) => res.json());

  console.log(weatherData);
  weatherData = weatherData[0];

  const status = weatherData["WeatherText"];
  const temperature = weatherData["Temperature"]["Imperial"]["Value"];

  console.log("Status: ", status);
  console.log("Temperature: ", temperature);
}

module.exports = checkForecast;
