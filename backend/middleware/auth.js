const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'chave_super_secreta';

module.exports = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ error: "Token não fornecido" });

  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    return res.status(403).json({ error: "Token inválido ou expirado" });
  }
};
