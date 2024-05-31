import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/logo.png';

export default function NavbarAdmin() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleCerrarSesion = () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        navigate('/');
    };

    const handleUsers = () => {
        navigate('/usersAdmin');
    };

    const handleOrders = () => {
        navigate('/ordersAdmin');
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
            <div className="flex items-center">
                <img src={Logo} alt="Logo" className="h-8 mr-4" /> {/* Agrega tu logo aquí */}
                <h1 className="text-white text-2xl font-bold">Admin Dashboard</h1> {/* Mejora el título */}
            </div>
            <div className="flex items-center">
                <div className="relative">
                    <button className="text-white mr-4 px-4 py-2 rounded transition duration-300 hover:bg-gray-700" onClick={handleOrders}>Pedidos</button>
                    <button className="text-white mr-4 px-4 py-2 rounded transition duration-300 hover:bg-gray-700" onClick={handleUsers}>Usuarios</button>
                    <button className="text-white px-4 py-2 rounded transition duration-300 hover:bg-gray-700" onClick={toggleMenu}>
                        Menú ☰
                    </button>
                    {menuOpen && (
                        <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg z-10">
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
