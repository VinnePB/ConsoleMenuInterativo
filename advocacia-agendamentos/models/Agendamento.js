const db = require('../database/db');

class Agendamento {
    static async create({ cliente_id, advogado_id, data, hora, tipo, observacoes, status }) {
        const query = `INSERT INTO agendamentos (cliente_id, advogado_id, data, hora, tipo, observacoes, status) 
                       VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const params = [cliente_id, advogado_id, data, hora, tipo, observacoes, status];
        return db.run(query, params);
    }

    static async findAll() {
        const query = `SELECT * FROM agendamentos`;
        return db.all(query);
    }

    static async findById(id) {
        const query = `SELECT * FROM agendamentos WHERE id = ?`;
        return db.get(query, [id]);
    }

    static async update(id, { cliente_id, advogado_id, data, hora, tipo, observacoes, status }) {
        const query = `UPDATE agendamentos SET cliente_id = ?, advogado_id = ?, data = ?, hora = ?, tipo = ?, observacoes = ?, status = ? 
                       WHERE id = ?`;
        const params = [cliente_id, advogado_id, data, hora, tipo, observacoes, status, id];
        return db.run(query, params);
    }

    static async delete(id) {
        const query = `DELETE FROM agendamentos WHERE id = ?`;
        return db.run(query, [id]);
    }
}

module.exports = Agendamento;