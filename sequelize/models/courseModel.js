const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const Course = sequelize.define('Course', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    duration: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    level: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    published: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true
    },
    instructor: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
        tableName: 'Course',
        timestamps: true
});

module.exports = Course;