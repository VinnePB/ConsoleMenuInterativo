const mongoose = require('mongoose');

const atendimentoSchema = new mongoose.Schema({
    data: {
        type: Date,
        required: true
    },
    hora: {
        type: String,
        required: true
    },
    advogado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Advogado',
        required: true
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    tipoAtendimento: {
        type: String,
        enum: ['consulta inicial', 'retorno', 'audiência'],
        required: true
    },
    status: {
        type: String,
        enum: ['Aguardando atendimento', 'Em atendimento', 'Atendido'],
        default: 'Aguardando atendimento'
    },
    horarioChegada: {
        type: Date
    },
    motivoEncerramento: String,
    assunto: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Atendimento', atendimentoSchema);