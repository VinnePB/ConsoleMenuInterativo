class ClientesController {
    constructor(clienteModel) {
        this.clienteModel = clienteModel;
    }

    async criarCliente(req, res) {
        const { nome, telefone, email } = req.body;
        try {
            await this.clienteModel.create({ nome, telefone, email });
            res.redirect('/clientes'); // Redireciona para a listagem após cadastrar
        } catch (error) {
            res.status(500).render('erro', { message: 'Erro ao criar cliente', error });
        }
    }

    async listarClientes(req, res) {
        try {
            const clientes = await this.clienteModel.find();
            res.render('clientes/index', { clientes }); // Corrigido!
        } catch (error) {
            res.status(500).render('erro', { message: 'Erro ao listar clientes', error });
        }
    }

    async editarCliente(req, res) {
        const { id } = req.params;
        const { nome, telefone, email } = req.body;
        try {
            const clienteAtualizado = await this.clienteModel.findByIdAndUpdate(id, { nome, telefone, email }, { new: true });
            if (!clienteAtualizado) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
            res.status(200).json(clienteAtualizado);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao editar cliente', error });
        }
    }

    async deletarCliente(req, res) {
        const { id } = req.params;
        try {
            const clienteDeletado = await this.clienteModel.findByIdAndDelete(id);
            if (!clienteDeletado) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar cliente', error });
        }
    }

    async visualizarCliente(req, res) {
        try {
            const { id } = req.params;
            const cliente = await this.clienteModel.findById(id);
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
            res.status(200).json(cliente);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar cliente', error });
        }
    }
}

module.exports = ClientesController;