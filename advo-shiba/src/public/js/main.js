// main.js - Este arquivo contém o código JavaScript para interatividade na aplicação.

document.addEventListener('DOMContentLoaded', function() {
    // Exemplo de código para manipulação de eventos e interatividade
    const formAgendamento = document.getElementById('form-agendamento');
    
    if (formAgendamento) {
        formAgendamento.addEventListener('submit', function(event) {
            event.preventDefault();
            // Lógica para agendar atendimento
            const dataHora = document.getElementById('data-hora').value;
            const advogado = document.getElementById('advogado').value;
            const cliente = document.getElementById('cliente').value;
            const tipoAtendimento = document.getElementById('tipo-atendimento').value;

            // Aqui você pode fazer uma requisição para o servidor para agendar o atendimento
            console.log(`Agendando atendimento: ${dataHora}, Advogado: ${advogado}, Cliente: ${cliente}, Tipo: ${tipoAtendimento}`);
        });
    }

    // Exemplo de código para atualizar a fila de atendimentos
    const atualizarFila = () => {
        // Lógica para buscar e atualizar a fila de atendimentos
        console.log('Atualizando fila de atendimentos...');
        // Aqui você pode fazer uma requisição para o servidor para obter a fila atualizada
    };

    // Chama a função para atualizar a fila a cada 5 segundos
    setInterval(atualizarFila, 5000);
});