import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function AuditoriasChecklist() {
  const [auditorias, setAuditorias] = useState([]);
  const [formData, setFormData] = useState({
    auditado: "",
    fecha: "",
    hora: "",
    liderazgo: false,
    planificacion: false,
    soporte: false,
    operacion: false,
    evaluacion: false,
    mejora: false,
  });
  const [editIndex, setEditIndex] = useState(null);

  // Cargar auditorías guardadas
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("auditorias")) || [];
    setAuditorias(stored);
  }, []);

  // Guardar auditorías cada vez que cambien
  useEffect(() => {
    localStorage.setItem("auditorias", JSON.stringify(auditorias));
  }, [auditorias]);

  // Manejo de formulario
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      const updated = [...auditorias];
      updated[editIndex] = formData;
      setAuditorias(updated);
      setEditIndex(null);
    } else {
      setAuditorias([...auditorias, formData]);
    }

    setFormData({
      auditado: "",
      fecha: "",
      hora: "",
      liderazgo: false,
      planificacion: false,
      soporte: false,
      operacion: false,
      evaluacion: false,
      mejora: false,
    });
  };

  const handleEdit = (index) => {
    setFormData(auditorias[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = auditorias.filter((_, i) => i !== index);
    setAuditorias(updated);
  };

  // 📌 Exportar a Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(auditorias);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Auditorias");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "auditorias.xlsx");
  };

  // 📌 Exportar a PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Historial de Auditorías ISO 9001", 14, 15);

    const tableData = auditorias.map((a) => [
      a.auditado,
      a.fecha,
      a.hora,
      a.liderazgo ? "✔️" : "❌",
      a.planificacion ? "✔️" : "❌",
      a.soporte ? "✔️" : "❌",
      a.operacion ? "✔️" : "❌",
      a.evaluacion ? "✔️" : "❌",
      a.mejora ? "✔️" : "❌",
    ]);

    doc.autoTable({
      head: [
        [
          "Auditado",
          "Fecha",
          "Hora",
          "Liderazgo",
          "Planificación",
          "Soporte",
          "Operación",
          "Evaluación",
          "Mejora",
        ],
      ],
      body: tableData,
      startY: 25,
    });

    doc.save("auditorias.pdf");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Auditorías ISO 9001</h2>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 shadow rounded space-y-3 mb-6"
      >
        <input
          type="text"
          name="auditado"
          placeholder="Persona auditada"
          value={formData.auditado}
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

        {/* Checklist ISO 9001 */}
        <div className="grid grid-cols-2 gap-2">
          {[
            "liderazgo",
            "planificacion",
            "soporte",
            "operacion",
            "evaluacion",
            "mejora",
          ].map((campo) => (
            <label key={campo}>
              <input
                type="checkbox"
                name={campo}
                checked={formData[campo]}
                onChange={handleChange}
                className="mr-2"
              />
              {campo.charAt(0).toUpperCase() + campo.slice(1)}
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="bg-tincar-gold text-tincar-dark px-4 py-2 rounded font-semibold"
        >
          {editIndex !== null ? "Actualizar Auditoría" : "Registrar Auditoría"}
        </button>
      </form>

      {/* Lista */}
      <h3 className="text-xl font-semibold mb-2">Historial de Auditorías</h3>
      {auditorias.length === 0 ? (
        <p className="text-gray-500">No hay auditorías registradas.</p>
      ) : (
        <>
          {/* Botones de exportación */}
          <div className="flex space-x-2 mb-3">
            <button
              onClick={exportToExcel}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Exportar a Excel
            </button>
            <button
              onClick={exportToPDF}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Exportar a PDF
            </button>
          </div>

          <ul className="space-y-2">
            {auditorias.map((a, i) => (
              <li
                key={i}
                className="border p-3 rounded bg-white shadow flex justify-between items-center"
              >
                <div>
                  <p className="font-bold">👤 {a.auditado}</p>
                  <p className="text-sm">
                    📅 {a.fecha} ⏰ {a.hora}
                  </p>
                  <ul className="text-sm list-disc list-inside">
                    {a.liderazgo && <li>Liderazgo</li>}
                    {a.planificacion && <li>Planificación</li>}
                    {a.soporte && <li>Soporte</li>}
                    {a.operacion && <li>Operación</li>}
                    {a.evaluacion && <li>Evaluación</li>}
                    {a.mejora && <li>Mejora</li>}
                  </ul>
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
        </>
      )}
    </div>
  );
}
