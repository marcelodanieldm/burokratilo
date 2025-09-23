// backend/controllers/AuthController.js

const User = require('../models/Usuario');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// @desc    Login
// @route   POST /api/auth/login
const login = async (req, res) => {
    const { email, password } = req.body;
    // Use 'username' for lookup, frontend sends 'email' as username
    const user = await User.findOne({ username: email });

    if (!user) {
        return res.status(401).json({ message: 'Usuario no encontrado' });
    }
    if (await user.comparePassword(password)) {
        const token = jwt.sign(
            { id: user._id, rol: user.rol },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.json({
            _id: user._id,
            nombre: user.nombre,
            username: user.username,
            rol: user.rol,
            token
        });
    } else {
        res.status(401).json({ message: 'Credenciales inválidas' });
    }
};

module.exports = { login };