const express = require("express");
const app = express();

const Bot = require("./classes/Bot.js");
const config = require("./config.js");
const ogameApi = require("./ogameAPI");

let start = async () => {
  const bot = new Bot();
  await bot.begin(config.environment); //indica desarrollo o produccion
  await bot.login(config.user.email, config.user.password);
  // setInterval(async () => {
  //   await bot.refreshPage();
  // }, 3000);
  // await bot.solarSystemScraping("5:332:10");
  // await bot.goToSolarSystem("5:332:10");
  // let coords = "1:43:7";
  // let activity = await bot.checkPlanetActivity(coords, "moon");
  // await bot.checkAttack();
  var playerInfo = await ogameApi.getPlayerInfo("CAFU");
  if (playerInfo) {
    await bot.hunter(playerInfo);
  }

  // async function recursiveTimeOut() {
  // // Verifica actividad del jugador cada 10 segundos (10000 milisegundos)
  //   console.log("entrando al bucle recursivo");
  //   if (playerInfo) {
  //     await bot.hunter(playerInfo);
  //   }
  //   // Recursive setTimeout:
  //   console.log("esperando 10 segundos");
  //   setTimeout(recursiveTimeOut, 10000); // <------------------
  // }
  // recursiveTimeOut();
};

start();

app.get("/", (req, res) => {
  res.json({ bot: "Pepe bot", description: "boteando ando" });
});

app.listen(config.port, () => {
  console.log(`Escuchando peticiones en el puerto ${config.port}`);
});
