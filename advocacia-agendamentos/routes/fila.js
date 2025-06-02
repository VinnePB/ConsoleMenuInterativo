const express = require('express');
const router = express.Router();

// Exemplo de rota para a fila (ajuste conforme sua lógica)
router.get('/', (req, res) => {
    res.render('fila', { atendimentos: [] }); // Passe os dados reais depois
});

module.exports = router;