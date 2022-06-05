const express = require("express");
const cors = require("cors");
var request = require("request");

const app = express();

app.use(cors());

const emojis = ["🦄", "🌈", "✨", "👋", "🌎"];

app.get("/", (req, res) => {
  console.log(emojis);
  res.json({
    message: "🦄✨👋🌎🌈",
  });
});

app.get("/random", (req, res) => {
  res.json({
    message: emojis[Math.floor(Math.random() * emojis.length)],
  });
});

app.get("/directors", (req, res) => {
  var options = {
    method: "GET",
    url: "https://blessed-midge-55.hasura.app/api/rest/directors?director=%25Dennis%25",
    headers: {
      "x-hasura-admin-secret":
        "Qr20qXtubrpPc6J4ubrbOErEQLXMvIrW5fAD0zSmlu2032H7UnruUd0dgmW9hm21",
    },
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);

    res.json({
      message: response.body,
    });
  });
});

app.listen("3000", () => {});
