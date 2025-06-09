const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

// Exibe o formulário de cadastro
exports.formCadastro = (req, res) => {
  res.render('usuarios/cadastro');
};

// Cadastra novo usuário (apenas admin pode acessar essa rota)
exports.cadastrar = async (req, res) => {
  const { nome, email, senha, tipo } = req.body;
  try {
    const usuario = new Usuario({ nome, email, senha, tipo });
    await usuario.save();
    res.redirect('/usuarios/login');
  } catch (err) {
    res.status(500).render('erro', { message: 'Erro ao cadastrar usuário', error: err });
  }
};

// Exibe o formulário de login
exports.formLogin = (req, res) => {
  res.render('usuarios/login');
};

// Realiza login
exports.login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).render('erro', { message: 'Usuário não encontrado' });
    }
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).render('erro', { message: 'Senha incorreta' });
    }
    req.session.usuario = {
      _id: usuario._id,
      nome: usuario.nome,
      tipo: usuario.tipo
    };
    res.redirect('/');
  } catch (err) {
    res.status(500).render('erro', { message: 'Erro ao fazer login', error: err });
  }
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/usuarios/login');
  });
};