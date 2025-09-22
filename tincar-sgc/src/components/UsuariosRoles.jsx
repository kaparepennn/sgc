import React, { useState, useEffect } from "react";

export default function UsuariosRoles() {
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    rol: "Usuario General", // valor por defecto
  });
  const [editIndex, setEditIndex] = useState(null);

  // Cargar desde localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("usuarios")) || [];
    setUsuarios(stored);
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }, [usuarios]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...usuarios];
      updated[editIndex] = formData;
      setUsuarios(updated);
      setEditIndex(null);
    } else {
      setUsuarios([...usuarios, formData]);
    }
    setFormData({
      nombre: "",
      email: "",
      rol: "Usuario General",
    });
  };

  const handleEdit = (index) => {
    setFormData(usuarios[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = usuarios.filter((_, i) => i !== index);
    setUsuarios(updated);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-tincar-dark">
        Registro de Usuarios y Roles
      </h2>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 grid grid-cols-2 gap-4 mb-8"
      >
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-tincar-dark mb-1">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-tincar-gold"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-tincar-dark mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-tincar-gold"
            required
          />
        </div>

        {/* Rol (predefinido en un select) */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-tincar-dark mb-1">
            Rol
          </label>
          <select
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-tincar-gold"
          >
            <option value="Administrador del SGC">Administrador del SGC</option>
            <option value="Auditor Interno">Auditor Interno</option>
            <option value="Responsable de Procesos">
              Responsable de Procesos
            </option>
            <option value="Líder de Calidad">Líder de Calidad</option>
            <option value="Usuario General">Usuario General</option>
          </select>
        </div>

        {/* Botones */}
        <div className="col-span-2 flex space-x-3 mt-4">
          <button
            type="submit"
            className="bg-tincar-gold text-tincar-dark px-6 py-2 rounded font-semibold hover:bg-yellow-500 transition"
          >
            {editIndex !== null ? "Actualizar Usuario" : "Registrar Usuario"}
          </button>
          <button
            type="button"
            onClick={() => setUsuarios([])}
            className="bg-tincar-dark text-white px-6 py-2 rounded font-semibold hover:bg-gray-900 transition"
          >
            Limpiar Lista
          </button>
        </div>
      </form>

      {/* Tabla de usuarios */}
      <h3 className="text-2xl font-semibold mb-4 text-tincar-dark">
        Usuarios Registrados
      </h3>
      {usuarios.length === 0 ? (
        <p className="text-gray-500">No hay usuarios registrados.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-tincar-dark text-white">
              <tr>
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Rol</th>
                <th className="px-4 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((user, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-2">{user.nombre}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 font-semibold text-tincar-dark">
                    {user.rol}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEdit(i)}
                      className="bg-yellow-400 text-black px-3 py-1 rounded text-sm hover:bg-yellow-500 transition"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(i)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
