const Produto = require('../models/produtosModel');

exports.listarProdutos = async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.json(produtos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.criarProduto = async (req, res) => {
    const { nome, descricao, qtdEst, preco, status } = req.body;
    try {
        const novoProduto = await Produto.create({ nome, descricao, qtdEst, preco, status });
        res.status(201).json(novoProduto);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.atualizarProduto = async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, qtdEst, preco, status } = req.body;
    try {
        const produto = await Produto.findByPk(id);
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        await produto.update({ nome, descricao, qtdEst, preco, status });
        res.json(produto);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deletarProduto = async (req, res) => {
    const { id } = req.params;
    try {
        const produto = await Produto.findByPk(id);
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        await produto.destroy();
        res.json({ message: 'Produto deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
