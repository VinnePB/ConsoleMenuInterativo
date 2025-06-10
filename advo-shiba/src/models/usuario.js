const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
  usuario: { type: String, required: true, unique: true },
  nome: { type: String, required: true },
  sobrenome: { type: String, required: true },
  email: { type: String },
  telefone: { type: String, required: true },
  matricula: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  tipo: { type: String, enum: ['admin', 'funcionario'], required: true }
});

// Middleware para hashear a senha apenas se não estiver hasheada
usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('senha')) return next();
  if (!this.senha.startsWith('$2b$')) {
    this.senha = await bcrypt.hash(this.senha, 10);
  }
  next();
});

module.exports = mongoose.model('Usuario', usuarioSchema);