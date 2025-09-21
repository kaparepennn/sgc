import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Documents from "./components/Documents";
import RegistroEmpresa from "./components/RegistroEmpresa";
import UsuariosRoles from "./components/UsuariosRoles";
import AuditoriasChecklist from "./components/AuditoriasChecklist";

export default function App() {
  const tabs = [
    { key: "dashboard", label: "Dashboard" },
    { key: "documentos", label: "Documentos" },
    { key: "registro", label: "Registro Empresas" },
    { key: "usuarios", label: "Usuarios & Roles" },
    { key: "auditorias", label: "Auditorías" }
  ];

  const [active, setActive] = useState("dashboard");
  const [currentUser, setCurrentUser] = useState(null); // usuario logueado (simulado)

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar tabs={tabs} active={active} onChange={setActive} currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <main className="flex-1 p-6">
        {active === "dashboard" && <Dashboard />}
        {active === "documentos" && <Documents />}
        {active === "registro" && <RegistroEmpresa />}
        {active === "usuarios" && <UsuariosRoles onLogin={(u)=>setCurrentUser(u)} currentUser={currentUser} />}
        {active === "auditorias" && <AuditoriasChecklist currentUser={currentUser} />}
      </main>
    </div>
  );
}
