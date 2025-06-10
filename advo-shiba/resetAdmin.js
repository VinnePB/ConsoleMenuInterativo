const mongoose = require('mongoose');
const Usuario = require('./src/models/usuario');

async function resetAdmin() {
  await mongoose.connect('mongodb://localhost:27017/sistema_agendamento');
  await Usuario.deleteOne({ nome: 'Suporte1' });
  console.log('Usuário Suporte1 removido.');
  await mongoose.disconnect();
}

resetAdmin();