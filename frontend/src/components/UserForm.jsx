import { useState } from "react";

export default function UserForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage(`Usuário ${data.username} criado com sucesso!`);
      setUsername("");
      setPassword("");
    } else {
      setMessage(`Erro: ${data.error}`);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Criar Usuário</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Criar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

const styles = {
  container: { textAlign: "center", marginTop: "50px" },
  form: { display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" },
  input: { padding: "10px", width: "200px", fontSize: "16px" },
  button: { padding: "10px 20px", fontSize: "16px", cursor: "pointer" },
};
