const pool = require('./pool');

module.exports = {
  async criarSessao({ user_id, token, ip, user_agent, expires_at }) {
    await pool.query(
      "INSERT INTO sessoes (user_id, token, ip, user_agent, expires_at) VALUES ($1, $2, $3, $4, $5)",
      [user_id, token, ip, user_agent, expires_at]
    );
  },

  async listarSessoes(user_id) {
    const result = await pool.query("SELECT * FROM sessoes WHERE user_id = $1", [user_id]);
    return result.rows;
  },

  async removerSessao(id, user_id) {
    await pool.query("DELETE FROM sessoes WHERE id = $1 AND user_id = $2", [id, user_id]);
  },

  async removerPorToken(refreshToken) {
    await pool.query("DELETE FROM sessoes WHERE token = $1", [refreshToken]);
  },

  async encontrarPorToken(token) {
    const result = await pool.query("SELECT * FROM sessoes WHERE token = $1", [token]);
    return result.rows[0];
  }
};
