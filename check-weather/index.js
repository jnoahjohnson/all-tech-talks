#! /usr/bin/env node
const { program } = require("commander");
const checkForecast = require("./commands/checkForecast");
const checkWeather = require("./commands/checkWeather");

program
  .command("current")
  .description("Check the current weather in Orem")
  .action(checkWeather);

program
  .command("forecast")
  .description("Check the weather forecast")
  .action(checkForecast);

program.parse();
