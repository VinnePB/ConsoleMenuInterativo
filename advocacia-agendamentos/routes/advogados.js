const express = require('express');
const router = express.Router();
const advogadoController = require('../controllers/advogadoController');

// Rota para listar todos os advogados
router.get('/', advogadoController.listarAdvogados);

// Rota para exibir o formulário de cadastro de advogado
router.get('/cadastro', advogadoController.exibirFormularioCadastro);

// Rota para cadastrar um novo advogado
router.post('/cadastro', advogadoController.cadastrarAdvogado);

// Rota para exibir o formulário de edição de advogado
router.get('/editar/:id', advogadoController.exibirFormularioEdicao);

// Rota para atualizar os dados de um advogado
router.post('/editar/:id', advogadoController.atualizarAdvogado);

// Rota para excluir um advogado
router.post('/excluir/:id', advogadoController.excluirAdvogado);

module.exports = router;