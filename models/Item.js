const {sequelize} = require('../db');
const { Sequelize } = require('sequelize');


const Item = sequelize.define('Item', {
    price: Sequelize.INTEGER,
    vegetarian: Sequelize.BOOLEAN,
})

module.exports = {Item};