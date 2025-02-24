import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import TelaAdmin from "./components/TelaAdmin";
import TelaOperador from "./components/TelaOperador";
import TelaAlmoxarife from "./components/TelaAlmoxarife";
import TelaTecnico from "./components/TelaTecnico";
import TelaUsuario from "./components/TelaUsuario";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/admin" element={<TelaAdmin />} />
        <Route path="/operador" element={<TelaOperador />} />
        <Route path="/almoxarife/:almoxarife_id" element={<TelaAlmoxarife />} />
        <Route path="/manutencao/tecnico/:tecnico_id/aceitas" element={<TelaTecnico />} />
        <Route path="/usuario" element={<TelaUsuario />} />
      </Routes>
    </Router>
  );
};

export default App;
