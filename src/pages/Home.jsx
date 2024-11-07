import React, { useState } from "react";
import { FaIdCard, FaPlus, FaUser, FaKey } from "react-icons/fa6";
import SideBar from "../components/SideBar";

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);

  const menus = [
    {
      name: "Nueva Tarea",
      link: "/nueva-tarea",
      icon: FaPlus,
    },
    {
      name: "Mi Perfil",
      link: "/mi-perfil",
      icon: FaUser,
    },
    {
      name: "Mis Datos",
      link: "/mis-datos",
      icon: FaIdCard,
      margin: true,
    },
    {
      name: "Cerrar Sesión",
      link: "/cerrar-sesion",
      icon: FaKey,
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar menus={menus} open={isOpen} setOpen={setIsOpen} />

      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 bg-blue-600 text-white">
          <h1 className="text-lg">Dashboard</h1>
        </header>

        <main className="p-4">
          {/* aca iria el contenido de la página */}
          <h2>Bienvenido al Dashboard</h2>
          <p>Aquí puedes gestionar tus tareas y tu perfil.</p>
        </main>
      </div>
    </div>
  );
}
