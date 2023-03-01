const {sequelize} = require('../db');
const {DataTypes, Sequelize } = require('sequelize');

// TODO - create a Restaurant model
const Restaurant = sequelize.define('restaurant', {
    name : DataTypes.STRING,
    location: DataTypes.STRING,
    cuisine: DataTypes.STRING
})
module.exports = {Restaurant};