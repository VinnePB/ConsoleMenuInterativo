class Advogado {
    constructor(nome, email, telefone, especialidade, disponibilidade) {
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.especialidade = especialidade;
        this.disponibilidade = disponibilidade || [];
    }

    // Método para salvar o advogado no banco de dados
    async save(db) {
        const query = `INSERT INTO advogados (nome, email, telefone, especialidade, disponibilidade) VALUES (?, ?, ?, ?, ?)`;
        const params = [this.nome, this.email, this.telefone, this.especialidade, JSON.stringify(this.disponibilidade)];
        await db.run(query, params);
    }

    // Método para atualizar os dados do advogado
    async update(db, id) {
        const query = `UPDATE advogados SET nome = ?, email = ?, telefone = ?, especialidade = ?, disponibilidade = ? WHERE id = ?`;
        const params = [this.nome, this.email, this.telefone, this.especialidade, JSON.stringify(this.disponibilidade), id];
        await db.run(query, params);
    }

    // Método para excluir o advogado
    static async delete(db, id) {
        const query = `DELETE FROM advogados WHERE id = ?`;
        await db.run(query, [id]);
    }

    // Método para buscar todos os advogados
    static async findAll(db) {
        const query = `SELECT * FROM advogados`;
        return await db.all(query);
    }

    // Método para buscar um advogado pelo ID
    static async findById(db, id) {
        const query = `SELECT * FROM advogados WHERE id = ?`;
        return await db.get(query, [id]);
    }
}

module.exports = Advogado;