import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SectionTitle } from "../components";
import axios from 'axios';
import { toast } from "react-toastify";

const NewUser = () => {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, phone, address, password, role }),
            });
            console.log(response)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            toast.success("Usuario creado con éxito");
            navigate('/admin/user-list'); // Navigate to products page or desired location after successful creation

        } catch (error) {
            toast.error("Error al crear el usuario");
            console.error('Error:', error);
        }
    }

    return (
        <>
            <SectionTitle title="Nuevo usuario" />
            <div className="flex flex-col justify-center sm:py-12">
                <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                    <div className="bg-dark border border-gray-600 shadow w-full rounded-lg divide-y divide-gray-200">
                        <form className="px-5 py-7" onSubmit={handleSubmit}>
                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                Nombre
                            </label>
                            <input
                                type="text"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                Rol
                            </label>
                            <select className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" value={role} onChange={(e) => setRole(e.target.value)} required>
                                <option value="">Selecciona un rol</option>
                                <option value="Admin">Admin</option>
                                <option value="Usuario">Usuario</option>
                            </select>
                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                Número de teléfono
                            </label>
                            <input
                                type="number"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                Dirección
                            </label>
                            <input
                                type="text"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                className="transition duration-200 bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                            >
                                <span className="inline-block mr-2">Agregar nuevo usuario</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-4 h-4 inline-block"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewUser;
