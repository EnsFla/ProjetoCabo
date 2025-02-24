import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TelaTecnico = () => {
  const { tecnico_id } = useParams(); // Obtém o ID do técnico da URL
  const [solicitacaoFerramenta, setSolicitacaoFerramenta] = useState(""); // Armazenar a ferramenta digitada
  const [solicitacoesPendentes, setSolicitacoesPendentes] = useState([]);
  const [solicitacoesAceitas, setSolicitacoesAceitas] = useState([]);
  const [message, setMessage] = useState("");
  
  const buscarSolicitacoes = async () => {
    try {
      // Buscar solicitações de manutenção pendentes e aceitas
      const responsePendentesManutencao = await fetch(`http://localhost:5000/manutencao/tecnico/${tecnico_id}`);
      const dataPendentesManutencao = await responsePendentesManutencao.json();

      const responseAceitasManutencao = await fetch(`http://localhost:5000/manutencao/tecnico/${tecnico_id}/aceitas`);
      const dataAceitasManutencao = await responseAceitasManutencao.json();

      setSolicitacoesPendentes(dataPendentesManutencao);
      setSolicitacoesAceitas(dataAceitasManutencao);
    } catch (error) {
      console.error("Erro ao buscar as solicitações:", error);
    }
  };

  const aceitarSolicitacaoManutencao = async (solicitacaoId) => {
    try {
      const response = await fetch(`http://localhost:5000/manutencao/${solicitacaoId}/aceitar`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tecnico_id })
      });

      if (response.ok) {
        buscarSolicitacoes(); // Atualiza a lista de solicitações após aceitar
      }
    } catch (error) {
      console.error("Erro ao aceitar solicitação de manutenção:", error);
    }
  };

  const concluirSolicitacaoManutencao = async (solicitacaoId) => {
    try {
      const response = await fetch(`http://localhost:5000/manutencao/${solicitacaoId}/concluir`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tecnico_id })
      });

      if (response.ok) {
        buscarSolicitacoes(); // Atualiza a lista de solicitações após concluir
      }
    } catch (error) {
      console.error("Erro ao concluir solicitação de manutenção:", error);
    }
  };

  const solicitarFerramenta = async () => {
    if (!solicitacaoFerramenta) {
      alert("Por favor, digite o nome da ferramenta.");
      return;
    }
  
    console.log("Enviando solicitação para ferramenta:", solicitacaoFerramenta);
  
    try {
      const response = await fetch("http://localhost:5000/solicitacao_ferramenta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario_id: tecnico_id,  // Certifique-se de que tecnico_id é passado corretamente
          ferramenta: solicitacaoFerramenta,
        }),
      });
  
      const data = await response.json();  // Captura a resposta do backend
  
      if (response.ok) {
        setMessage("Solicitação de ferramenta enviada com sucesso!");
      } else {
        setMessage(data.error || "Erro ao solicitar ferramenta");
      }
    } catch (error) {
      
    }
  };

  useEffect(() => {
    console.log("ID do técnico:", tecnico_id);  // Adicione esta linha para depuração
    if (tecnico_id) {
      buscarSolicitacoes(); // Chama a função para buscar as solicitações sempre que o ID do técnico mudar
    }
  }, [tecnico_id]);
  
  return (
    <div>
      <h1>Solicitações de Manutenção</h1>
      
      <h2>Solicitações Pendentes</h2>
      <ul>
        {solicitacoesPendentes.length > 0 ? (
          solicitacoesPendentes.map(solicitacao => (
            <li key={solicitacao.id}>
              <p><strong>Máquina:</strong> {solicitacao.maquina}</p>
              <p><strong>Descrição:</strong> {solicitacao.descricao}</p>
              <button onClick={() => aceitarSolicitacaoManutencao(solicitacao.id)}>Aceitar Solicitação</button>
            </li>
          ))
        ) : (
          <p>Não há solicitações pendentes.</p>
        )}
      </ul>

      <h2>Solicitações Aceitas</h2>
      <ul>
        {solicitacoesAceitas.length > 0 ? (
          solicitacoesAceitas.map(solicitacao => (
            <li key={solicitacao.id}>
              <p><strong>Máquina:</strong> {solicitacao.maquina}</p>
              <p><strong>Descrição:</strong> {solicitacao.descricao}</p>
              <button onClick={() => concluirSolicitacaoManutencao(solicitacao.id)}>Concluir Solicitação</button>
            </li>
          ))
        ) : (
          <p>Não há solicitações aceitas.</p>
        )}
      </ul>

      <h1>Solicitação de Ferramenta</h1>
      <div>
        <label>
          Digite o nome da ferramenta:
          <input 
            type="text" 
            value={solicitacaoFerramenta} 
            onChange={(e) => setSolicitacaoFerramenta(e.target.value)} 
            placeholder="Nome da ferramenta"
          />
        </label>
        <button onClick={solicitarFerramenta}>Enviar Solicitação</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default TelaTecnico;
