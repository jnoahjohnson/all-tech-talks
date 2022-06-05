const cron = require("node-cron");
const sgMail = require("@sendgrid/mail");
require("isomorphic-fetch");

sgMail.setApiKey(
  "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"
);

cron.schedule("* * * * *", () => {
  checkWeather();
});

async function sendEmail(subject, text, html) {
  const msg = {
    to: "jnoahjohnson@gmail.com",
    from: "noah@noahjohnson.dev",
    subject,
    text,
    html,
  };

  await sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent!");
    })
    .catch((error) => {
      console.log(error);
    });
}

async function checkWeather() {
  const endpoint =
    "http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/341177?apikey=Pp9AP950NzazhlL6skzhK2hQZFqWjh4z";

  let weatherData = await fetch(endpoint).then((res) => res.json());

  let averagePrecipitation =
    weatherData.reduce(
      (prev, next) => prev + next["PrecipitationProbability"],
      0
    ) / 12;

  let averageTemperature =
    weatherData.reduce((prev, next) => prev + next["Temperature"]["Value"], 0) /
    12;

  let highTemp = weatherData.reduce((prev, next) => {
    const nextTemp = next["Temperature"]["Value"];

    return prev < nextTemp ? prev : nextTemp;
  }, weatherData[0]["Temperature"]["Value"]);

  let lowTemp = weatherData.reduce((prev, next) => {
    const nextTemp = next["Temperature"]["Value"];

    return prev > nextTemp ? prev : nextTemp;
  }, weatherData[0]["Temperature"]["Value"]);

  // Data
  let htmlData = "";
  let subject;
  let text;

  if (averagePrecipitation > 10) {
    htmlData += "<p>Definitely going to rain!☔️</p>";
  } else if (averagePrecipitation > 5) {
    htmlData += "<p>It might be raining... 😬</p>";
  } else {
    htmlData += "<p>Probably won't rain. ☀️</p>";
  }

  subject = "Your Weather Data! ☁️";
  text = "I know you can't wait to see it!";

  htmlData += `<p>Low Temperature: ${lowTemp}</p>`;
  htmlData += `<p>High Temperature: ${highTemp}</p>`;
  htmlData += `<p>Average Temperature: ${averageTemperature}</p>`;

  htmlData = `<div style="font-size: 2.5rem">` + htmlData + "</div>";

  await sendEmail(subject, text, htmlData);
}
