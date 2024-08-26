const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');

// Configuração para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'assets')));


//rotas
const produtosRoutes = require('./routes/produtos');
const usuariosRoutes = require('./routes/usuarios');

// conserto bug
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'segredo_seguranca',    
    resave: false,
    saveUninitialized: true,
}));

//banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'sistema_gestao'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados MySQL.');
});

app.use('/produtos', produtosRoutes);
app.use('/usuarios', usuariosRoutes);

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            req.session.loggedin = true;
            req.session.username = username;
            res.redirect('/dashboard');
        } else {
            res.send('Usuário ou senha incorretos!');
        }
    });
});

//usuário
app.post('/cadastro', (req, res) => {
    const { username, password } = req.body;
    const query = 'INSERT INTO usuarios (username, password) VALUES (?, ?)';
    db.query(query, [username, password], (err, result) => {
        if (err) throw err;
        res.send('Usuário cadastrado com sucesso!');
    });
});

// dashboard
app.get('/dashboard', (req, res) => {
    if (req.session.loggedin) {
        res.send(`Bem-vindo, ${req.session.username}!`);
    } else {
        res.send('Por favor, faça login para acessar essa página.');
    }
});

//produtos
app.post('/produtos', (req, res) => {
    const { nome, descricao, qtd_est, preco, status } = req.body;
    const query = 'INSERT INTO produtos (nome, descricao, qtd_est, preco, status) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [nome, descricao, qtd_est, preco, status], (err, result) => {
        if (err) throw err;
        res.send('Produto cadastrado com sucesso!');
    });
});

//todos os produtos
app.get('/produtos', (req, res) => {
    const query = 'SELECT * FROM produtos';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Atualizar um produto
app.put('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, descricao, qtd_est, preco, status } = req.body;
    const query = 'UPDATE produtos SET nome = ?, descricao = ?, qtd_est = ?, preco = ?, status = ? WHERE id = ?';
    db.query(query, [nome, descricao, qtd_est, preco, status, id], (err, result) => {
        if (err) throw err;
        res.send('Produto atualizado com sucesso!');
    });
});

// Deletar um produto
app.delete('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM produtos WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) throw err;
        res.send('Produto deletado com sucesso!');
    });
});

// Adicionar quantidade ao estoque
app.post('/produtos/adicionar/:id', (req, res) => {
    const { id } = req.params;
    const { qtd } = req.body;
    const query = 'UPDATE produtos SET qtd_est = qtd_est + ? WHERE id = ?';
    db.query(query, [qtd, id], (err, result) => {
        if (err) throw err;
        res.send('Quantidade adicionada ao estoque com sucesso!');
    });
});

// Remover quantidade do estoque
app.post('/produtos/remover/:id', (req, res) => {
    const { id } = req.params;
    const { qtd } = req.body;
    const query = 'UPDATE produtos SET qtd_est = qtd_est - ? WHERE id = ?';
    db.query(query, [qtd, id], (err, result) => {
        if (err) throw err;
        res.send('Quantidade removida do estoque com sucesso!');
    });
});

// Relatório de produtos inativos
app.get('/relatorios/inativos', (req, res) => {
    const query = 'SELECT * FROM produtos WHERE status = "inativo"';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Todos os produtos
app.get('/produtos', (req, res) => {
    const query = 'SELECT * FROM produtos';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results); // Retorna os produtos em formato JSON
    });
});



// Relatório de produtos com estoque zerado
app.get('/relatorios/estoque-zerado', (req, res) => {
    const query = 'SELECT * FROM produtos WHERE qtd_est = 0';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Endpoint para ESP32 buscar informações de produto
app.get('/produto/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT nome, descricao, qtd_est, preco FROM produtos WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).send('Produto não encontrado');
        }
    });
});


// Roteamento
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/cadastro.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'cadastro.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/produtos.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'produtos.html'));
});

app.get('/relatorio.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'relatorio.html'));
});




// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000.');
});
