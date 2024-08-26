document.getElementById('btnInativos').addEventListener('click', () => {
    fetch('/relatorios/inativos')
        .then(response => response.json())
        .then(data => {
            exibirRelatorio(data, 'Produtos Inativos');
        });
});

document.getElementById('btnEstoqueZerado').addEventListener('click', () => {
    fetch('/relatorios/estoque-zerado')
        .then(response => response.json())
        .then(data => {
            exibirRelatorio(data, 'Produtos com Estoque Zerado');
        });
});



document.getElementById('btnInativos').addEventListener('click', () => {
    fetch('/relatorios/inativos')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Exibir os dados na página
        })
        .catch(error => console.error('Erro ao buscar relatórios inativos:', error));
});

document.getElementById('btnZerados').addEventListener('click', () => {
    fetch('/relatorios/zerados')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Exibir os dados na página
        })
        .catch(error => console.error('Erro ao buscar relatórios zerados:', error));
});





function exibirRelatorio(produtos, titulo) {
    const relatorioDiv = document.getElementById('relatorio');
    relatorioDiv.innerHTML = `<h3>${titulo}</h3>`;
    if (produtos.length > 0) {
        let html = '<table>';
        html += '<tr><th>ID</th><th>Nome</th><th>Descrição</th><th>Qtd. em Estoque</th><th>Preço</th><th>Status</th></tr>';
        produtos.forEach(produto => {
            html += `<tr>
                        <td>${produto.id}</td>
                        <td>${produto.nome}</td>
                        <td>${produto.descricao}</td>
                        <td>${produto.qtd_est}</td>
                        <td>${produto.preco}</td>
                        <td>${produto.status}</td>
                    </tr>`;
        });
        html += '</table>';
        relatorioDiv.innerHTML += html;
    } else {
        relatorioDiv.innerHTML += '<p>Nenhum produto encontrado.</p>';
    }
}
