const express = require('express');
const router = express.Router();
const AdvogadosController = require('../controllers/advogadosController');
const Advogado = require('../models/advogado');
const { requireLogin, requireAdmin } = require('../middlewares/auth');

const advogadosController = new AdvogadosController(Advogado);

// Rota para exibir o formulário de cadastro (adicione esta rota ANTES da rota dinâmica)
router.get('/cadastro', (req, res) => {
  res.render('advogados/cadastro');
});

// Rota para cadastrar um advogado
router.post('/cadastro', requireAdmin, (req, res) => advogadosController.criarAdvogado(req, res));

// Rota para listar todos os advogados
router.get('/', requireLogin, (req, res) => advogadosController.listarAdvogados(req, res));

// Rota para visualizar um advogado
router.get('/:id', (req, res) => advogadosController.visualizarAdvogado(req, res));

// Rota para editar um advogado
router.put('/:id', (req, res) => advogadosController.editarAdvogado(req, res));

// Rota para excluir um advogado
router.delete('/:id', requireAdmin, (req, res) => advogadosController.deletarAdvogado(req, res));

module.exports = router;