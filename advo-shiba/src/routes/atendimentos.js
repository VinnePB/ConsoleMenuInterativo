const express = require('express');
const router = express.Router();
const AtendimentosController = require('../controllers/atendimentosController');
const Atendimento = require('../models/atendimento');
const Advogado = require('../models/advogado');
const Cliente = require('../models/cliente');

const atendimentosController = new AtendimentosController(Atendimento);

router.post('/agendar', (req, res) => atendimentosController.agendarAtendimento(req, res));
router.post('/chegada/:atendimentoId', (req, res) => atendimentosController.registrarChegada(req, res));
router.get('/', (req, res) => atendimentosController.listarAtendimentos(req, res));
router.get('/historico/:clienteId', (req, res) => atendimentosController.historicoAtendimentos(req, res));
router.put('/status/:atendimentoId', (req, res) => atendimentosController.atualizarStatus(req, res));
router.delete('/:id', (req, res) => atendimentosController.deletarAtendimento(req, res));

// Rota para exibir o formulário de agendamento
router.get('/agendar', async (req, res) => {
  const advogados = await Advogado.find();
  const clientes = await Cliente.find();
  res.render('atendimentos/agendar', { advogados, clientes });
});

module.exports = router;