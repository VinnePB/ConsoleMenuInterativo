const mongoose = require('mongoose');
const Advogado = require('./models/advogado');

mongoose.connect('mongodb://127.0.0.1:27017/sistema_agendamento')
  .then(async () => {
  const advogados = [
    { nome: 'João Silva', telefone: '11999999999', email: 'joao@adv.com', especialidade: 'Cível' },
    { nome: 'Maria Oliveira', telefone: '11988888888', email: 'maria@adv.com', especialidade: 'Trabalhista' },
    { nome: 'Carlos Souza', telefone: '11977777777', email: 'carlos@adv.com', especialidade: 'Penal' },
    { nome: 'Ana Paula', telefone: '11966666666', email: 'ana@adv.com', especialidade: 'Família' }
  ];

  await Advogado.deleteMany({});
  await Advogado.insertMany(advogados);

  console.log('Advogados fictícios cadastrados!');
  mongoose.disconnect();
}).catch(err => {
  console.error('Erro ao conectar ou cadastrar:', err);
});