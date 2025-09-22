import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Datos ficticios (mock data)
const dataIncidencias = [
  { mes: "Ene", resueltas: 12, pendientes: 5 },
  { mes: "Feb", resueltas: 15, pendientes: 3 },
  { mes: "Mar", resueltas: 20, pendientes: 7 },
  { mes: "Abr", resueltas: 18, pendientes: 2 },
];

export default function Dashboard() {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-tincar-dark mb-6">
        Dashboard - Indicadores de Calidad
      </h2>

      {/* Grid principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Entregas a tiempo */}
        <div className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-tincar-gold">
          <h3 className="text-sm text-gray-500 mb-2">Proyectos a tiempo</h3>
          <p className="text-3xl font-bold text-tincar-dark">92%</p>
          <p className="text-green-600 text-sm">+5% vs mes anterior</p>
        </div>

        {/* Incidencias */}
        <div className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-tincar-blue">
          <h3 className="text-sm text-gray-500 mb-2">Incidencias resueltas</h3>
          <p className="text-3xl font-bold text-tincar-dark">87%</p>
          <p className="text-green-600 text-sm">✔ Mejorando</p>
        </div>

        {/* Satisfacción */}
        <div className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-tincar-dark">
          <h3 className="text-sm text-gray-500 mb-2">Satisfacción Cliente</h3>
          <p className="text-3xl font-bold text-tincar-dark">4.6 / 5</p>
          <p className="text-yellow-600 text-sm">📈 Tendencia positiva</p>
        </div>

        {/* No conformidades */}
        <div className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-red-500">
          <h3 className="text-sm text-gray-500 mb-2">No Conformidades</h3>
          <p className="text-3xl font-bold text-tincar-dark">3</p>
          <p className="text-red-600 text-sm">⚠ Requiere atención</p>
        </div>
      </div>

      {/* Gráfica de incidencias */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-lg font-semibold text-tincar-dark mb-4">
          Evolución de Incidencias
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dataIncidencias}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="resueltas" fill="#D4AF37" name="Resueltas" />
            <Bar dataKey="pendientes" fill="#0B63A5" name="Pendientes" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}