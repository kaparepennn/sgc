import React, { useState, useEffect } from "react";

export default function RegistroEmpresa() {
  const [empresas, setEmpresas] = useState([]);
  const [formData, setFormData] = useState({
    razonSocial: "",
    numeroEmpresa: "",
    nit: "",
    email: "",
    representante: "",
    paginaWeb: "",
    sector: "",
    tipo: "",
    direccion: "",
    redesSociales: "",
    usuario: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  // Cargar desde localStorage al iniciar
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("empresas")) || [];
    setEmpresas(stored);
  }, []);

  // Guardar cada vez que cambien
  useEffect(() => {
    localStorage.setItem("empresas", JSON.stringify(empresas));
  }, [empresas]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...empresas];
      updated[editIndex] = formData;
      setEmpresas(updated);
      setEditIndex(null);
    } else {
      setEmpresas([...empresas, formData]);
    }
    setFormData({
      razonSocial: "",
      numeroEmpresa: "",
      nit: "",
      email: "",
      representante: "",
      paginaWeb: "",
      sector: "",
      tipo: "",
      direccion: "",
      redesSociales: "",
      usuario: "",
    });
  };

  const handleEdit = (index) => {
    setFormData(empresas[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = empresas.filter((_, i) => i !== index);
    setEmpresas(updated);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-tincar-dark">
        Registro de Empresas
      </h2>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 grid grid-cols-2 gap-4 mb-8"
      >
        {[
          { name: "razonSocial", label: "Razón Social" },
          { name: "numeroEmpresa", label: "Número de Empresa" },
          { name: "nit", label: "NIT" },
          { name: "email", label: "Email", type: "email" },
          { name: "representante", label: "Representante Legal" },
          { name: "paginaWeb", label: "Página Web" },
          { name: "sector", label: "Sector Económico" },
          { name: "tipo", label: "Tipo de Empresa" },
          { name: "direccion", label: "Dirección" },
          { name: "redesSociales", label: "Redes Sociales" },
          { name: "usuario", label: "Usuario Asociado" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-tincar-dark mb-1">
              {field.label}
            </label>
            <input
              type={field.type || "text"}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-tincar-gold"
              required
            />
          </div>
        ))}

        {/* Botones */}
        <div className="col-span-2 flex space-x-3 mt-4">
          <button
            type="submit"
            className="bg-tincar-gold text-tincar-dark px-6 py-2 rounded font-semibold hover:bg-yellow-500 transition"
          >
            {editIndex !== null ? "Actualizar Empresa" : "Registrar Empresa"}
          </button>
          <button
            type="button"
            onClick={() => setEmpresas([])}
            className="bg-tincar-dark text-white px-6 py-2 rounded font-semibold hover:bg-gray-900 transition"
          >
            Limpiar Lista
          </button>
        </div>
      </form>

      {/* Tabla estilizada */}
      <h3 className="text-2xl font-semibold mb-4 text-tincar-dark">
        Empresas Registradas
      </h3>
      {empresas.length === 0 ? (
        <p className="text-gray-500">No hay empresas registradas.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-tincar-dark text-white">
              <tr>
                <th className="px-4 py-2 text-left">Razón Social</th>
                <th className="px-4 py-2 text-left">NIT</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Representante</th>
                <th className="px-4 py-2 text-left">Sector</th>
                <th className="px-4 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {empresas.map((empresa, i) => (
                <tr
                  key={i}
                  className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-2">{empresa.razonSocial}</td>
                  <td className="px-4 py-2">{empresa.nit}</td>
                  <td className="px-4 py-2">{empresa.email}</td>
                  <td className="px-4 py-2">{empresa.representante}</td>
                  <td className="px-4 py-2">{empresa.sector}</td>
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
