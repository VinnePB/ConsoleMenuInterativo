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

// Uso das rotas
app.use('/advogados', advogadosRoutes);
app.use('/clientes', clientesRoutes);
app.use('/atendimentos', atendimentosRoutes);
app.use('/fila', filaRoutes);

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