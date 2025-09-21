import React from "react";

export default function Dashboard(){
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard SGC - TinCar</h2>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">% Proyectos entregados a tiempo</h3>
          <div className="text-2xl mt-4">82%</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Incidencias resueltas a tiempo</h3>
          <div className="text-2xl mt-4">76%</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Satisfacción del cliente</h3>
          <div className="text-2xl mt-4">4.2 / 5</div>
        </div>
      </div>
    </div>
  );
}
