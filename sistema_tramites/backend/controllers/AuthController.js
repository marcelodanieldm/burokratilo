// backend/controllers/AuthController.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// @desc    Login
// @route   POST /api/auth/login
const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && await user.matchPassword(password)) {
        const token = jwt.sign(
            { id: user._id, rol: user.rol },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.json({
            _id: user._id,
            nombre: user.nombre,
            email: user.email,
            rol: user.rol,
            token
        });
    } else {
        res.status(401).json({ message: 'Credenciales inválidas' });
    }
};

module.exports = { login };