const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamentoController');

// Rota para listar agendamentos
router.get('/', agendamentoController.listarAgendamentos);

// Rota para criar um novo agendamento
router.post('/criar', agendamentoController.criarAgendamento);

// Rota para editar um agendamento existente
router.post('/editar/:id', agendamentoController.editarAgendamento);

// Rota para excluir um agendamento
router.post('/excluir/:id', agendamentoController.excluirAgendamento);

// Rota para exibir o formulário de novo agendamento
router.get('/new', (req, res) => {
    // Você pode buscar clientes e advogados para popular selects, se quiser
    res.render('agendamentos_novo');
});

module.exports = router;