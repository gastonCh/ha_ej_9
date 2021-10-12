const { Sequelize, Model, DataTypes } = require("sequelize");
const UserBuilder = require("./User");

const options = {
  host:process.env.DB_HOST,
  dialect:process.env.DB_CONNECTION,
  logging:false
}

if (process.env.DB_CONNECTION === "postgres") {
  options.dialectModule = require("pg"); // Necesarread-only file system, openio para que funcione en Vercel.
}

const conexion = new Sequelize(
  process.env.DB_DATABASE, // Ej: hack_academy_db
  process.env.DB_USERNAME, // Ej: root
  process.env.DB_PASSWORD, // Ej: root
  options
);

const User = UserBuilder(conexion, Model, DataTypes);

module.exports = { conexion, User };