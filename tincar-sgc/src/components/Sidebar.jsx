import React from "react";

export default function Sidebar({ tabs, active, onChange, currentUser, setCurrentUser }) {
  return (
    <aside className="w-64 bg-indigo-900 text-white p-4 flex flex-col">
      <div className="mb-6">
        <h1 className="text-xl font-bold">TinCar SGC</h1>
        <p className="text-sm text-indigo-200">Gestión de Calidad - ISO 9001</p>
      </div>
      <nav className="flex-1 space-y-2">
        {tabs.map(t => (
          <button
            key={t.key}
            className={`w-full text-left px-3 py-2 rounded ${active===t.key ? "bg-indigo-700" : "hover:bg-indigo-800"}`}
            onClick={() => onChange(t.key)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <div className="mt-4">
        {currentUser ? (
          <div>
            <div className="text-sm">Conectado como:</div>
            <div className="font-semibold">{currentUser.nombre}</div>
            <button className="mt-2 text-xs bg-red-500 px-2 py-1 rounded" onClick={()=>setCurrentUser(null)}>Cerrar sesión</button>
          </div>
        ) : (
          <div className="text-sm text-indigo-200">No hay sesión iniciada</div>
        )}
      </div>
    </aside>
  );
}
