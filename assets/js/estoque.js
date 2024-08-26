document.getElementById('formEstoque').addEventListener('submit', async (event) => {
    event.preventDefault();

    const produtoId = document.getElementById('produtoId').value;
    const quantidade = document.getElementById('quantidade').value;
    const acao = document.querySelector('input[name="acao"]:checked').value; // 'adicionar' ou 'remover'

    try {
        const response = await fetch(`/produtos/${acao}/${produtoId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantidade })
        });

        if (response.ok) {
            alert(`Quantidade ${acao === 'adicionar' ? 'adicionada' : 'removida'} com sucesso!`);
            window.location.reload();
        } else {
            alert('Erro ao atualizar o estoque.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao atualizar o estoque.');
    }
});
