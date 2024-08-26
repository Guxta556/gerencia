document.getElementById('formLogin').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('/usuarios/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, senha })
        });

        if (response.ok) {
            alert('Login realizado com sucesso!');
            window.location.href = '/produtos';
        } else {
            alert('Usuário ou senha incorretos.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao fazer login.');
    }
});
    