module.exports = (...cargosPermitidos) => {
  return (req, res, next) => {
    if (!req.user || !cargosPermitidos.includes(req.user.cargo)) {
      return res.status(403).json({ error: "Acesso negado" });
    }
    next();
  };
};
