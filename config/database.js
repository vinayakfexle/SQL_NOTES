const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sql_notes', 'root', '@Vasu001', {
  host: 'localhost', 
  dialect: 'mysql', 
  logging: false 
});

module.exports = sequelize;
