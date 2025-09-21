import React, { useState, useEffect } from "react";

export default function RegistroEmpresa(){
  const [empresas, setEmpresas] = useState([]);
  const [form, setForm] = useState({
    razonSocial: "", numeroEmpleados: "", nit: "", email: "", representante: "",
    web: "", sector: "", tipo: "", direccion: "", redes: ""
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("empresas")) || [];
    setEmpresas(data);
  }, []);

  useEffect(() => {
    localStorage.setItem("empresas", JSON.stringify(empresas));
  }, [empresas]);

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

  const resetForm = () => setForm({ razonSocial:"", numeroEmpleados:"", nit:"", email:"", representante:"", web:"", sector:"", tipo:"", direccion:"", redes:"" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if(editIndex !== null){
      const updated = [...empresas]; updated[editIndex] = form;
      setEmpresas(updated); setEditIndex(null);
    } else {
      setEmpresas([...empresas, form]);
    }
    resetForm();
  };

  const handleEdit = (i) => { setForm(empresas[i]); setEditIndex(i); };
  const handleDelete = (i) => { setEmpresas(empresas.filter((_,idx)=>idx!==i)); };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Registro de Empresas</h2>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-3">
        <input name="razonSocial" placeholder="Razón Social" value={form.razonSocial} onChange={handleChange} className="border p-2" required />
        <input name="numeroEmpleados" placeholder="Número de empleados" value={form.numeroEmpleados} onChange={handleChange} className="border p-2" />
        <input name="nit" placeholder="NIT" value={form.nit} onChange={handleChange} className="border p-2" required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="border p-2" />
        <input name="representante" placeholder="Representante Legal" value={form.representante} onChange={handleChange} className="border p-2" />
        <input name="web" placeholder="Página web" value={form.web} onChange={handleChange} className="border p-2" />
        <input name="sector" placeholder="Sector económico" value={form.sector} onChange={handleChange} className="border p-2" />
        <input name="tipo" placeholder="Tipo de empresa" value={form.tipo} onChange={handleChange} className="border p-2" />
        <input name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} className="border p-2 col-span-2" />
        <input name="redes" placeholder="Redes sociales (ej. Facebook:@empresa)" value={form.redes} onChange={handleChange} className="border p-2 col-span-2" />

        <div className="col-span-2 flex gap-2">
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">{editIndex!==null ? "Actualizar" : "Registrar"}</button>
          <button type="button" onClick={()=>{ resetForm(); setEditIndex(null); }} className="px-4 py-2 bg-gray-200 rounded">Limpiar</button>
        </div>
      </form>

      <h3 className="text-xl font-semibold mb-2">Empresas Registradas</h3>
      <div className="space-y-2">
        {empresas.length===0 && <div className="text-sm text-gray-500">No hay empresas registradas</div>}
        {empresas.map((e,i)=>(
          <div key={i} className="bg-white p-3 rounded shadow flex justify-between items-center">
            <div>
              <div className="font-semibold">{e.razonSocial} <span className="text-xs text-gray-500">({e.nit})</span></div>
              <div className="text-sm text-gray-600">{e.representante} • {e.email}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>handleEdit(i)} className="px-2 py-1 bg-yellow-400 rounded">Editar</button>
              <button onClick={()=>handleDelete(i)} className="px-2 py-1 bg-red-500 text-white rounded">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}