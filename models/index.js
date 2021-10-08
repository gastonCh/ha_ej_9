const { Sequelize, Model, DataTypes } = require("sequelize");
const UserBuilder = require("./User");


const conexion = new Sequelize(
  process.env.DB_DATABASE, // Ej: hack_academy_db
  process.env.DB_USERNAME, // Ej: root
  process.env.DB_PASSWORD, // Ej: root
  {
    host: process.env.DB_HOST, // Ej: 127.0.0.1
    dialect: process.env.DB_CONNECTION, // Ej: mysql
    logging: false,
  }
);

const User = UserBuilder(conexion, Model, DataTypes);

module.exports = { conexion, User };


