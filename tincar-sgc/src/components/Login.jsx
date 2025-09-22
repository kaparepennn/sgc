import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulación de credenciales válidas
    if (username === "Karen.Palacios" && password === "1234") {
      onLogin(username); // guarda usuario en App.jsx
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-tincar-dark">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        {/* Logo TinCar */}
        <img
          src="/logo.png"
          alt="TinCar"
          className="mx-auto mb-4 w-24 h-24 object-contain"
        />

        <h2 className="text-2xl font-bold text-tincar-dark mb-2">
          TinCar - ISO 9001
        </h2>
        <p className="text-gray-600 mb-6">Inicia sesión en tu cuenta</p>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-tincar-gold"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-tincar-gold"
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-tincar-gold text-tincar-dark font-semibold py-2 rounded hover:bg-yellow-500 transition"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
