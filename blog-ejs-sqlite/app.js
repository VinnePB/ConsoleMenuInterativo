const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./db/database');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Página inicial: lista todos os posts
app.get('/', (req, res) => {
  db.all("SELECT * FROM posts", [], (err, rows) => {
    if (err) {
      return res.status(500).send("Erro ao buscar posts.");
    }
    res.render('posts', { posts: rows });
  });
});

// Página para criar novo post
app.get('/novo', (req, res) => {
  res.render('novo', { post: null });
});

// Salvar novo post
app.post('/novo', (req, res) => {
  const { titulo, autor, data, conteudo } = req.body;
  const query = `INSERT INTO posts (titulo, autor, data, conteudo) VALUES (?, ?, ?, ?)`;
  db.run(query, [titulo, autor, data, conteudo], function (err) {
    if (err) {
      return res.status(500).send("Erro ao salvar post.");
    }
    res.redirect('/');
  });
});

// Página para editar post
app.get('/editar/:id', (req, res) => {
  db.get("SELECT * FROM posts WHERE id = ?", [req.params.id], (err, post) => {
    if (err || !post) {
      return res.status(404).send("Post não encontrado.");
    }
    res.render('novo', { post }); // Reaproveita o formulário de novo post para edição
  });
});

// Salvar edição do post
app.post('/editar/:id', (req, res) => {
  const { titulo, autor, data, conteudo } = req.body;
  const query = `UPDATE posts SET titulo = ?, autor = ?, data = ?, conteudo = ? WHERE id = ?`;
  db.run(query, [titulo, autor, data, conteudo, req.params.id], function (err) {
    if (err) {
      return res.status(500).send("Erro ao editar post.");
    }
    res.redirect('/');
  });
});

// Deletar post
app.post('/deletar/:id', (req, res) => {
  db.run("DELETE FROM posts WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).send("Erro ao deletar post.");
    res.redirect('/');
  });
});

// Visualizar post individual
app.get('/post/:id', (req, res) => {
  db.get("SELECT * FROM posts WHERE id = ?", [req.params.id], (err, post) => {
    if (err || !post) {
      return res.status(404).send("Post não encontrado.");
    }
    res.render('post', { post });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});