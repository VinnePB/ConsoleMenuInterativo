const db = require('../database/db');

class Cliente {
    static async findAll() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM clientes', [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    static async create({ nome, email, telefone, cpf, observacoes }) {
        return new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO clientes (nome, email, telefone, cpf, observacoes) VALUES (?, ?, ?, ?, ?)',
                [nome, email, telefone, cpf, observacoes],
                function (err) {
                    if (err) reject(err);
                    else resolve(this.lastID);
                }
            );
        });
    }

    static async update(id, { nome, email, telefone, cpf, observacoes }) {
        return new Promise((resolve, reject) => {
            db.run(
                'UPDATE clientes SET nome = ?, email = ?, telefone = ?, cpf = ?, observacoes = ? WHERE id = ?',
                [nome, email, telefone, cpf, observacoes, id],
                function (err) {
                    if (err) reject(err);
                    else resolve();
                }
            );
        });
    }

    static async delete(id) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM clientes WHERE id = ?', [id], function (err) {
                if (err) reject(err);
                else resolve();
            });
        });
    }
}

module.exports = Cliente;