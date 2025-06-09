const mongoose = require('mongoose');

const advogadoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    especialidade: {
        type: String,
        required: true
    }
});

const Advogado = mongoose.model('Advogado', advogadoSchema);

module.exports = Advogado;