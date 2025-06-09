class AtendimentosController {
    constructor(atendimentoModel) {
        this.atendimentoModel = atendimentoModel;
    }

    async agendarAtendimento(req, res) {
        const { data, hora, advogado, cliente, tipoAtendimento, assunto } = req.body;
        try {
            await this.atendimentoModel.create({
                data,
                hora,
                advogado,
                cliente,
                tipoAtendimento,
                assunto, // <-- novo campo
                status: 'Aguardando atendimento'
            });
            res.redirect('/atendimentos'); // Redireciona para a listagem após cadastrar
        } catch (error) {
            res.status(500).render('erro', { message: 'Erro ao agendar atendimento', error });
        }
    }

    async registrarChegada(req, res) {
        const { atendimentoId } = req.params;
        const { horarioChegada } = req.body;
        try {
            const atendimento = await this.atendimentoModel.findById(atendimentoId);
            if (!atendimento) {
                return res.status(404).json({ message: 'Atendimento não encontrado' });
            }
            atendimento.horarioChegada = horarioChegada;
            await atendimento.save();
            res.status(200).json(atendimento);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao registrar chegada', error });
        }
    }

    async atualizarStatus(req, res) {
        const { atendimentoId } = req.params;
        const { status } = req.body;
        try {
            const atendimento = await this.atendimentoModel.findById(atendimentoId);
            if (!atendimento) {
                return res.status(404).json({ message: 'Atendimento não encontrado' });
            }
            atendimento.status = status;
            await atendimento.save();
            res.status(200).json(atendimento);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar status', error });
        }
    }

    async historicoAtendimentos(req, res) {
        const { clienteId } = req.params;
        try {
            const historico = await this.atendimentoModel.find({ cliente: clienteId }).populate('advogado');
            res.status(200).json(historico);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar histórico de atendimentos', error });
        }
    }

    async listarAtendimentos(req, res) {
        try {
            const atendimentos = await this.atendimentoModel.find().populate('advogado cliente');
            res.render('atendimentos/index', { atendimentos }); // Corrigido!
        } catch (error) {
            res.status(500).render('erro', { message: 'Erro ao listar atendimentos', error });
        }
    }

    async deletarAtendimento(req, res) {
        try {
            await this.atendimentoModel.findByIdAndDelete(req.params.id);
            res.redirect('/atendimentos');
        } catch (error) {
            res.status(500).render('erro', { message: 'Erro ao remover atendimento', error });
        }
    }
}

module.exports = AtendimentosController;