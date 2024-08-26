const express = require('express');
const router = express.Router();

// Defina suas rotas aqui
router.get('/', (req, res) => {
    res.send('Lista de produtos');
});

// Outras rotas de produtos

module.exports = router;
