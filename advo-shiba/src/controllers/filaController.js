const Atendimento = require('../models/atendimento');

async function exibirFila(req, res) {
  try {
    const atendimentos = await Atendimento.find({ status: 'Aguardando atendimento' })
      .populate('advogado')
      .populate('cliente')
      .sort({ data: 1, hora: 1 });

    res.render('fila/index', { atendimentos });
  } catch (err) {
    console.error('Erro ao exibir a fila:', err);
    res.status(500).send('Erro ao exibir a fila');
  }
}

async function detalharAtendimento(req, res) {
  try {
    const atendimento = await Atendimento.findById(req.params.id)
      .populate('advogado')
      .populate('cliente');
    if (!atendimento) {
      return res.status(404).render('erro', { message: 'Atendimento não encontrado' });
    }
    res.render('fila/detalhe', { atendimento });
  } catch (err) {
    res.status(500).render('erro', { message: 'Erro ao buscar atendimento', error: err });
  }
}

async function encerrarAtendimento(req, res) {
  try {
    const { motivo } = req.body;
    await Atendimento.findByIdAndUpdate(req.params.id, {
      status: 'Atendido',
      motivoEncerramento: motivo
    });
    res.redirect('/fila');
  } catch (err) {
    res.status(500).render('erro', { message: 'Erro ao encerrar atendimento', error: err });
  }
}

async function historicoChamados(req, res) {
  try {
    const abertos = await Atendimento.find({ status: { $ne: 'Atendido' } })
      .populate('advogado')
      .populate('cliente')
      .sort({ data: 1, hora: 1 });

    const fechados = await Atendimento.find({ status: 'Atendido' })
      .populate('advogado')
      .populate('cliente')
      .sort({ data: -1, hora: -1 });

    res.render('fila/historico', { abertos, fechados });
  } catch (err) {
    res.status(500).render('erro', { message: 'Erro ao buscar histórico', error: err });
  }
}

module.exports = {
  exibirFila,
  registrarChegada: (req, res) => res.send('Função registrarChegada ainda não implementada.'),
  atualizarStatus: (req, res) => res.send('Função atualizarStatus ainda não implementada.'),
  priorizarAtendimento: (req, res) => res.send('Função priorizarAtendimento ainda não implementada.'),
  detalharAtendimento,
  encerrarAtendimento,
  historicoChamados
};
