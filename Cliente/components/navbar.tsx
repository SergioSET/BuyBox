'use client'
import React, { useState } from 'react';

const Navbar = ({  }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-white mr-4">Dashboard</h1>
        <button className="text-white mr-4">Botón 1</button>
        <button className="text-white mr-4">Botón 2</button>
        <button className="text-white mr-4">Botón 3</button>
        <button className="text-white">Botón 4</button>
      </div>
      <div className="flex items-center">
        <p className="text-white mr-4">{}</p>
        <div className="relative">
          <button className="text-white" onClick={toggleMenu}>Menu</button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg">
              <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">Opción 1</button>
              <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">Opción 2</button>
              <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">Opción 3</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
