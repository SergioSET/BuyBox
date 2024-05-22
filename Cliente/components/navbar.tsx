"use client"; 

import React, { useState } from 'react';

const Navbar = () => {
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
      <div className="flex items-center relative">
        <p className="text-white mr-4">Usuario</p>
        <button onClick={toggleMenu} className="text-white">Menu</button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10000">
            <ul>
              <li className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer">Opción 1</li>
              <li className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer">Opción 2</li>
              <li className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer">Opción 3</li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
