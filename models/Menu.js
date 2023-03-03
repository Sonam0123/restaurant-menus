const {sequelize} = require('../db');
const { Sequelize, DataTypes } = require('sequelize');

// TODO - create a Menu model
const Menu = sequelize.define('menu', {
    title: DataTypes.STRING,
})

module.exports = {Menu};