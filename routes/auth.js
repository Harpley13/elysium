const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { check, validationResult } = require('express-validator');
const router = express.Router();

// Registrar usuario
router.post('/register', [
  check('username').isAlphanumeric().withMessage('Username must be alphanumeric'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.status(201).send({ message: 'Usuario registrado' });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Iniciar sesión
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const usuario = await Usuario.findOne({ username });
    if (!usuario || !await bcrypt.compare(password, usuario.password)) {
      return res.status(401).send({ message: 'Credenciales incorrectas' });
    }
    const token = jwt.sign({ id: usuario._id, role: usuario.role }, 'secretkey', { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
