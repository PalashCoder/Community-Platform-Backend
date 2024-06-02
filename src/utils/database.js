const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize("newdb", "postgres", "palash", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
