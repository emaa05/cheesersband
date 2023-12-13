const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { secretKey } = require('../cryptoGenerator');

console.log('Secret Key1:', secretKey);

const UserController = {
  register: async (req, res) => {
    try {
      const { name, lastName, email, password } = req.body;

      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'La contraseña debe tener al menos 6 caracteres',
        });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: 'El usuario ya existe' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        lastName,
        email,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();

      res.status(200).json({ success: true, user: savedUser });
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
        details: error.message,
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body || {};

      if (!email || !password) {
        return res
          .status(400)
          .json({ success: false, message: 'Se requieren email y contraseña' });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: 'Credenciales inválidas' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res
          .status(401)
          .json({ success: false, message: 'Credenciales inválidas' });
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        secretKey,
        { expiresIn: '1h' }
      );

      res.status(200).json({ success: true, user, token });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
  },

  getUserInfo: async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const decodedToken = jwt.verify(token, secretKey);
      const userId = decodedToken.userId;

      const userInfo = await User.findById(userId);

      if (!userInfo) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      res.status(200).json({ user: userInfo });
    } catch (error) {
      console.error('Error al obtener información del usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
  
  logout: async (req, res) => {
    try {
      res.status(200).json({ success: true, message: 'Sesión cerrada exitosamente' });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
  },
};

module.exports = UserController;