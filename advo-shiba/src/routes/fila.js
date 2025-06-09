const express = require('express');
const router = express.Router();
const filaController = require('../controllers/filaController');

router.get('/', filaController.exibirFila);
router.post('/chegada', filaController.registrarChegada);
router.put('/atendimento/:id/status', filaController.atualizarStatus);
router.post('/priorizar/:id', filaController.priorizarAtendimento);
router.get('/:id', filaController.detalharAtendimento);
router.post('/:id/encerrar', filaController.encerrarAtendimento);
router.get('/historico', filaController.historicoChamados);

module.exports = router;