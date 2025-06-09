class AdvogadosController {
    constructor(advogadoModel) {
        this.advogadoModel = advogadoModel;
    }

    async criarAdvogado(req, res) {
        try {
            const { nome, telefone, email, especialidade } = req.body;
            await this.advogadoModel.create({ nome, telefone, email, especialidade });
            res.redirect('/advogados'); // Redireciona para a listagem após cadastrar
        } catch (error) {
            res.status(500).render('erro', { message: 'Erro ao criar advogado', error });
        }
    }

    async listarAdvogados(req, res) {
        try {
            const advogados = await this.advogadoModel.find();
            res.render('advogados/index', { advogados }); // Corrigido!
        } catch (error) {
            console.error('Erro real ao listar advogados:', error);
            res.status(500).render('erro', { message: 'Erro ao listar advogados', error });
        }
    }

    async editarAdvogado(req, res) {
        try {
            const { id } = req.params;
            const { nome, telefone, email, especialidade } = req.body;
            const advogadoAtualizado = await this.advogadoModel.findByIdAndUpdate(id, { nome, telefone, email, especialidade }, { new: true });
            if (!advogadoAtualizado) {
                return res.status(404).json({ message: 'Advogado não encontrado' });
            }
            res.status(200).json(advogadoAtualizado);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao editar advogado', error });
        }
    }

    async deletarAdvogado(req, res) {
        try {
            await this.advogadoModel.findByIdAndDelete(req.params.id);
            res.redirect('/advogados');
        } catch (err) {
            res.status(500).send('Erro ao remover advogado');
        }
    }

    async visualizarAdvogado(req, res) {
        try {
            const { id } = req.params;
            const advogado = await this.advogadoModel.findById(id);
            if (!advogado) {
                return res.status(404).json({ message: 'Advogado não encontrado' });
            }
            res.status(200).json(advogado);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar advogado', error });
        }
    }
}

module.exports = AdvogadosController;