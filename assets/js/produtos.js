document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos();
});

async function carregarProdutos() {
    try {
        const response = await fetch('/produtos/listar');
        const produtos = await response.json();

        const listaProdutos = document.getElementById('listaProdutos');
        listaProdutos.innerHTML = '';

        produtos.forEach(produto => {
            const item = document.createElement('li');
            item.textContent = `${produto.nome} - ${produto.qtdEst} em estoque - R$ ${produto.preco.toFixed(2)}`;
            listaProdutos.appendChild(item);
        });
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

document.getElementById('formProduto').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const qtdEst = document.getElementById('qtdEst').value;
    const preco = document.getElementById('preco').value;
    const status = document.getElementById('status').checked;

    try {
        const response = await fetch('/produtos/criar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, descricao, qtdEst, preco, status })
        });

        if (response.ok) {
            alert('Produto criado com sucesso!');
            carregarProdutos();
        } else {
            alert('Erro ao criar produto.');
        }
    } catch (error) {
        console.error('Erro ao criar produto:', error);
    }
});

document.getElementById('formAtualizarProduto').addEventListener('submit', async (event) => {
    event.preventDefault();

    const produtoId = document.getElementById('produtoId').value;
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const qtdEst = document.getElementById('qtdEst').value;
    const preco = document.getElementById('preco').value;
    const status = document.getElementById('status').checked;

    try {
        const response = await fetch(`/produtos/atualizar/${produtoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, descricao, qtdEst, preco, status })
        });

        if (response.ok) {
            alert('Produto atualizado com sucesso!');
            carregarProdutos();
        } else {
            alert('Erro ao atualizar produto.');
        }
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
    }
});

document.getElementById('formDeletarProduto').addEventListener('submit', async (event) => {
    event.preventDefault();

    const produtoId = document.getElementById('produtoId').value;

    try {
        const response = await fetch(`/produtos/deletar/${produtoId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Produto deletado com sucesso!');
            carregarProdutos();
        } else {
            alert('Erro ao deletar produto.');
        }
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
    }
});
