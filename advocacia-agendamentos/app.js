const express = require('express');
const path = require('path');
const db = require('./database/db');
const indexRoutes = require('./routes/index');
const agendamentosRoutes = require('./routes/agendamentos');
const clientesRoutes = require('./routes/clientes');
const advogadosRoutes = require('./routes/advogados');
const filaRoutes = require('./routes/fila');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do EJS como template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear o corpo das requisições
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/', indexRoutes);
app.use('/agendamentos', agendamentosRoutes);
app.use('/clientes', clientesRoutes);
app.use('/advogados', advogadosRoutes);
app.use('/fila', filaRoutes);

// Conexão com o banco de dados
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS advogados (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL,
        telefone TEXT,
        especialidade TEXT,
        disponibilidade TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL,
        telefone TEXT,
        cpf TEXT,
        observacoes TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS agendamentos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cliente_id INTEGER,
        advogado_id INTEGER,
        data TEXT,
        hora TEXT,
        tipo TEXT,
        observacoes TEXT,
        status TEXT,
        FOREIGN KEY (cliente_id) REFERENCES clientes(id),
        FOREIGN KEY (advogado_id) REFERENCES advogados(id)
    )`);
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});