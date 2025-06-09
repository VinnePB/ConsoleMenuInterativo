# Sistema de Agendamento de Advocacia

Este projeto é um sistema informatizado para um escritório de advocacia moderno, projetado para organizar agendamentos e a fila de atendimento de forma eficiente, garantindo clareza, ordem e produtividade.

## Funcionalidades

- **Cadastro de Advogados e Clientes**: Permite registrar advogados e clientes com informações básicas.
- **Agendamento de Atendimentos**: Possibilita agendar atendimentos informando data, hora, advogado responsável, cliente e tipo de atendimento.
- **Controle de Chegada**: Registra o horário de chegada real do cliente ao escritório.
- **Gerenciamento da Fila**: Exibe uma fila ordenada de atendimentos por advogado, respeitando a ordem de chegada e priorizações.
- **Status do Atendimento**: Cada atendimento possui um status que pode ser "Aguardando atendimento", "Em atendimento", "Atendido", "Faltou" ou "Remarcado".
- **Registro e Histórico**: Mantém um histórico de atendimentos por cliente e advogado, permitindo visualizar atendimentos anteriores e faltas.
- **Próximo Atendimento**: Permite registrar e agendar um próximo atendimento após cada atendimento.

## Estrutura do Projeto

```
sistema-agendamento-advocacia
├── src
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── views
│   └── public
├── package.json
├── tsconfig.json
└── README.md
```

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **Express**: Framework para construção de aplicações web.
- **EJS**: Motor de template para renderização de views.
- **Bootstrap**: Framework CSS para estilização e layout responsivo.

## Instalação

1. Clone o repositório:
   ```
   git clone <URL_DO_REPOSITORIO>
   ```
2. Navegue até o diretório do projeto:
   ```
   cd sistema-agendamento-advocacia
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

Acesse a aplicação em `http://localhost:3000` e utilize as funcionalidades disponíveis para gerenciar agendamentos e atendimentos no escritório de advocacia.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.