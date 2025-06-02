const db = require('../database/db');

// Função para listar todos os agendamentos
exports.listarAgendamentos = (req, res) => {
    const query = `
        SELECT a.*, c.nome AS clienteNome, v.nome AS advogadoNome
        FROM agendamentos a
        LEFT JOIN clientes c ON a.cliente_id = c.id
        LEFT JOIN advogados v ON a.advogado_id = v.id
    `;
    db.all(query, [], (err, agendamentos) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.render('agendamentos', { agendamentos });
    });
};

// Função para criar um novo agendamento
exports.criarAgendamento = (req, res) => {
    const { cliente_id, advogado_id, data, hora, tipo, observacoes, status } = req.body;
    const query = 'INSERT INTO agendamentos (cliente_id, advogado_id, data, hora, tipo, observacoes, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.run(query, [cliente_id, advogado_id, data, hora, tipo, observacoes, status], function(err) {
        if (err) {
            return res.status(500).send('Erro ao criar agendamento');
        }
        res.redirect('/agendamentos');
    });
};

// Função para editar um agendamento existente
exports.editarAgendamento = (req, res) => {
    const { id } = req.params;
    const { cliente_id, advogado_id, data, hora, tipo, observacoes, status } = req.body;
    const query = 'UPDATE agendamentos SET cliente_id = ?, advogado_id = ?, data = ?, hora = ?, tipo = ?, observacoes = ?, status = ? WHERE id = ?';
    db.run(query, [cliente_id, advogado_id, data, hora, tipo, observacoes, status, id], function(err) {
        if (err) {
            return res.status(500).send('Erro ao editar agendamento');
        }
        res.redirect('/agendamentos');
    });
};

// Função para excluir um agendamento
exports.excluirAgendamento = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM agendamentos WHERE id = ?';
    db.run(query, [id], function(err) {
        if (err) {
            return res.status(500).send('Erro ao excluir agendamento');
        }
        res.redirect('/agendamentos');
    });
};