const usuarioModel = require('../models/usuarioModel');
const sessaoModel = require('../models/sessaoModel');
const { gerarAccessToken, gerarRefreshToken, verificarToken } = require('../tokenUtils');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const usuario = await usuarioModel.findByUsername(username);
  if (!usuario || usuario.password !== password) {
    return res.status(401).json({ error: "Usuário ou senha inválidos" });
  }

  const payload = { id: usuario.id, cargo: usuario.cargo };
  const accessToken = gerarAccessToken(payload);
  const refreshToken = gerarRefreshToken(payload);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await sessaoModel.criarSessao({
    user_id: usuario.id,
    token: refreshToken,
    ip: req.ip,
    user_agent: req.headers['user-agent'],
    expires_at: expiresAt
  });

  res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });
  res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

  res.status(200).json({ message: "Login bem-sucedido" });
};

exports.logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  await sessaoModel.removerPorToken(refreshToken);
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ message: "Logout realizado com sucesso" });
};

exports.refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const sessao = await sessaoModel.encontrarPorToken(refreshToken);
  if (!sessao) return res.status(403).json({ error: "Sessão inválida" });

  const payload = verificarToken(refreshToken);
  const novoAccessToken = gerarAccessToken(payload);

  res.cookie("accessToken", novoAccessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });
  res.json({ message: "Novo token gerado com sucesso" });
};

exports.listarSessoes = async (req, res) => {
  const sessoes = await sessaoModel.listarSessoes(req.user.id);
  res.json(sessoes);
};

exports.revogarSessao = async (req, res) => {
  const { id } = req.params;
  await sessaoModel.removerSessao(id, req.user.id);
  res.json({ message: "Sessão revogada" });
};
