# Projeto de Agendamentos de Advocacia

Este projeto é uma aplicação web para gerenciar agendamentos de atendimentos jurídicos. A aplicação permite o cadastro de advogados e clientes, agendamento de atendimentos, e registro de chegadas e atendimentos realizados.

## Estrutura do Projeto

- **public/**: Contém arquivos estáticos como CSS e JavaScript.
  - **css/style.css**: Estilos para a aplicação.
  - **js/main.js**: Scripts para interação do front-end.

- **views/**: Contém os templates EJS para renderização das páginas.
  - **partials/**: Cabeçalho e rodapé comuns a todas as páginas.
  - **index.ejs**: Página inicial da aplicação.
  - **agendamentos.ejs**: Lista de agendamentos.
  - **clientes.ejs**: Lista de clientes cadastrados.
  - **advogados.ejs**: Lista de advogados cadastrados.
  - **fila.ejs**: Fila de atendimentos.

- **database/**: Contém arquivos relacionados ao banco de dados.
  - **db.js**: Conexão com o banco de dados SQLite.
  - **init.sql**: Script SQL para criação das tabelas.

- **routes/**: Define as rotas da aplicação.
  - **index.js**: Rotas gerais.
  - **agendamentos.js**: Rotas para gerenciar agendamentos.
  - **clientes.js**: Rotas para gerenciar clientes.
  - **advogados.js**: Rotas para gerenciar advogados.

- **controllers/**: Contém a lógica de negócio da aplicação.
  - **agendamentoController.js**: Lógica para agendamentos.
  - **clienteController.js**: Lógica para clientes.
  - **advogadoController.js**: Lógica para advogados.

- **models/**: Define a estrutura dos modelos de dados.
  - **Agendamento.js**: Modelo de agendamento.
  - **Cliente.js**: Modelo de cliente.
  - **Advogado.js**: Modelo de advogado.

- **app.js**: Ponto de entrada da aplicação, configurações do servidor.
- **package.json**: Dependências e informações do projeto.

## Instalação

1. Clone o repositório:
   ```
   git clone <URL_DO_REPOSITORIO>
   ```

2. Navegue até o diretório do projeto:
   ```
   cd advocacia-agendamentos
   ```

3. Instale as dependências:
   ```
   npm install
   ```

4. Inicie o servidor:
   ```
   npm start
   ```

## Uso

Acesse a aplicação em `http://localhost:3000` e utilize as funcionalidades disponíveis para gerenciar advogados, clientes e agendamentos.