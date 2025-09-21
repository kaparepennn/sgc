import React, { useEffect, useState } from "react";

const defaultQuestions = [
  "Existe una política de calidad documentada y publicada?",
  "Se definen objetivos de calidad medibles y revisables?",
  "Se realizan auditorías internas periódicas?",
  "Se registran y analizan las no conformidades?",
  "Se gestionan acciones correctivas y preventivas?"
];

export default function AuditoriasChecklist({ currentUser }){
  const [entries, setEntries] = useState([]);
  const [targetName, setTargetName] = useState("");
  const [answers, setAnswers] = useState(defaultQuestions.map(()=>false));

  useEffect(()=> {
    setEntries(JSON.parse(localStorage.getItem("auditorias")) || []);
  },[]);

  useEffect(()=> localStorage.setItem("auditorias", JSON.stringify(entries)), [entries]);

  const toggle = (i) => {
    const copy = [...answers]; copy[i] = !copy[i]; setAnswers(copy);
  };

  const submitChecklist = () => {
    const now = new Date();
    const record = {
      id: Date.now(),
      fecha: now.toLocaleDateString(),
      hora: now.toLocaleTimeString(),
      aplicacionA: targetName,
      aplicadoPor: currentUser ? currentUser.nombre : "No autenticado",
      respuestas: answers,
      preguntas: defaultQuestions
    };
    setEntries([record, ...entries]);
    setTargetName("");
    setAnswers(defaultQuestions.map(()=>false));
    alert("Checklist registrado");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Auditorías - Checklist ISO 9001</h2>

      <div className="bg-white p-4 rounded shadow mb-4">
        <label className="block mb-2">A quien se le aplica el checklist (empresa/usuario):</label>
        <input value={targetName} onChange={(e)=>setTargetName(e.target.value)} className="border p-2 w-full mb-3" placeholder="Nombre de la persona o empresa" />
        <div className="mb-3">
          {defaultQuestions.map((q,i)=>(
            <div key={i} className="flex items-center gap-3 mb-2">
              <input type="checkbox" checked={answers[i]} onChange={()=>toggle(i)} />
              <div>{q}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={submitChecklist} className="px-3 py-2 bg-green-600 text-white rounded">Registrar Checklist</button>
        </div>
      </div>

      <h3 className="font-semibold mb-2">Registros de Auditorías</h3>
      <div className="space-y-3">
        {entries.length===0 && <div className="text-sm text-gray-500">No hay registros</div>}
        {entries.map(e => (
          <div key={e.id} className="bg-white p-3 rounded shadow">
            <div className="flex justify-between items-center mb-2">
              <div>
                <div className="font-semibold">{e.aplicacionA}</div>
                <div className="text-sm text-gray-600">{e.fecha} {e.hora} • Aplicado por: {e.aplicadoPor}</div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-1 mt-2">
              {e.preguntas.map((p, idx)=>(
                <div key={idx} className="flex justify-between">
                  <div className="text-sm">{p}</div>
                  <div className={`text-sm font-semibold ${e.respuestas[idx] ? "text-green-600" : "text-red-600"}`}>
                    {e.respuestas[idx] ? "Sí" : "No"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}