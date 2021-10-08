require("dotenv").config();

const express = require("express");
const routes = require("./routes");
const nunjucks = require("nunjucks");
const PORT = 3000;
const { conexion } = require("./models/index");
const app = express();


app.use(express.static("public"));

//para recibir el dato de los formularios del body  del body
app.use(express.urlencoded({ extended: true }));

///le digo a nunjucks dónde están mis archivos
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});
app.set("view engine", "njk");

app.use(routes);

conexion
  .sync({ force: true })
  .then(() => {
    console.log(`¡Las tablas fueron creadas!`);
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}!`));
