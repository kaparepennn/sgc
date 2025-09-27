import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const dataPie = [
  { name: "Documentos", value: 12 },
  { name: "Incidencias", value: 5 },
  { name: "Usuarios", value: 3 },
];

const dataBar = [
  { name: "Enero", incidencias: 4 },
  { name: "Febrero", incidencias: 6 },
  { name: "Marzo", incidencias: 2 },
];

const COLORS = ["#FFB300", "#E88E2E", "#1A1919"];

export default function Dashboard() {
  return (
    <div className="p-6 bg-tincar-gray min-h-screen text-white">
      <h2 className="text-3xl font-bold text-tincar-gold mb-6">Dashboard</h2>

      {/* Grid de cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-tincar-black text-center shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-bold text-tincar-gold">Documentos</h3>
          <p className="text-3xl font-bold text-white">12</p>
        </div>

        <div className="bg-tincar-black text-center shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-bold text-tincar-gold">Incidencias</h3>
          <p className="text-3xl font-bold text-white">5</p>
        </div>

        <div className="bg-tincar-black text-center shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-bold text-tincar-gold">Usuarios</h3>
          <p className="text-3xl font-bold text-white">3</p>
        </div>
      </div>

      {/* Sección de gráficas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-tincar-black p-6 rounded-lg shadow-lg text-white">
          <h3 className="text-lg font-semibold mb-4 text-tincar-gold">
            Distribución General
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={dataPie}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {dataPie.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Fondo claro → texto oscuro */}
        <div className="bg-tincar-beige p-6 rounded-lg shadow-lg text-tincar-black">
          <h3 className="text-lg font-semibold mb-4">
            Incidencias por mes
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dataBar}>
              <XAxis dataKey="name" stroke="#1A1919" />
              <YAxis stroke="#1A1919" />
              <Tooltip />
              <Bar dataKey="incidencias" fill="#FFB300" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
