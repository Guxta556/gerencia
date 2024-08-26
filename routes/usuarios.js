// routes/usuarios.js
const express = require('express');
const router = express.Router();

// Exemplo de rota para usuários
router.get('/', (req, res) => {
    res.send('Rota de usuários');
});

// Você pode adicionar mais rotas aqui

module.exports = router;
