const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("primestoredb", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;