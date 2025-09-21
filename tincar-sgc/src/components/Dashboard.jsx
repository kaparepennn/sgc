import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const lineData = [
  { name: 'Ene', entregados: 72, incidencias: 18 },
  { name: 'Feb', entregados: 81, incidencias: 14 },
  { name: 'Mar', entregados: 85, incidencias: 12 },
  { name: 'Abr', entregados: 78, incidencias: 20 },
  { name: 'May', entregados: 88, incidencias: 10 },
  { name: 'Jun', entregados: 92, incidencias: 8 },
];

const pieData = [
  { name: 'Satisfecho', value: 68 },
  { name: 'Neutral', value: 20 },
  { name: 'Insatisfecho', value: 12 },
];

const COLORS = ['#D4AF37', '#0B63A5', '#0B1724'];

export default function Dashboard(){
  const recentProjects = [
    { id: "T-001", cliente: "Empresa A", estado: "Entregado", fecha: "2025-09-01" },
    { id: "T-002", cliente: "Empresa B", estado: "En pruebas", fecha: "2025-09-05" },
    { id: "T-003", cliente: "Conductor C", estado: "Incidencia", fecha: "2025-09-08" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-tincar-dark">Dashboard SGC - TinCar</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow-soft-md">
          <h3 className="font-semibold">Indicadores</h3>
          <div className="mt-4 space-y-3">
            <div className="flex justify-between items-center">
              <div>% Proyectos entregados a tiempo</div>
              <div className="text-2xl font-bold text-tincar-gold">88%</div>
            </div>
            <div className="flex justify-between items-center">
              <div>% Incidencias resueltas a tiempo</div>
              <div className="text-2xl font-bold text-green-600">76%</div>
            </div>
            <div className="flex justify-between items-center">
              <div>Nº No Conformidades abiertas</div>
              <div className="text-2xl font-bold text-red-600">4</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow-soft-md lg:col-span-2">
          <h3 className="font-semibold">Tendencia mensual</h3>
          <div className="w-full h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="entregados" stroke="#D4AF37" strokeWidth={3} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="incidencias" stroke="#0B63A5" strokeWidth={3} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow-soft-md">
          <h3 className="font-semibold">Satisfacción</h3>
          <div className="w-full h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white p-4 rounded shadow-soft-md">
        <h3 className="font-semibold mb-3">Proyectos recientes</h3>
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-gray-500">
              <th className="py-2">ID</th>
              <th>Cliente</th>
              <th>Estado</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {recentProjects.map(p => (
              <tr key={p.id} className="border-t">
                <td className="py-2">{p.id}</td>
                <td>{p.cliente}</td>
                <td>{p.estado}</td>
                <td>{p.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
