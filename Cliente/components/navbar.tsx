'use client'
import React, { useState } from 'react';
import Link from "next/link";

const Navbar = ({ hideDashboard }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCerrarSesion = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/';
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-white mr-4">Dashboard</h1>
        <button className="text-white mr-4" onClick={hideDashboard}>Crear Pedido</button>

      </div>
      <div className="flex items-center">
        <p className="text-white mr-4"></p>
        <div className="relative">
        <button className="text-white" onClick={toggleMenu}>Menu</button>
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

export default Navbar;
