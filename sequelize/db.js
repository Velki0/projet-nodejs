const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection réussi à la base de données.');
        require('./models/associations');
        await sequelize.sync({ alter: true });
        console.log('Synchro réussi en BdD.');
    } catch (error) {
        console.error('Problème de connection avec la BdD : ', error);
    }
};

module.exports = { sequelize, connectDB };