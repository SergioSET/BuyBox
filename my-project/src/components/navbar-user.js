import React, { useState } from 'react';
import { Link } from "react-router-dom";

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
        <h1 className="text-white text-2xl font-bold mr-4">BuyBox</h1> {/* Aumenté el tamaño y la negrita para el título */}
        <Link to="/crear-pedido" className="text-white mr-4">Crear Pedido</Link> {/* Ajusté el estilo del enlace de "Crear Pedido" */}
      </div>
      <div className="flex items-center">
        <div className="relative">
          <button className="text-white px-4 py-2 rounded transition duration-300 hover:bg-gray-700" onClick={toggleMenu}> {/* Agregué estilos al botón de menú */}
            Menu ☰
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg z-10">
              <Link to="/perfil" className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"> {/* Ajusté el estilo del enlace de perfil */}
                Perfil
              </Link>
              <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left" onClick={handleCerrarSesion}> {/* Ajusté el estilo del botón de cerrar sesión */}
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