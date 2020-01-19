const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

const Bot = require("./classes/Bot.js");
const config = require("./config.js");
const ogameApi = require("./ogameAPI");

let start = async () => {
  const bot = new Bot();
  await bot.begin();
  await bot.login(config.email, config.password);
  setInterval(async () => {
    await bot.refreshPage();
  }, 3000);
  // await bot.solarSystemScraping("5:332:10");
  // await bot.goToSolarSystem("5:332:10");
  // let coords = "1:43:7";
  // let activity = await bot.checkPlanetActivity(coords, "moon");
  // await bot.checkAttack();
  // let playerInfo = await ogameApi.getPlayerInfo("Woth");
  // if (playerInfo) {
  //   await bot.hunter(playerInfo);
  // }
};

start();

app.get("/", (req, res) => {
  res.json({ bot: "Pepe bot", description: "boteando ando" });
});

app.listen(port, () => {
  console.log(`Escuchando peticiones en el puerto ${port}`);
});
