import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Verifica se o nome de usuário e a senha foram preenchidos
    if (!username || !password) {
      setError("Usuário e senha são obrigatórios");
      return;
    }

    try {
      // Envia a requisição para o servidor
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      // Verifica se a resposta do servidor é bem-sucedida
      if (response.ok) {
        // Redireciona com base no cargo do usuário
        switch (data.cargo) {
          case "almoxarife":
            navigate(`/almoxarife/${data.id}`);
            break;
          case "tecnico":
            navigate(`/manutencao/tecnico/${data.id}/aceitas`);
            break;
          case "operador":
            navigate("/operador");
            break;
          case "admin":
            navigate("/admin");
            break;
          default:
            navigate("/usuario"); // Página default caso o cargo não seja reconhecido
            break;
        }
      } else {
        setError(data.message || "Login falhou");
      }
    } catch (err) {
      setError("Erro ao fazer login");
      console.error(err); // Log para facilitar depuração
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginForm;
