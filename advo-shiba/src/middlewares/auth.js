const session = require('express-session');

function requireLogin(req, res, next) {
  if (!req.session || !req.session.usuario) {
    return res.redirect('/usuarios/login');
  }
  next();
}

function requireAdmin(req, res, next) {
  if (!req.session || !req.session.usuario || req.session.usuario.tipo !== 'admin') {
    return res.status(403).send('Acesso restrito');
  }
  next();
}

module.exports = { requireLogin, requireAdmin };