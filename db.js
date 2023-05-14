const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
  'tg_duga',
  'root',
  'VTp9Sabg0W3t',
  {
    host: 'master.92405e8d-1bd6-4ac9-8e0d-048f185bc952.c.dbaas.selcloud.ru',
    port: 5432,
    dialect: 'postgres',
  }
);