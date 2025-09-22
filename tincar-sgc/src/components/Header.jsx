import React from "react";

export default function Header({ currentUser, onLogout }) {
  return (
    <div className="bg-tincar-dark text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        Sistema de Gestión de la Calidad - ISO 9001
      </h1>

      {currentUser && (
        <div className="flex items-center space-x-4">
          <p className="text-tincar-gold font-semibold">
            Bienvenida {currentUser.replace(".", " ")}
          </p>
          <button
            onClick={onLogout}
            className="bg-tincar-gold text-tincar-dark font-semibold px-3 py-1 rounded hover:bg-yellow-500 transition"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}