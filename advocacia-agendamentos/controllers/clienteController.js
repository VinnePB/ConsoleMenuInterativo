const Cliente = require('../models/Cliente');

// Função para listar todos os clientes
exports.listarClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.render('clientes', { clientes });
    } catch (error) {
        res.status(500).send('Erro ao listar clientes');
    }
};

// Função para cadastrar um novo cliente
exports.cadastrarCliente = async (req, res) => {
    const { nome, email, telefone, cpf, observacoes } = req.body;
    try {
        await Cliente.create({ nome, email, telefone, cpf, observacoes });
        res.redirect('/clientes');
    } catch (error) {
        res.status(500).send('Erro ao cadastrar cliente');
    }
};

// Função para editar um cliente existente
exports.editarCliente = async (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone, cpf, observacoes } = req.body;
    try {
        await Cliente.update(id, { nome, email, telefone, cpf, observacoes });
        res.redirect('/clientes');
    } catch (error) {
        res.status(500).send('Erro ao editar cliente');
    }
};

// Função para excluir um cliente
exports.excluirCliente = async (req, res) => {
    const { id } = req.params;
    try {
        await Cliente.delete(id);
        res.redirect('/clientes');
    } catch (error) {
        res.status(500).send('Erro ao excluir cliente');
    }
};

// Exibir formulário de cadastro de cliente
exports.exibirFormularioCadastro = (req, res) => {
    res.render('clientes_cadastro');
};

// Exibir formulário de edição de cliente
exports.exibirFormularioEdicao = async (req, res) => {
    const { id } = req.params;
    try {
        const clientes = await Cliente.findAll();
        const cliente = clientes.find(c => c.id == id);
        if (!cliente) {
            return res.status(404).send('Cliente não encontrado');
        }
        res.render('clientes_editar', { cliente });
    } catch (error) {
        res.status(500).send('Erro ao buscar cliente');
    }
};