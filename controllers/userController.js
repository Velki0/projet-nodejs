const userService = require('../services/userService');

const controller = {

    getStatsOnUsers: async (req, res) => {

        try {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(await userService.getStatsOnUsers());
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }

};

module.exports = controller;
