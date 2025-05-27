const usuarioModel = require('../models/usuarioModel');

exports.cadastrarUsuario = async (req, res) => {
  const { username, password, cargo } = req.body;
  const usuario = await usuarioModel.create({ username, password, cargo });
  res.status(201).json(usuario);
};

exports.listarUsuarios = async (req, res) => {
  const usuarios = await usuarioModel.listAll();
  res.json(usuarios);
};

exports.atualizarUsuario = async (req, res) => {
  const { username, cargo } = req.body;
  await usuarioModel.update(req.params.id, { username, cargo });
  res.json({ message: "Usuário atualizado" });
};

exports.removerUsuario = async (req, res) => {
  await usuarioModel.remove(req.params.id);
  res.json({ message: "Usuário removido" });
};
