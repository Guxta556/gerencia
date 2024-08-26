document.getElementById('formCadastro').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('/usuarios/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, senha })
        });

        if (response.ok) {
            alert('Usuário cadastrado com sucesso!');
            window.location.href = '/login';
        } else {
            alert('Erro ao cadastrar usuário.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao cadastrar usuário.');
    }
});
