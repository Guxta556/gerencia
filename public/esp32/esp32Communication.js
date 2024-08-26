document.addEventListener('DOMContentLoaded', () => {
    const produtoId = 1; // Exemplo: ID do produto que queremos exibir no ESP32

    fetch(`/api/produtos/${produtoId}`)
        .then(response => response.json())
        .then(produto => {
            if (produto) {
                enviarParaESP32(produto);
            }
        })
        .catch(error => console.error('Erro ao buscar produto:', error));
});

function enviarParaESP32(produto) {
    const esp32URL = 'http://192.168.4.1/'; // Endereço IP do ESP32

    const dados = {
        nome: produto.nome,
        descricao: produto.descricao,
        preco: produto.preco,
        qtdEst: produto.qtdEst,
        status: produto.status
    };

    fetch(esp32URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.text())
    .then(data => console.log('Dados enviados para o ESP32:', data))
    .catch(error => console.error('Erro ao enviar para ESP32:', error));
}
