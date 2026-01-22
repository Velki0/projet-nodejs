const userService = require('./userService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (userData) => {

    const { username, email, password, role } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    return await userService.createUser(username, email, hashedPassword, role);

};

const login = async (username, password) => {

    const user = await userService.getUserByUsername(username);
    if (!user) {
        throw new Error('Le username est incorrect !');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Le mot de passe est incorrect.');
    }

    const token = jwt.sign(
        { userId: user.id, username: user.username, role: user.role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    );

    return { user, token };

};

module.exports = { register, login };
