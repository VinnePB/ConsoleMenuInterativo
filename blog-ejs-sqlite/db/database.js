const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); // usa em memória para exemplo rápido

// Cria tabela e insere dados de exemplo
db.serialize(() => {
  db.run(`CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT,
    autor TEXT,
    data TEXT,
    conteudo TEXT,
    escondido INTEGER DEFAULT 0,
    bloqueado INTEGER DEFAULT 0
  )`);

  const stmt = db.prepare("INSERT INTO posts (titulo, autor, data, conteudo) VALUES (?, ?, ?, ?)");

  stmt.run("Primeiro Post", "Ana Souza", "2025-05-10", `
    <p>Bem-vindo ao nosso blog! Aqui você encontrará dicas, novidades e tutoriais sobre tecnologia, programação e muito mais.</p>
    <ul>
      <li>Notícias do mundo tech</li>
      <li>Tutoriais semanais</li>
      <li>Dicas de carreira</li>
    </ul>
    <p>Fique ligado para não perder nada!</p>
  `);
  stmt.run("Segundo Post", "Carlos Lima", "2025-05-11", `
    <p>Hoje vamos falar sobre como usar o SQLite em projetos Node.js.</p>
    <h3>Por que usar SQLite?</h3>
    <ul>
      <li>Leve e fácil de configurar</li>
      <li>Ideal para protótipos e apps pequenos</li>
      <li>Zero dependências externas</li>
    </ul>
    <p>Experimente em seu próximo projeto!</p>
  `);
  stmt.run("Dicas de Node.js", "Beatriz Ramos", "2025-05-12", `
    <p>Confira algumas dicas para trabalhar melhor com Node.js:</p>
    <ol>
      <li>Use sempre callbacks ou Promises para evitar bloqueios.</li>
      <li>Explore o <code>async/await</code> para código mais limpo.</li>
      <li>Utilize ferramentas como nodemon para desenvolvimento.</li>
    </ol>
  `);
  stmt.run("Express para Iniciantes", "João Pedro", "2025-05-13", `
    <p>Express é um framework minimalista para Node.js. Com ele, você pode criar APIs e sites rapidamente.</p>
    <h3>Principais comandos:</h3>
    <pre>
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Olá, mundo!'));
app.listen(3000);
    </pre>
    <p>Simples assim!</p>
  `);
  stmt.run("EJS na Prática", "Marina Dias", "2025-05-14", `
    <p>EJS permite criar páginas dinâmicas facilmente:</p>
    <ul>
      <li>Inclua variáveis no HTML com <code>&lt;%= %&gt;</code></li>
      <li>Use laços e condições diretamente na view</li>
      <li>Ótimo para projetos Express</li>
    </ul>
    <p>Experimente agora mesmo!</p>
  `);
  stmt.finalize();
});

module.exports = db;