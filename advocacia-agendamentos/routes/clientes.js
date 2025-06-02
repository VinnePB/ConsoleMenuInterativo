const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Rota para listar todos os clientes
router.get('/', clienteController.listarClientes);

// Rota para exibir o formulário de cadastro de cliente
router.get('/cadastro', clienteController.exibirFormularioCadastro);

// Rota para cadastrar um novo cliente
router.post('/cadastro', clienteController.cadastrarCliente);

// Rota para exibir o formulário de edição de cliente
router.get('/editar/:id', clienteController.exibirFormularioEdicao);

// Rota para editar um cliente existente
router.post('/editar/:id', clienteController.editarCliente);

// Rota para excluir um cliente
router.post('/excluir/:id', clienteController.excluirCliente);

module.exports = router;