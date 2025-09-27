import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar({ tabs, active, onChange }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">
      {/* Botón menú móvil */}
      <div className="md:hidden p-4">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <XMarkIcon className="h-8 w-8 text-tincar-gold" />
          ) : (
            <Bars3Icon className="h-8 w-8 text-tincar-gold" />
          )}
        </button>
      </div>

      {/* Menú lateral */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ duration: 0.3 }}
            className="bg-tincar-black text-tincar-gold w-64 min-h-screen p-6 hidden md:block"
          >
            <h1 className="text-2xl font-bold mb-6">TinCar SGC</h1>
            <nav>
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => onChange(tab.key)}
                  className={`flex items-center w-full px-4 py-3 mb-2 rounded-lg transition-colors ${
                    active === tab.key
                      ? "bg-tincar-gold text-tincar-black"
                      : "hover:bg-tincar-gray hover:text-white"
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-3" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
