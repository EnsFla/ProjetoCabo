const pool = require('./pool');

module.exports = {
  async findByUsername(username) {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    return result.rows[0];
  },

  async create({ username, password, cargo }) {
    const result = await pool.query(
      "INSERT INTO users (username, password, cargo) VALUES ($1, $2, $3) RETURNING *",
      [username, password, cargo]
    );
    return result.rows[0];
  },

  async listAll() {
    const result = await pool.query("SELECT id, username, cargo FROM users");
    return result.rows;
  },

  async update(id, { username, cargo }) {
    await pool.query("UPDATE users SET username = $1, cargo = $2 WHERE id = $3", [username, cargo, id]);
  },

  async remove(id) {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
  }
};
