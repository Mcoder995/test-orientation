const fs = require("node:fs");
const metiers = require("../metiers.json");

const metiersWithH1 = metiers.map((metier) => metier.h1);

console.log(metiersWithH1);
