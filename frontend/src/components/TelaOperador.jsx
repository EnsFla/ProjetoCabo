import React, { useState } from "react";

const TelaOperador = () => {
  const [maquina, setMaquina] = useState("");
  const [descricao, setDescricao] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/manutencao", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ maquina, descricao, operador_id: 1 })  // Operador_id deve ser o ID do operador logado
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("Solicitação de manutenção enviada com sucesso!");
    } else {
      setMessage(data.error || "Erro ao solicitar manutenção");
    }
  };

  return (
    <div>
      <h2>Solicitar Manutenção</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Máquina:
          <input
            type="text"
            value={maquina}
            onChange={(e) => setMaquina(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Descrição:
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Solicitar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default TelaOperador;
