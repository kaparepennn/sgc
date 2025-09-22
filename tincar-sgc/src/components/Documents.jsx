import React from "react";
import { DRIVE_URL } from "../config";

export default function Documents(){
  // Si deseas, puedes mantener una lista local "hard-coded" o leer nombres conocidos.
  const localDocs = [
    { name: "Norma ISO19011 de 2018", path: "/docs/normaiso190112018Auditoríainterna.pdf" },
    /*{ name: "Objetivos de Calidad", path: "/docs/objetivos.pdf" },*/
    { name: "Formato Auditoría Interna", path: "/docs/FormatoAuditoriaInterna.xlsx" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-tincar-dark">Documentos</h2>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-semibold">Documentos locales</h3>
        <ul className="mt-3 space-y-2">
          {localDocs.map((d,i)=>(
            <li key={i} className="flex justify-between items-center border rounded p-3">
              <div>
                <div className="font-medium">{d.name}</div>
                <div className="text-xs text-gray-500">{d.path.split('/').pop()}</div>
              </div>
              <div className="flex gap-2">
                <a href={d.path} target="_blank" rel="noreferrer" className="underline text-blue-600">Ver</a>
                <a href={d.path} download className="px-2 py-1 bg-gray-100 rounded">Descargar</a>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold">Repositorio en Google Drive</h3>
        <p className="text-sm text-gray-600 mb-3">
          Aquí se podrán descargar los documentos oficiales.
        </p>
        <a href="https://drive.google.com/drive/folders/1oZ4-NeVQSxsYVd3Mko-0r9OOE2Yip1vL?usp=sharing" target="_blank" rel="noreferrer" className="inline-block px-4 py-2 bg-tincar-gold text-tincar-dark rounded font-semibold">Abrir carpeta en Drive</a>
      </div>
    </div>
  );
}
