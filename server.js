const express = require("express");
const moment = require("moment");
const app = express();

const port = process.env.PORT || 3000;

// app.use(express.static(__dirname + "/public"));
//loading bot
// require("./index.js");

setInterval(() => {
  console.log(
    "refrescando ogame a las : ",
    moment().format("MMMM Do YYYY, h:mm:ss a")
  );
}, 10000);

app.get("/", (req, res) => {
  res.json({ bot: "Pepe bot", description: "boteando ando" });
});

app.listen(port, () => {
  console.log(`Escuchando peticiones en el puerto ${port}`);
});
