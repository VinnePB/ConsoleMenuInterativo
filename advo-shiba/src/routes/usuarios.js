const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.get('/cadastro', usuariosController.formCadastro);
router.post('/cadastro', usuariosController.cadastrar);
router.get('/login', usuariosController.formLogin);
router.post('/login', usuariosController.login);
router.get('/logout', usuariosController.logout);

module.exports = router;