require("dotenv").config();
const path = require("path");
const express = require("express");
const routes = require("./routes");
const app = express();
const nunjucks = require("nunjucks");
// const { conexion } = require("./models/index");
const { conexion } = require("./models");

const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
//para recibir el dato de los formularios del body  del body
app.use(express.urlencoded({ extended: true }));
///le digo a nunjucks dónde están mis archivos
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});
app.set("view engine", "njk");

app.use(routes);

module.exports = app;

// conexion
//   .sync({ force: true })
//   .then(() => {
//     console.log(`¡Las tablas fueron creadas!`);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}!`));
