const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

// Exibe o formulário de cadastro
exports.formCadastro = (req, res) => {
  res.render('usuarios/cadastro');
};

// Funções de validação
function senhaForte(senha) {
  // Pelo menos 8 caracteres, 1 maiúscula, 1 minúscula, 1 número, 1 caractere especial
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(senha);
}

function emailValido(email) {
  if (!email) return true; // Opcional
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function celularValido(telefone) {
  return /^\+\d{2} \(\d{2}\) \d \d{4}-\d{4}$/.test(telefone);
}

function gerarMatricula() {
  const data = new Date();
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  const aleatorio = Math.floor(1000 + Math.random() * 9000);
  return `FUNC${ano}${mes}${dia}-${aleatorio}`;
}

// Cadastra novo usuário (apenas admin pode acessar essa rota)
exports.cadastrar = async (req, res) => {
  let { usuario, nome, sobrenome, email, telefone, senha, tipo } = req.body;
  try {
    nome = `${nome.trim()} ${sobrenome.trim()}`;
    const matricula = gerarMatricula();

    // Validações
    if (!senhaForte(senha)) {
      return res.status(400).render('usuarios/cadastro', { erro: 'A senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula, número e símbolo.' });
    }
    if (!emailValido(email)) {
      return res.status(400).render('usuarios/cadastro', { erro: 'E-mail inválido.' });
    }
    if (!celularValido(telefone)) {
      return res.status(400).render('usuarios/cadastro', { erro: 'Número de celular inválido. Exemplo: +55 (11) 9 1234-5678' });
    }

    const novoUsuario = new Usuario({ usuario, nome, sobrenome, email, telefone, matricula, senha, tipo });
    await novoUsuario.save();
    res.redirect('/usuarios/login');
  } catch (err) {
    res.status(500).render('erro', { message: 'Erro ao cadastrar usuário', error: err });
  }
};

// Exibe o formulário de login
exports.formLogin = (req, res) => {
  res.render('usuarios/login', { erro: null });
};

// Realiza login
exports.login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await Usuario.findOne({
      $or: [{ email }, { usuario: email }]
    });
    if (!usuario) {
      // Renderiza a tela de login com alerta de usuário não encontrado
      return res.status(401).render('usuarios/login', { erro: 'Usuário não encontrado.' });
    }
    const senhaCorreta = await require('bcrypt').compare(senha, usuario.senha);
    if (!senhaCorreta) {
      // Renderiza a tela de login com alerta de senha incorreta
      return res.status(401).render('usuarios/login', { erro: 'Senha incorreta.' });
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

// Lista funcionários para remoção/desativação
exports.listarFuncionariosParaRemover = async (req, res) => {
  try {
    const funcionarios = await Usuario.find({ tipo: { $ne: 'admin' } });
    res.render('usuarios/remover', { funcionarios });
  } catch (err) {
    res.status(500).render('erro', { message: 'Erro ao listar funcionários', error: err });
  }
};

// Remove funcionário
exports.removerFuncionario = async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.redirect('/usuarios/remover');
  } catch (err) {
    res.status(500).render('erro', { message: 'Erro ao remover funcionário', error: err });
  }
};

// Promove funcionário a admin
exports.promoverFuncionario = async (req, res) => {
  try {
    await Usuario.findByIdAndUpdate(req.params.id, { tipo: 'admin' });
    res.redirect('/usuarios/remover');
  } catch (err) {
    res.status(500).render('erro', { message: 'Erro ao promover funcionário', error: err });
  }
};