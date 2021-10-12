const express = require("express");
const router = express.Router();
const pagesController = require("./controllers/pagesController");

//muestra formulario
router.get("/", pagesController.create);
//muestra listado de usuarios
router.get("/usuarios", pagesController.index);
//insertar usuario
router.post("/usuarios", pagesController.storeSupabase);

module.exports = router;