const express = require('express');
const router = express.Router();

// Importar el controlador que maneja la lógica para el operador de almacén
const { registerItemsOut, returnItems } = require('../controllers/warehouseController');

// Ruta para registrar items que salen del almacén
router.post('/register-items-out', registerItemsOut);

// Ruta para registrar la devolución de items
router.post('/return-items', returnItems);

module.exports = router;