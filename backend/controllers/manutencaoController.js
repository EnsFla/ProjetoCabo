const pool = require('../models/pool');

exports.solicitarManutencao = async (req, res) => {
  const { maquina, descricao, operador_id } = req.body;

  try {
    const resultado = await pool.query(
      "INSERT INTO manutencao (maquina, descricao, operador_id, status) VALUES ($1, $2, $3, 'pendente') RETURNING *",
      [maquina, descricao, operador_id]
    );
    res.status(201).json(resultado.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Erro ao solicitar manutenção" });
  }
};

exports.listarPendentesTecnico = async (req, res) => {
  const { tecnico_id } = req.params;

  try {
    const resultado = await pool.query(
      "SELECT * FROM manutencao WHERE (tecnico_id IS NULL OR tecnico_id = $1) AND status = 'pendente'",
      [tecnico_id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: "Nenhuma solicitação pendente para este técnico" });
    }

    res.json(resultado.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Erro ao buscar solicitações" });
  }
};

exports.listarAceitasTecnico = async (req, res) => {
  const { tecnico_id } = req.params;

  try {
    const resultado = await pool.query(
      "SELECT * FROM manutencao WHERE tecnico_id = $1 AND status = 'aceita'",
      [tecnico_id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: "Nenhuma solicitação aceita para este técnico" });
    }

    res.json(resultado.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Erro ao buscar solicitações aceitas" });
  }
};

exports.aceitarSolicitacao = async (req, res) => {
  const { id } = req.params;
  const { tecnico_id } = req.body;

  try {
    const resultado = await pool.query(
      "UPDATE manutencao SET status = 'aceita', tecnico_id = $1 WHERE id = $2 AND status = 'pendente'",
      [tecnico_id, id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ error: "Solicitação não encontrada ou já aceita" });
    }

    res.json({ message: "Solicitação aceita" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Erro ao aceitar solicitação" });
  }
};

exports.concluirSolicitacao = async (req, res) => {
  const { id } = req.params;
  const { tecnico_id } = req.body;

  try {
    const resultado = await pool.query(
      "UPDATE manutencao SET status = 'concluida' WHERE id = $1 AND tecnico_id = $2",
      [id, tecnico_id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ error: "Solicitação não encontrada ou não é sua" });
    }

    res.json({ message: "Solicitação concluída" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Erro ao concluir solicitação" });
  }
};
