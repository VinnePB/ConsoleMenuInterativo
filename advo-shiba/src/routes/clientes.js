const express = require('express');
const router = express.Router();
const ClientesController = require('../controllers/clientesController');
const Cliente = require('../models/cliente');

const clientesController = new ClientesController(Cliente);

// Rota para exibir o formulário de cadastro (adicione esta rota ANTES da rota dinâmica)
router.get('/cadastro', (req, res) => {
  res.render('clientes/cadastro');
});

// Rota para criar um novo cliente
router.post('/cadastro', (req, res) => clientesController.criarCliente(req, res));

// Rota para listar todos os clientes
router.get('/', (req, res) => clientesController.listarClientes(req, res));

// Rota para visualizar um cliente específico
router.get('/:id', (req, res) => clientesController.visualizarCliente(req, res));

// Rota para editar um cliente existente
router.put('/:id', (req, res) => clientesController.editarCliente(req, res));

// Rota para excluir um cliente
router.delete('/:id', (req, res) => clientesController.deletarCliente(req, res));

module.exports = router;