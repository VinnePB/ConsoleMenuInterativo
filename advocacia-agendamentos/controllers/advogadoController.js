const db = require('../database/db');

// Função para cadastrar um advogado
exports.cadastrarAdvogado = (req, res) => {
    const { nome, email, telefone, especialidade, disponibilidade } = req.body;
    const sql = 'INSERT INTO advogados (nome, email, telefone, especialidade, disponibilidade) VALUES (?, ?, ?, ?, ?)';
    db.run(sql, [nome, email, telefone, especialidade, disponibilidade], function(err) {
        if (err) {
            return res.status(500).send('Erro ao cadastrar advogado');
        }
        res.redirect('/advogados');
    });
};

// Função para listar todos os advogados
exports.listarAdvogados = (req, res) => {
    const sql = 'SELECT * FROM advogados';
    db.all(sql, [], (err, advogados) => {
        if (err) {
            return res.status(500).send('Erro ao listar advogados');
        }
        res.render('advogados', { advogados });
    });
};

// Função para exibir formulário de cadastro
exports.exibirFormularioCadastro = (req, res) => {
    res.render('advogados_cadastro');
};

// Função para exibir formulário de edição
exports.exibirFormularioEdicao = (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM advogados WHERE id = ?', [id], (err, advogado) => {
        if (err || !advogado) {
            return res.status(404).send('Advogado não encontrado');
        }
        res.render('advogados_editar', { advogado });
    });
};

// Função para atualizar advogado
exports.atualizarAdvogado = (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone, especialidade, disponibilidade } = req.body;
    const sql = 'UPDATE advogados SET nome = ?, email = ?, telefone = ?, especialidade = ?, disponibilidade = ? WHERE id = ?';
    db.run(sql, [nome, email, telefone, especialidade, disponibilidade, id], function(err) {
        if (err) {
            return res.status(500).send('Erro ao atualizar advogado');
        }
        res.redirect('/advogados');
    });
};

// Função para excluir advogado
exports.excluirAdvogado = (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM advogados WHERE id = ?', [id], function(err) {
        if (err) {
            return res.status(500).send('Erro ao excluir advogado');
        }
        res.redirect('/advogados');
    });
};