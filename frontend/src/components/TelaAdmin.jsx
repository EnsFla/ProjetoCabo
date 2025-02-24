import React, { useState, useEffect } from "react";

const TelaAdmin = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: "", password: "", cargo: "" });
  const [error, setError] = useState("");

  // Buscar todos os usuários
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/usuarios", {  // Alterado para '/usuarios'
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        setNewUser({ username: "", password: "", cargo: "" }); // Limpa o formulário
        fetchUsers(); // Atualiza a lista de usuários
      } else {
        setError("Erro ao criar o usuário.");
      }
    } catch (err) {
      setError("Erro ao criar o usuário.");
    }
  };
  
  // Carregar os usuários ao montar o componente
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Painel de Administração</h1>

      {/* Formulário para cadastrar novo usuário */}
      <form onSubmit={handleCreateUser}>
        <h2>Cadastrar Novo Usuário</h2>
        <input
          type="text"
          placeholder="Nome de usuário"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
        />
        <select
          value={newUser.cargo}
          onChange={(e) => setNewUser({ ...newUser, cargo: e.target.value })}
          required
        >
          <option value="">Selecione o Cargo</option>
          <option value="admin">Administrador</option>
          <option value="operador">Operador</option>
          <option value="tecnico">Técnico</option>
          <option value="almoxarife">Almoxarife</option>
        </select>
        <button type="submit">Cadastrar</button>
      </form>

      {/* Erro, caso aconteça */}
      {error && <p>{error}</p>}
    </div>
  );
};

export default TelaAdmin;
