const User = require('../sequelize/models/userModel');
const sequelize = require('sequelize');

const userService = {

    getUserByUsername: async (username) => {

        return await User.findOne({ where: { username: username }});

    },

    getUserByEmail: async (email) => {

        return await User.findOne({ where: { email: email }});

    },

    createUser: async (username, email, hashedPassword, role) => {

        return await User.create({ username, email, password: hashedPassword, role });

    },

    getStatsOnUsers: async () => {

        return await User.findAll({
        attributes: [
            'role',
            [sequelize.fn('COUNT', sequelize.col('id')), 'userCount']
        ],
        group: ['role'],
        raw: true,
        });

    }

};

module.exports = userService;
