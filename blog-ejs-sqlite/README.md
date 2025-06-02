# Blog EJS SQLite

# FEITO POR VINICIUS PEREIRA BANQUES

Este projeto é uma aplicação de blog simples desenvolvida com Node.js, Express, EJS e SQLite. Ele permite a visualização de múltiplos posts e a criação de novos posts.

## Estrutura do Projeto

```
blog-ejs-sqlite
├── views
│   ├── posts.ejs      # Página que exibe a lista de posts do blog
│   └── novo.ejs       # Formulário para criar um novo post
├── db
│   └── database.js     # Configuração do banco de dados SQLite
├── app.js              # Servidor Express
├── package.json        # Configurações do projeto
└── README.md           # Documentação do projeto
```

## Dependências

- express
- ejs
- sqlite3

## Instalação

1. Clone o repositório ou baixe os arquivos.
2. Navegue até o diretório do projeto.
3. Execute o comando para instalar as dependências:

```
npm install
```

## Uso

Para rodar o projeto, execute o seguinte comando:

```
node app.js
```

Acesse as seguintes URLs em seu navegador:

- [http://localhost:3000](http://localhost:3000) - Para visualizar a lista de posts.
- [http://localhost:3000/novo](http://localhost:3000/novo) - Para criar um novo post.

## Contribuição

Sinta-se à vontade para contribuir com melhorias ou correções.