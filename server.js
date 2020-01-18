const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

// app.use(express.static(__dirname + "/public"));
//loading bot
require("./index.js");

app.get("/", (req, res) => {
  res.json({ bot: "Pepe bot", description: "boteando ando" });
});

app.listen(port, () => {
  console.log(`Escuchando peticiones en el puerto ${port}`);
});