const User = require('../sequelize/models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (userData) => {

    const { username, email, password, role } = userData;

    if(await User.findOne({ where: { username } })) {
        throw new Error('Le username renseigné n\'est pas disponible, il existe déjà.');
    }

    if(await User.findOne({ where: { email } })) {
        throw new Error('L\'email renseigné n\'est pas disponible, un autre compte est associé à cet email.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.create({ username, email, password: hashedPassword, role });

};

const login = async (username, password) => {

    const user = await User.findOne({ where: { username } });
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
