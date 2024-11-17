// routes/empresas.js
const express = require('express');
const Empresa = require('../models/Empresa');
const router = express.Router();

// Obtener todas las empresas
router.get('/', async (req, res) => {
  try {
    const empresas = await Empresa.find();
    res.send(empresas);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Crear una nueva empresa
router.post('/', async (req, res) => {
  try {
    const empresa = new Empresa(req.body);
    await empresa.save();
    res.status(201).send(empresa);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Actualizar una empresa
router.put('/:id', async (req, res) => {
  try {
    const empresa = await Empresa.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!empresa) {
      return res.status(404).send({ message: 'Empresa no encontrada' });
    }
    res.send(empresa);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
// routes/empresas.js

// ...código existente...

// Eliminar una empresa
router.delete('/:id', async (req, res) => {
  try {
    const empresa = await Empresa.findByIdAndDelete(req.params.id);
    if (!empresa) {
      return res.status(404).send({ message: 'Empresa no encontrada' });
    }
    res.send({ message: 'Empresa eliminada' });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
