console.log("Sidebar cargado");
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Sidebar({ tabs, active, onChange, currentUser, setCurrentUser }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 🔹 Mobile top bar */}
      <div className="md:hidden flex items-center justify-between p-3 bg-tincar-dark text-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-tincar-gold flex items-center justify-center font-bold">T</div>
          <div className="font-semibold">TinCar SGC</div>
        </div>
        <button onClick={() => setOpen(!open)} aria-label="menu">
          {open ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>

      {/* 🔹 Mobile Sidebar animado */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-tincar-dark text-white shadow-lg md:hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-tincar-gold">
              <div className="font-bold">Menú</div>
              <button onClick={() => setOpen(false)}>
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col p-4 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    active === tab.key
                      ? "bg-tincar-gold text-tincar-dark"
                      : "hover:bg-gray-700"
                  }`}
                  onClick={() => {
                    onChange(tab.key);
                    setOpen(false);
                  }}
                >
                  {tab.icon && <tab.icon className="w-5 h-5 mr-2" />}
                  {tab.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔹 Desktop Sidebar */}
      <div className="hidden md:flex md:flex-col md:w-64 md:min-h-screen bg-tincar-dark text-white">
        <div className="flex items-center justify-center h-16 border-b border-tincar-gold">
          <span className="text-xl font-bold text-tincar-gold">TinCar SGC</span>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                active === tab.key
                  ? "bg-tincar-gold text-tincar-dark"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => onChange(tab.key)}
            >
              {tab.icon && <tab.icon className="w-5 h-5 mr-2" />}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}