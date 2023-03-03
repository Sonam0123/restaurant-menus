const {Restaurant} = require('./Restaurant')
const {Menu} = require('./Menu')
const {Item} = require('./Item')

//- Multiple items can be added to a menu.
// - Items can be added to many menus
// - Add another test to account for the association

Item.belongsToMany(Menu, {through: 'MenuItems'})
Menu.belongsToMany(Item, {through: 'MenuItems'})
Restaurant.hasMany(Menu)
Menu.belongsTo(Restaurant)

module.exports = { Restaurant, Menu, Item }
