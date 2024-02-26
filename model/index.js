const { Sequelize,DataTypes,Model } = require('sequelize');


// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('emp', 'root', '', {
    host: 'localhost',
    logging:false,
    //which db we are using that we have to define in dialect
    dialect: 'mysql'
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const db = {}

db.contact = require('./contact')(sequelize, DataTypes);
db.user = require('./user')(sequelize, DataTypes,Model);
db.img = require('./image')(sequelize, DataTypes);
sequelize.sync({ alter:true });

module.exports = db;