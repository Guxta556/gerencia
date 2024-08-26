document.addEventListener('DOMContentLoaded', () => {
    // Função para atualizar as estatísticas
    function atualizarEstatisticas() {
        fetch('/produtos')
            .then(response => response.json())
            .then(data => {
                const totalProdutos = data.length; // Conta a quantidade de produtos
                document.getElementById('total-produtos').textContent = totalProdutos;
            })
            .catch(error => console.error('Erro ao buscar dados dos produtos:', error));
    }

    // Chama a função para atualizar as estatísticas ao carregar a página
    atualizarEstatisticas();
});
