const authService = require('../services/authService');

const authController = {

    register: async (req, res) => {

        try {
            const user = await authService.register(req.body);
            res.status(201).json({ message: 'Utilisateur créé avec succès', user: { id: user.id, username: user.username, email: user.email } });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    
    },

    login: async (req, res) => {

        try {
            const { username, password } = req.body;
            const { user, token } = await authService.login(username, password);
            res.status(200).json({ message: 'Connexion réussie', token, user: { id: user.id, username: user.username } });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }

    }

};

module.exports = authController;
