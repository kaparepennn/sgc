import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Documents from "./components/Documents";
import RegistroEmpresa from "./components/RegistroEmpresa";
import UsuariosRoles from "./components/UsuariosRoles";
import Capacitacion from "./components/Capacitacion";
import AuditoriasChecklist from "./components/AuditoriasChecklist";

// Importar íconos de Heroicons
import {
  HomeIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  Cog6ToothIcon,
  AcademicCapIcon,
  ClipboardDocumentCheckIcon,
  BuildingOffice2Icon,
  UsersIcon,
} from "@heroicons/react/24/outline";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [currentUser, setCurrentUser] = useState(null);

  // Datos de ejemplo para login
  const [form, setForm] = useState({ username: "", password: "" });

  const handleLogin = (e) => {
    e.preventDefault();
    if (form.username === "Karen.Palacios" && form.password === "1234") {
      setCurrentUser("Karen Palacios");
    } else {
      alert("Usuario o contraseña incorrectos (usuario: Karen.Palacios / pass: 1234)");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setForm({ username: "", password: "" });
  };

  const tabs = [
    { key: "dashboard", label: "Dashboard", icon: HomeIcon },
    { key: "documentos", label: "Documentos", icon: DocumentTextIcon },
    { key: "incidencias", label: "Incidencias", icon: ExclamationTriangleIcon },
    { key: "procesos", label: "Procesos", icon: Cog6ToothIcon },
    { key: "capacitacion", label: "Capacitación", icon: AcademicCapIcon },
    { key: "auditorias", label: "Auditorías", icon: ClipboardDocumentCheckIcon },
    { key: "empresas", label: "Registro Empresas", icon: BuildingOffice2Icon },
    { key: "usuarios", label: "Usuarios y Roles", icon: UsersIcon },
  ];

  // Si no hay sesión activa → mostrar login
  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-tincar-gray text-white">
        <div className="bg-tincar-black p-8 rounded-lg shadow-lg w-96 text-center">
          {/* Logo TinCar */}
          <img
            src="/logo.png"
            alt="TinCar Logo"
            className="mx-auto mb-4 w-24 h-24 object-contain"
          />

          <h1 className="text-2xl font-bold text-tincar-gold mb-6">
            TinCar SGC - ISO 9001
          </h1>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block mb-1 text-sm text-tincar-gold">
                Usuario
              </label>
              <input
                type="text"
                className="w-full p-2 rounded bg-tincar-gray text-white border border-tincar-gold"
                value={form.username}
                onChange={(e) =>
                  setForm({ ...form, username: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-tincar-gold">
                Contraseña
              </label>
              <input
                type="password"
                className="w-full p-2 rounded bg-tincar-gray text-white border border-tincar-gold"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              className="w-full bg-tincar-gold text-tincar-black py-2 rounded font-bold hover:bg-tincar-orange"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Si está logueado → mostrar la app
  return (
    <div className="flex h-screen bg-tincar-gray text-white">
      {/* Sidebar */}
      <Sidebar
        tabs={tabs}
        active={activeTab}
        onChange={setActiveTab}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />

      {/* Contenido */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Header con bienvenida y logout */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-tincar-gold">
            Bienvenida {currentUser}
          </h1>
          <button
            onClick={handleLogout}
            className="bg-tincar-orange px-4 py-2 rounded text-black font-semibold hover:bg-tincar-gold"
          >
            Cerrar sesión
          </button>
        </div>

        {/* Render dinámico */}
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "documentos" && <Documents />}
        {activeTab === "incidencias" && <p>Incidencias en desarrollo...</p>}
        {activeTab === "procesos" && <p>Procesos en desarrollo...</p>}
        {activeTab === "capacitacion" && <Capacitacion />}
        {activeTab === "auditorias" && <AuditoriasChecklist />}
        {activeTab === "empresas" && <RegistroEmpresa />}
        {activeTab === "usuarios" && <UsuariosRoles />}
      </div>
    </div>
  );
}

export default App;
