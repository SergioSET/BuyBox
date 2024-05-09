'use client';

import Link from "next/link";
import React, { useEffect, useState } from 'react';
import './page.css';

export default function Dashboard() {
    const [orders, setOrders] = useState([]);
    const [userId, setUserId] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const handleCerrarSesion = () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = '/';
    }

    useEffect(() => {
        const getCookie = (): string | null => {
            const name = 'token=';
            const decodedCookie = decodeURIComponent(document.cookie);
            const cookieArray = decodedCookie.split(';');

            for (let i = 0; i < cookieArray.length; i++) {
                let cookie = cookieArray[i];

                while (cookie.charAt(0) === ' ') {
                    cookie = cookie.substring(1);
                }

                if (cookie.indexOf(name) === 0) {
                    return cookie.substring(name.length, cookie.length);
                }
            }

            return null; // Retorna null si no se encuentra la cookie
        };

        // Obtener el valor del token de la cookie
        const token = getCookie();

        if (!token) {
            setError('Token not found');
            return;
        }

        // Extraer el ID del token (por ejemplo, si el token es en formato JWT)
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.user; // Suponiendo que el ID del usuario está en la propiedad 'user' del payload

        // Realizar la solicitud fetch a la API con el ID extraído
        fetch(`http://localhost:3000/api/usuarios/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Opcional, dependiendo de cómo manejes la autenticación en tu API
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUserId(data.id);
            })
            .catch(error => {
                setError(error.message);
            });

        fetch(`http://localhost:3000/order/index/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setOrders(data);
            })
            .catch(error => {
                setError(error.message);
            });
    }, []);

    return (
        <section className="relative">

            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                    <div className="mr-1 py-4 px-1">
                        <Link href="/perfil" className="px-4 py-2 btn-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md ml-6 mb-3">
                            Perfil
                        </Link>
                        <button className="px-4 py-2 btn-sm text-white bg-red-500 hover:bg-red-600 rounded-md ml-6 mb-3" onClick={handleCerrarSesion}>
                            Cerrar Sesión
                        </button>
                    </div>

                    <div className="flex justify-between items-center mb-8">

                        <div className="flex items-center">
                            {/* Filter component */}
                            <input type="text" placeholder="Filter" className="px-4 py-2 border border-gray-300 rounded-md" />
                        </div>

                        <div>
                            {/* Button to create a new pedido */}
                            <Link href="/crear-pedido" className="px-4 py-2 btn-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md ml-6 mb-3">
                                Crear Pedido
                            </Link>
                        </div>

                    </div>

                    {orders.length === 0 ? (
                        <p>No hay pedidos disponibles.</p>
                    ) : (
                        <table className="tabla-con-divisiones">
                            <thead>
                                <tr>
                                    <th>Tracking</th>
                                    <th>Descripción</th>
                                    <th>Estado de pedido</th>
                                    <th>Fecha de entrega del pedido</th>
                                    <th>Dirreción de entrega</th>
                                    <th>Costo de pedido</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order: { tracking_number: string, description: string, status: string, shipping_date: string, shipping_address: string, cost: string }, index: number) => (
                                    <tr key={index}>
                                        <td className="align-middle text-center">{order.tracking_number}</td>
                                        <td className="align-middle text-center">{order.description}</td>
                                        <td className="align-middle text-center">{order.status}</td>
                                        <td className="align-middle text-center">{order.shipping_date}</td>
                                        <td className="align-middle text-center">{order.shipping_address}</td>
                                        <td className="align-middle text-center">{order.cost} COP</td>
                                        <td>
                                            <button className="px-4 py-2 bg-blue-500 text-white rounded-md ml-6 mb-3">Editar</button>
                                            <button className="px-4 py-2 bg-red-500 text-white rounded-md ml-4">Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </section>
    )
}