const express = require('express');
const app = express();
const port = 3000;

// Middleware para arquivos estáticos (CSS)
app.use(express.static('public'));

app.set('view engine', 'ejs');

// Lista de posts
const posts = [
  {
    id: 1,
    titulo: 'Introdução ao EJS',
    autor: 'João Silva',
    data: '12 de Maio de 2025',
    conteudo: 'EJS é uma linguagem de template que permite incluir JavaScript em HTML de forma simples.'
  },
  {
    id: 2,
    titulo: 'Começando com Express',
    autor: 'Maria Oliveira',
    data: '10 de Maio de 2025',
    conteudo: 'Express é um framework minimalista para Node.js que facilita a criação de servidores web.'
  }
];

// Página inicial
app.get('/', (req, res) => {
  res.render('index', { posts });
});

// Página de post por ID
app.get('/post/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  
  if (!post) {
    return res.status(404).send('Post não encontrado');
  }

  res.render('post', { post });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
