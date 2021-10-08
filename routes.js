const express = require("express");
const router = express.Router();
const pagesController = require("./controllers/pagesController");

//muestra listado de usuarios
router.get("/", pagesController.index);

//muestra formulario
router.get("/usuarios", pagesController.create);

//insertar usuario
router.post("/usuarios", pagesController.store);




module.exports = router;
