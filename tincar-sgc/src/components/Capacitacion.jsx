import React, { useState, useEffect } from "react";

export default function Capacitacion() {
  const [capacitaciones, setCapacitaciones] = useState([]);
  const [formData, setFormData] = useState({
    tema: "",
    fecha: "",
    hora: "",
    responsable: "",
    enlace: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  // Cargar capacitaciones guardadas al iniciar
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("capacitaciones")) || [];
    setCapacitaciones(stored);
  }, []);

  // Guardar capacitaciones cada vez que cambian
  useEffect(() => {
    localStorage.setItem("capacitaciones", JSON.stringify(capacitaciones));
  }, [capacitaciones]);

  // Manejar cambios de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Guardar capacitación nueva o actualizada
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      const updated = [...capacitaciones];
      updated[editIndex] = formData;
      setCapacitaciones(updated);
      setEditIndex(null);
    } else {
      setCapacitaciones([...capacitaciones, formData]);
    }

    setFormData({ tema: "", fecha: "", hora: "", responsable: "", enlace: "" });
  };

  // Eliminar capacitación
  const handleDelete = (index) => {
    const updated = capacitaciones.filter((_, i) => i !== index);
    setCapacitaciones(updated);
  };

  // Editar capacitación
  const handleEdit = (index) => {
    setFormData(capacitaciones[index]);
    setEditIndex(index);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Gestión de Capacitaciones</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-6 bg-white p-4 shadow rounded">
        <input
          type="text"
          name="tema"
          placeholder="Tema de la capacitación"
          value={formData.tema}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="time"
          name="hora"
          value={formData.hora}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="text"
          name="responsable"
          placeholder="Responsable"
          value={formData.responsable}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="url"
          name="enlace"
          placeholder="Enlace (Teams, Zoom, Google Meet, etc.)"
          value={formData.enlace}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        <button
          type="submit"
          className="bg-tincar-gold text-tincar-dark px-4 py-2 rounded font-semibold"
        >
          {editIndex !== null ? "Actualizar Capacitación" : "Registrar Capacitación"}
        </button>
      </form>

      {/* Lista de capacitaciones */}
      <h3 className="text-xl font-semibold mb-2">Capacitaciones Agendadas</h3>
      {capacitaciones.length === 0 ? (
        <p className="text-gray-500">No hay capacitaciones registradas.</p>
      ) : (
        <ul className="space-y-2">
          {capacitaciones.map((c, i) => (
            <li
              key={i}
              className="border p-3 rounded bg-white shadow flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{c.tema}</p>
                <p className="text-sm">
                  📅 {c.fecha} ⏰ {c.hora} <br />
                  👤 {c.responsable}
                </p>
                <a
                  href={c.enlace}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline text-sm"
                >
                  Ir al enlace
                </a>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(i)}
                  className="bg-yellow-400 px-2 py-1 rounded text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(i)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
