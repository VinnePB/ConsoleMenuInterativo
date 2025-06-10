const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const app = express();
const port = 3000;

// Configuração do EJS como motor de visualização
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear o corpo das requisições
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Configuração da sessão
app.use(session({
  secret: 'sua_chave_secreta',
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  res.locals.usuario = req.session.usuario;
  next();
});

// Importação das rotas
const advogadosRoutes = require('./routes/advogados');
const clientesRoutes = require('./routes/clientes');
const atendimentosRoutes = require('./routes/atendimentos');
const filaRoutes = require('./routes/fila');
const usuariosRoutes = require('./routes/usuarios'); // ADICIONE ESTA LINHA

// Uso das rotas
app.use('/advogados', advogadosRoutes);
app.use('/clientes', clientesRoutes);
app.use('/atendimentos', atendimentosRoutes);
app.use('/fila', filaRoutes);
app.use('/usuarios', usuariosRoutes); // ADICIONE ESTA LINHA

// Rota inicial
app.get('/', (req, res) => {
    res.render('inicio');
});

app.get('/usuarios/login', (req, res) => {
  res.redirect('/');
});

// Conexão com o MongoDB e só depois inicia o servidor
mongoose.connect('mongodb://127.0.0.1:27017/sistema_agendamento')
    .then(() => {
        console.log('Conectado ao MongoDB');
        app.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`);
        });
    }).catch((err) => {
        console.error('Erro ao conectar ao MongoDB:', err);
    });

// Adicione no início do app.js ou crie um seedAdmin.js
const Usuario = require('./models/usuario');

async function seedAdmin() {
  let existe = await Usuario.findOne({ nome: 'Suporte1' });
  if (!existe) {
    await Usuario.create({
      usuario: 'suporte1',
      nome: 'Suporte1',
      sobrenome: 'Administrador',
      email: 'suporte@exemplo.com',
      telefone: '11999999999',
      matricula: 'ADM001',
      senha: '@00123', // texto puro
      tipo: 'admin'
    });
    console.log('Usuário admin padrão criado!');
  } else {
    existe.usuario = 'suporte1';
    existe.sobrenome = 'Administrador';
    existe.telefone = '11999999999';
    existe.matricula = 'ADM001';
    existe.senha = '@00123'; // texto puro
    existe.tipo = 'admin';
    await existe.save();
    console.log('Senha do admin Suporte1 atualizada!');
  }
}
seedAdmin();