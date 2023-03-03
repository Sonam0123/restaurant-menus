const {sequelize} = require('../db');
const { Sequelize, DataTypes } = require('sequelize');


const Item = sequelize.define('Item', {
    price: DataTypes.INTEGER,
    vegetarian: DataTypes.BOOLEAN,
})

module.exports = {Item};