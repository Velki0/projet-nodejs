const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const Category = sequelize.define('Category', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    }
}, {
        tableName: 'Category',
        timestamps: true
});

module.exports = Category;