const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432, 
});

// Rota de teste
app.get('/', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT NOW()');
    res.json({ mensagem: 'API funcionando!', hora: resultado.rows[0] });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

app.post("/usuarios", async (req, res) => {
  const { username, password, cargo } = req.body;

  try {
    const resultado = await pool.query(
      "INSERT INTO users (username, password, cargo) VALUES ($1, $2, $3) RETURNING *",
      [username, password, cargo]
    );

    res.status(201).json(resultado.rows[0]); // Retorna o usuário criado
  } catch (erro) {
    console.error('Erro ao criar usuário:', erro.message);
    res.status(500).json({ erro: "Erro ao criar o usuário", detalhe: erro.message });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const resultado = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

    if (resultado.rows.length === 0) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    const usuario = resultado.rows[0];

    if (usuario.password !== password) {
      return res.status(400).json({ error: "Senha incorreta" });
    }

    // Se o login for bem-sucedido
    res.status(200).json({
      message: "Login bem-sucedido!",
      cargo: usuario.cargo,  // Retorna o cargo
      id: usuario.id // Retorna o ID do usuário
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao verificar login" });
  }
});

// Solicitar manutenção (Operador)
app.post("/manutencao", async (req, res) => {
  const { maquina, descricao, operador_id } = req.body;

  try {
    const resultado = await pool.query(
      "INSERT INTO manutencao (maquina, descricao, operador_id) VALUES ($1, $2, $3) RETURNING *",
      [maquina, descricao, operador_id]
    );
    res.json(resultado.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro ao solicitar manutenção");
  }
});

app.post("/manutencao", async (req, res) => {
  const { maquina, descricao, operador_id } = req.body;

  try {
    const resultado = await pool.query(
      "INSERT INTO manutencao (maquina, descricao, operador_id, status) VALUES ($1, $2, $3, 'pendente') RETURNING *",
      [maquina, descricao, operador_id]
    );
    res.json(resultado.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro ao solicitar manutenção");
  }
});

// Rota para obter as solicitações pendentes de um técnico
app.get("/manutencao/tecnico/:tecnico_id", async (req, res) => {
  const { tecnico_id } = req.params;

  try {
    const resultado = await pool.query(
      "SELECT * FROM manutencao WHERE (tecnico_id IS NULL OR tecnico_id = $1) AND status = 'pendente'", [tecnico_id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: "Nenhuma solicitação pendente encontrada para este técnico" });
    }

    res.json(resultado.rows); // Retorna as solicitações pendentes
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro ao buscar solicitações");
  }
});

// Rota para obter as solicitações aceitas de um técnico
app.get("/manutencao/tecnico/:tecnico_id/aceitas", async (req, res) => {
  const { tecnico_id } = req.params;

  try {
    const resultado = await pool.query(
      "SELECT * FROM manutencao WHERE tecnico_id = $1 AND status = 'aceita'", [tecnico_id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: "Nenhuma solicitação aceita encontrada para este técnico" });
    }

    res.json(resultado.rows); // Retorna as solicitações aceitas
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro ao buscar solicitações aceitas");
  }
});

// Rota para aceitar uma solicitação
app.put("/manutencao/:id/aceitar", async (req, res) => {
  const { id } = req.params;
  const { tecnico_id } = req.body;

  try {
    const resultado = await pool.query(
      "UPDATE manutencao SET status = 'aceita', tecnico_id = $1 WHERE id = $2 AND status = 'pendente'",
      [tecnico_id, id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).send("Solicitação não encontrada ou já foi aceita.");
    }

    res.send("Solicitação aceita!");
  } catch (err) {
    console.error("Erro ao aceitar solicitação:", err);
    res.status(500).send("Erro ao aceitar solicitação");
  }
});

// Rota para concluir uma solicitação
app.put("/manutencao/:id/concluir", async (req, res) => {
  const { id } = req.params;
  const { tecnico_id } = req.body;

  try {
    const resultado = await pool.query(
      "UPDATE manutencao SET status = 'concluida' WHERE id = $1 AND tecnico_id = $2",
      [id, tecnico_id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).send("Solicitação não encontrada ou não é sua.");
    }

    res.send("Solicitação marcada como concluída!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro ao concluir solicitação");
  }
});

app.post("/solicitacao_ferramenta", async (req, res) => {
  const { usuario_id, ferramenta } = req.body;

  if (!usuario_id || !ferramenta) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes" });
  }

  try {
    const novaSolicitacao = await pool.query(
      "INSERT INTO solicitacoes_ferramentas (usuario_id, ferramenta, status) VALUES ($1, $2, 'pendente') RETURNING *",
      [usuario_id, ferramenta]
    );
    res.json(novaSolicitacao.rows[0]);
  } catch (error) {
    console.error("Erro ao inserir solicitação:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

app.get("/solicitacao_ferramenta/usuario/:usuario_id", async (req, res) => {
  const { usuario_id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM solicitacoes_ferramentas WHERE usuario_id = $1",
      [usuario_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar solicitações:", error);
    res.status(500).json({ erro: "Erro no servidor" });
  }
});

app.put("/solicitacao_ferramenta/:id/aceitar", async (req, res) => {
  const { id } = req.params;
  console.log(`Recebida solicitação para ACEITAR o ID ${id}`);

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
});

app.put("/solicitacao_ferramenta/:id/rejeitar", async (req, res) => {
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
});

app.get("/solicitacao_ferramenta/almoxarife/:usuario_id", async (req, res) => {
  const { usuario_id } = req.params;
  try {
    // Verifica se o usuário é um almoxarife
    const usuario = await pool.query(
      "SELECT cargo FROM users WHERE id = $1",
      [usuario_id]
    );

    if (usuario.rows.length === 0 || usuario.rows[0].cargo !== 'almoxarife') {
      return res.status(403).json({ error: "Acesso negado. Apenas almoxarifes podem visualizar essas solicitações." });
    }

    // Busca as solicitações de ferramentas
    const result = await pool.query("SELECT * FROM solicitacoes_ferramentas");
    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar solicitações:", error);
    res.status(500).json({ erro: "Erro no servidor" });
  }
});

app.put("/solicitacao_ferramenta/:id/concluir", async (req, res) => {
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
});

app.listen(5000, () => console.log('🚀 Servidor rodando na porta 5000'));