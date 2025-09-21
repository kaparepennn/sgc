import React, { useEffect, useState } from "react";

export default function UsuariosRoles({ onLogin, currentUser }) {
  const [roles, setRoles] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [roleName, setRoleName] = useState("");
  const [editRoleIndex, setEditRoleIndex] = useState(null);

  const [userForm, setUserForm] = useState({ nombre:"", email:"", rol:"" });
  const [editUserIndex, setEditUserIndex] = useState(null);

  const [loginEmail, setLoginEmail] = useState("");

  useEffect(()=>{
    setRoles(JSON.parse(localStorage.getItem("roles")) || []);
    setUsuarios(JSON.parse(localStorage.getItem("usuarios")) || []);
  },[]);

  useEffect(()=> localStorage.setItem("roles", JSON.stringify(roles)), [roles]);
  useEffect(()=> localStorage.setItem("usuarios", JSON.stringify(usuarios)), [usuarios]);

  // Roles CRUD
  const addRole = () => {
    if(!roleName) return;
    if(editRoleIndex!==null){
      const copy = [...roles]; copy[editRoleIndex] = roleName; setRoles(copy); setEditRoleIndex(null);
    } else setRoles([...roles, roleName]);
    setRoleName("");
  };
  const delRole = (i) => setRoles(roles.filter((_,idx)=>idx!==i));
  const editRole = (i) => { setRoleName(roles[i]); setEditRoleIndex(i); };

  // Usuarios CRUD
  const handleUserChange = (e) => setUserForm({...userForm, [e.target.name]: e.target.value});
  const addOrEditUser = (e) => {
    e.preventDefault();
    if(editUserIndex!==null){
      const copy = [...usuarios]; copy[editUserIndex] = userForm; setUsuarios(copy); setEditUserIndex(null);
    } else setUsuarios([...usuarios, userForm]);
    setUserForm({nombre:"", email:"", rol:""});
  };
  const delUser = (i) => setUsuarios(usuarios.filter((_,idx)=>idx!==i));
  const editUser = (i) => { setUserForm(usuarios[i]); setEditUserIndex(i); };

  // Login simulado
  const handleLogin = (e) => {
    e.preventDefault();
    const found = usuarios.find(u => u.email === loginEmail);
    if(found){
      if(onLogin) onLogin(found);
      alert("Sesión iniciada como " + found.nombre);
    } else alert("Usuario no encontrado");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Usuarios & Roles</h2>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Roles</h3>
          <div className="flex gap-2 mb-3">
            <input value={roleName} onChange={(e)=>setRoleName(e.target.value)} className="border p-2 flex-1" placeholder="Nombre del rol" />
            <button onClick={addRole} className="px-3 py-2 bg-green-600 text-white rounded">{editRoleIndex!==null ? "Actualizar" : "Agregar"}</button>
          </div>
          <ul className="space-y-2">
            {roles.map((r,i)=>(
              <li key={i} className="flex justify-between items-center">
                <span>{r}</span>
                <div className="flex gap-2">
                  <button onClick={()=>editRole(i)} className="px-2 py-1 bg-yellow-400 rounded">Editar</button>
                  <button onClick={()=>delRole(i)} className="px-2 py-1 bg-red-500 text-white rounded">Eliminar</button>
                </div>
              </li>
            ))}
            {roles.length===0 && <li className="text-sm text-gray-500">No hay roles</li>}
          </ul>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Usuarios</h3>
          <form onSubmit={addOrEditUser} className="space-y-2 mb-3">
            <input name="nombre" value={userForm.nombre} onChange={handleUserChange} className="border p-2 w-full" placeholder="Nombre completo" required />
            <input name="email" value={userForm.email} onChange={handleUserChange} className="border p-2 w-full" placeholder="Email" required />
            <select name="rol" value={userForm.rol} onChange={handleUserChange} className="border p-2 w-full" required>
              <option value="">Seleccionar rol</option>
              {roles.map((r,i)=>(<option key={i} value={r}>{r}</option>))}
            </select>
            <div className="flex gap-2">
              <button type="submit" className="px-3 py-2 bg-green-600 text-white rounded">{editUserIndex!==null ? "Actualizar" : "Registrar"}</button>
              <button type="button" onClick={()=>{ setUserForm({nombre:"",email:"",rol:""}); setEditUserIndex(null); }} className="px-3 py-2 bg-gray-200 rounded">Limpiar</button>
            </div>
          </form>
          <h4 className="font-semibold">Lista de usuarios</h4>
          <ul className="space-y-2">
            {usuarios.map((u,i)=>(
              <li key={i} className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">{u.nombre}</div>
                  <div className="text-sm text-gray-600">{u.email} • {u.rol}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={()=>editUser(i)} className="px-2 py-1 bg-yellow-400 rounded">Editar</button>
                  <button onClick={()=>delUser(i)} className="px-2 py-1 bg-red-500 text-white rounded">Eliminar</button>
                </div>
              </li>
            ))}
            {usuarios.length===0 && <li className="text-sm text-gray-500">No hay usuarios</li>}
          </ul>
        </div>
      </div>

      <div className="mt-6 bg-white p-4 rounded shadow">
        <h3 className="font-semibold">Login Demo</h3>
        <form onSubmit={handleLogin} className="flex gap-2 items-center mt-2">
          <input placeholder="Email del usuario" value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)} className="border p-2 flex-1" />
          <button type="submit" className="px-3 py-2 bg-indigo-600 text-white rounded">Iniciar Sesión</button>
        </form>
        <div className="mt-2 text-sm text-gray-600">Nota: este login es demo y busca el usuario por email en localStorage.</div>
      </div>

      <div className="mt-4">
        <small className="text-gray-500">Importante: para un entorno real debes implementar contraseñas seguras, cifrado y backend.</small>
      </div>
    </div>
  );
}