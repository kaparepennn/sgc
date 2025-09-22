import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Documents from "./components/Documents";
import RegistroEmpresa from "./components/RegistroEmpresa";
import UsuariosRoles from "./components/UsuariosRoles";
import Capacitacion from "./components/Capacitacion";
import AuditoriasChecklist from "./components/AuditoriasChecklist";
import Login from "./components/Login";
import Header from "./components/Header";

function App() {
  const [active, setActive] = useState("dashboard");
  const [currentUser, setCurrentUser] = useState(null);

  const tabs = [
    { key: "dashboard", label: "Dashboard" },
    { key: "documentos", label: "Documentos" },
    { key: "registro", label: "Empresas" },
    { key: "usuarios", label: "Usuarios y Roles" },
    { key: "capacitacion", label: "Capacitación" },
    { key: "auditorias", label: "Auditorías" },
  ];

  // Si no hay usuario → mostrar login
  if (!currentUser) {
    return <Login onLogin={setCurrentUser} />;
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header con bienvenida y logout */}
      <Header currentUser={currentUser} onLogout={() => setCurrentUser(null)} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar
          tabs={tabs}
          active={active}
          onChange={setActive}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />

        {/* Contenido dinámico */}
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          {active === "dashboard" && <Dashboard />}
          {active === "documentos" && <Documents />}
          {active === "registro" && <RegistroEmpresa />}
          {active === "usuarios" && <UsuariosRoles />}
          {active === "capacitacion" && <Capacitacion />}
          {active === "auditorias" && <AuditoriasChecklist />}
        </main>
      </div>
    </div>
  );
}

export default App;