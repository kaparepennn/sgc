import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuIcon, XIcon } from "@heroicons/react/outline"; // si no tienes heroicons, usa SVG simples

export default function Sidebar({ tabs, active, onChange, currentUser, setCurrentUser }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between p-3 bg-tincar-dark text-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-tincar-gold flex items-center justify-center font-bold">T</div>
          <div className="font-semibold">TinCar SGC</div>
        </div>
        <button onClick={()=>setOpen(!open)} aria-label="menu">
          {open ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-tincar-dark text-white p-4 flex-col">
        <div className="mb-6">
          <h1 className="text-xl font-bold">TinCar SGC</h1>
          <p className="text-sm text-tincar-gold">Gestión de Calidad - ISO 9001</p>
        </div>

        <nav className="flex-1 space-y-2">
          {tabs.map(t => (
            <button
              key={t.key}
              className={`w-full text-left px-3 py-2 rounded ${active===t.key ? "bg-tincar-gold text-tincar-dark" : "hover:bg-indigo-800/30"}`}
              onClick={() => onChange(t.key)}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <div className="mt-4">
          {currentUser ? (
            <div>
              <div className="text-sm">Conectado como:</div>
              <div className="font-semibold">{currentUser.nombre}</div>
              <button className="mt-2 text-xs bg-red-500 px-2 py-1 rounded" onClick={()=>setCurrentUser(null)}>Cerrar sesión</button>
            </div>
          ) : (
            <div className="text-sm text-tincar-gold">No hay sesión iniciada</div>
          )}
        </div>
      </aside>

      {/* Mobile Menu (animated) */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden fixed z-40 top-0 left-0 h-full w-72 bg-tincar-dark text-white p-4"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-lg font-bold">TinCar SGC</h1>
                <p className="text-xs text-tincar-gold">ISO 9001</p>
              </div>
              <button onClick={()=>setOpen(false)}><XIcon className="w-5 h-5" /></button>
            </div>

            <nav className="flex flex-col gap-2">
              {tabs.map(t => (
                <motion.button
                  key={t.key}
                  onClick={() => { onChange(t.key); setOpen(false); }}
                  whileTap={{ scale: 0.98 }}
                  className={`text-left px-3 py-2 rounded ${active===t.key ? "bg-tincar-gold text-tincar-dark" : "hover:bg-indigo-800/30"}`}
                >
                  {t.label}
                </motion.button>
              ))}
            </nav>

            <div className="mt-6">
              {currentUser ? (
                <div>
                  <div className="text-sm">Conectado como:</div>
                  <div className="font-semibold">{currentUser.nombre}</div>
                </div>
              ) : (
                <div className="text-sm text-tincar-gold">No hay sesión iniciada</div>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
