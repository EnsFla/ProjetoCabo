import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TelaAlmoxarifado = () => {
  const { almoxarife_id } = useParams(); 
  const [solicitacoesPendentes, setSolicitacoesPendentes] = useState([]);
  const [solicitacoesAceitas, setSolicitacoesAceitas] = useState([]); // ✅ Variável declarada corretamente

  const buscarSolicitacoes = async () => {
    try {
      const response = await fetch(`http://localhost:5000/solicitacao_ferramenta/almoxarife/${almoxarife_id}`);
      const data = await response.json();

      if (response.ok) {
        console.log("Solicitações recebidas:", data);
        const pendentes = data.filter(solicitacao => solicitacao.status === "pendente");
        const aceitas = data.filter(solicitacao => solicitacao.status === "aceita");

        setSolicitacoesPendentes(pendentes);
        setSolicitacoesAceitas(aceitas); // ✅ Atualizando o estado corretamente
      } else {
        console.error("Erro ao buscar as solicitações:", data.erro);
      }
    } catch (error) {
      console.error("Erro ao buscar as solicitações de ferramenta:", error);
    }
  };

  const atualizarSolicitacao = async (solicitacaoId, status) => {
    try {
      const url = status === "aceita"
        ? `http://localhost:5000/solicitacao_ferramenta/${solicitacaoId}/aceitar`
        : status === "rejeitada"
        ? `http://localhost:5000/solicitacao_ferramenta/${solicitacaoId}/rejeitar`
        : status === "concluida"
        ? `http://localhost:5000/solicitacao_ferramenta/${solicitacaoId}/concluir`
        : null;

      if (!url) {
        console.error("Status inválido:", status);
        return;
      }

      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario_id: almoxarife_id }),
      });

      if (response.ok) {
        buscarSolicitacoes(); // Atualiza a lista após a conclusão
      } else {
        const data = await response.json();
        console.error("Erro ao atualizar solicitação:", data.erro);
      }
    } catch (error) {
      console.error("Erro ao atualizar solicitação de ferramenta:", error);
    }
  };

  useEffect(() => {
    buscarSolicitacoes();
  }, [almoxarife_id]);

  return (
    <div>
      <h1>Solicitações de Ferramentas</h1>

      <h2>Solicitações Pendentes</h2>
      <ul>
        {solicitacoesPendentes.length > 0 ? (
          solicitacoesPendentes.map((solicitacao) => (
            <li key={solicitacao.id}>
              <p><strong>Ferramenta:</strong> {solicitacao.ferramenta}</p>
              <p><strong>Solicitado por:</strong> Técnico ID {solicitacao.usuario_id}</p>
              <button onClick={() => atualizarSolicitacao(solicitacao.id, "aceita")}>Aceitar</button>
              <button onClick={() => atualizarSolicitacao(solicitacao.id, "rejeitada")}>Rejeitar</button>
            </li>
          ))
        ) : (
          <p>Não há solicitações pendentes.</p>
        )}
      </ul>

      <h2>Solicitações Aceitas</h2>
      <ul>
        {solicitacoesAceitas.length > 0 ? (
          solicitacoesAceitas.map((solicitacao) => (
            <li key={solicitacao.id}>
              <p><strong>Ferramenta:</strong> {solicitacao.ferramenta}</p>
              <p><strong>Solicitado por:</strong> Técnico ID {solicitacao.usuario_id}</p>
              <button onClick={() => atualizarSolicitacao(solicitacao.id, "concluida")}>Concluir</button>
            </li>
          ))
        ) : (
          <p>Não há solicitações aceitas.</p>
        )}
      </ul>
    </div>
  );
};

export default TelaAlmoxarifado;
