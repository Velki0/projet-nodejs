const User = require('../sequelize/models/userModel');

const userService = {

    getUserByUsername: async (username) => {

        return await User.findOne({ where: { username: username }});

    },

    getUserByEmail: async (email) => {

        return await User.findOne({ where: { email: email }});

    },

    createUser: async (username, email, hashedPassword, role) => {

        return await User.create({ username, email, password: hashedPassword, role });

    }

};

module.exports = userService;
