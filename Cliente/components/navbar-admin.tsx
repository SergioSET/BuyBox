import React, { useState } from 'react';
import Link from "next/link";
import Logo from '/images/logo.png';

const Navbar_admin = ({ onUsersClick, onOrdersClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCerrarSesion = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/';
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src={Logo.src} alt="Logo" className="h-8 mr-4" /> {/* Agrega tu logo aquí */}
        <h1 className="text-white text-2xl font-bold">Admin Dashboard</h1> {/* Mejora el título */}
      </div>
      <div className="flex items-center">
        <div className="relative">
          <button className="text-white mr-4 px-4 py-2 rounded transition duration-300 hover:bg-gray-700" onClick={onOrdersClick}>Pedidos</button>
          <button className="text-white mr-4 px-4 py-2 rounded transition duration-300 hover:bg-gray-700" onClick={onUsersClick}>Usuarios</button>
          <button className="text-white px-4 py-2 rounded transition duration-300 hover:bg-gray-700" onClick={toggleMenu}>
          Menú ☰ 
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg z-10">
              <Link href="/perfil" className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                Perfil
              </Link>
              <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left" onClick={handleCerrarSesion}>
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar_admin;