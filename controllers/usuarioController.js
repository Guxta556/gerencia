const Usuario = require('../models/usuariosModel');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    const { username, senha } = req.body;
    try {
        const usuario = await Usuario.findOne({ where: { username } });
        if (!usuario || !bcrypt.compareSync(senha, usuario.senha)) {
            return res.status(401).json({ message: 'Usuário ou senha inválidos' });
        }
        res.json({ message: 'Login realizado com sucesso', usuario });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.cadastrarUsuario = async (req, res) => {
    const { username, senha } = req.body;
    try {
        const hashSenha = bcrypt.hashSync(senha, 10);
        const novoUsuario = await Usuario.create({ username, senha: hashSenha });
        res.status(201).json(novoUsuario);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
