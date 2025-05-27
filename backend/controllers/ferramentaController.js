const pool = require('../models/pool');

exports.solicitarFerramenta = async (req, res) => {
  const { usuario_id, ferramenta } = req.body;

  if (!usuario_id || !ferramenta) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes" });
  }

  try {
    const novaSolicitacao = await pool.query(
      "INSERT INTO solicitacoes_ferramentas (usuario_id, ferramenta, status) VALUES ($1, $2, 'pendente') RETURNING *",
      [usuario_id, ferramenta]
    );
    res.status(201).json(novaSolicitacao.rows[0]);
  } catch (error) {
    console.error("Erro ao solicitar ferramenta:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
};

exports.listarPorUsuario = async (req, res) => {
  const { usuario_id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM solicitacoes_ferramentas WHERE usuario_id = $1",
      [usuario_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar solicitações:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
};

exports.listarParaAlmoxarife = async (req, res) => {
  const { usuario_id } = req.params;
  try {
    const usuario = await pool.query(
      "SELECT cargo FROM users WHERE id = $1",
      [usuario_id]
    );

    if (usuario.rows.length === 0 || usuario.rows[0].cargo !== 'almoxarife') {
      return res.status(403).json({ error: "Acesso negado. Apenas almoxarifes podem visualizar essas solicitações." });
    }

    const result = await pool.query("SELECT * FROM solicitacoes_ferramentas");
    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar solicitações:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
};

exports.aceitar = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "UPDATE solicitacoes_ferramentas SET status = 'aceita' WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Solicitação não encontrada" });
    }

    res.json({ message: "Solicitação aceita com sucesso!" });
  } catch (error) {
    console.error("Erro ao aceitar solicitação:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
};

exports.rejeitar = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "UPDATE solicitacoes_ferramentas SET status = 'rejeitada' WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Solicitação não encontrada" });
    }

    res.json({ message: "Solicitação rejeitada com sucesso!" });
  } catch (error) {
    console.error("Erro ao rejeitar solicitação:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
};

exports.concluir = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "UPDATE solicitacoes_ferramentas SET status = 'concluida' WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Solicitação não encontrada" });
    }

    res.json({ message: "Solicitação concluída com sucesso!" });
  } catch (error) {
    console.error("Erro ao concluir solicitação:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
};
