const {sequelize} = require('./db')
const {Restaurant, Menu, Item} = require('./models/index')
const {
    seedRestaurant,
    seedMenu,
  } = require('./seedData');

describe('Restaurant and Menu Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    });

    test('can create a Restaurant', async () => {
        let restaurant = await Restaurant.create({
            name: 'Gorkhali',
            cuisine: 'Test Cuisine'
        });
        
        expect(restaurant.name).toEqual('Gorkhali');
    });

    test('can create a Menu', async () => {
        let menu = await Menu.create({
            title: 'Entrees'
        });
        expect(menu.title).toEqual('Entrees');
    });

    test('can find Restaurants', async () => {
        await sequelize.sync({ force: true}) //start off with a fresh table
        const addedRestaurants = await Restaurant.bulkCreate(seedRestaurant);
        const foundRestaurants = await Restaurant.findAll();
        expect(foundRestaurants.length).toEqual(addedRestaurants.length);

    });

    test('can find Menus', async () => {
        await sequelize.sync({ force: true}) //start off with a fresh table
        const addedMenus = await Menu.bulkCreate(seedMenu);
        const foundMenus = await Menu.findAll();
        expect(foundMenus.length).toEqual(addedMenus.length);
    });

    test('can delete Restaurants', async () => {
         //start off with a fresh table
        await Restaurant.bulkCreate(seedRestaurant);
        await Restaurant.destroy({where: {name: 'AppleBees'}})
        const foundRestaurantsAfterDelete = await Restaurant.findAll();
        expect(foundRestaurantsAfterDelete.length).toEqual(2);
    });

    //menus can be added to restaurants
    test('can add a Menu to a Restaurant', async () => {
        await sequelize.sync({ force: true}) //start off with a fresh table
        const addedRestaurants = await Restaurant.bulkCreate(seedRestaurant);
        const addedMenus = await Menu.bulkCreate(seedMenu);
        const foundRestaurant = await Restaurant.findOne({where: {name: 'AppleBees'}})
        const foundMenu = await Menu.findOne({where: {title: 'Breakfast'}})
        await foundRestaurant.addMenu(foundMenu)
        const foundRestaurantAfterAdd = await Restaurant.findOne({where: {name: 'AppleBees'}})
        const foundMenuAfterAdd = await Menu.findOne({where: {title: 'Breakfast'}})
        expect(foundRestaurantAfterAdd.name).toEqual('AppleBees');
        expect(foundMenuAfterAdd.title).toEqual('Breakfast');
    })


    test('can find all Menus and include their Item model', async () => {
        await sequelize.sync({ force: true}) 
        const addedRestaurants = await Restaurant.bulkCreate(seedRestaurant);
        const addedMenus = await Menu.bulkCreate(seedMenu);
        const foundMenu = await Menu.findAll({include: Item})
        console.log(foundMenu)
        expect(foundMenu.length).toEqual(3);
    })

})