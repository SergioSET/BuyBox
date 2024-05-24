'use client';

import Link from "next/link";
import React, { useEffect, useState } from 'react';
import './page.css';
import OrderEdit from './OrderEditAdmin'; // Asegúrate de importar OrderEdit

export default function Dashboard() {
    const [orders, setOrders] = useState([]);
    const [userId, setUserId] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [editingOrderId, setEditingOrderId] = useState<number | null>(null);
    const [showOrdersTable, setShowOrdersTable] = useState(true);

    const handleCerrarSesion = () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = '/';
    }

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

    useEffect(() => {
        // Obtener el valor del token de la cookie
        const token = getCookie();

        if (!token) {
            setError('Token not found');
            return;
        }

        // Extraer el ID del token (por ejemplo, si el token es en formato JWT)
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.user; // Suponiendo que el ID del usuario está en la propiedad 'user' del payload
        const userName = payload.username;
        console.log(payload);

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

        fetch(`http://localhost:3000/order/index/${userName}`, {
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

    const handleEdit = (id: number) => {
        setEditingOrderId(id); // Establecer el ID del pedido que se está editando
        setShowOrdersTable(false); // Ocultar OrdersTable
    };

    const handleSave = () => {
        setEditingOrderId(null); // Resetear el ID de edición
        setShowOrdersTable(true); // Mostrar OrdersTable
        // Volver a cargar los datos después de guardar los cambios
        const token = getCookie();
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userName = payload.username;

        fetch(`http://localhost:3000/order/index/${userName}`, {
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
    };

    const handleDelete = (id: number, trackingNumber: string) => {
        if (window.confirm(`¿Estás seguro que deseas borrar el pedido ${trackingNumber}?`)) {
            fetch(`http://localhost:3000/api/order/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Order deleted successfully:', data);
                    setOrders(orders.filter(order => order.orderId !== id));
                })
                .catch(error => {
                    setError(error.message);
                });
        }
    };

    return (
        <section className="relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <div className="flex justify-between items-center mb-8">
                            <div className="text-lg font-semibold text-white">Lista de Pedidos</div>
                            <div className="flex items-center">
                                <input type="text" placeholder="Filter" className="px-4 py-2 border border-gray-300 rounded-md" />
                            </div>
                        </div>
                        {showOrdersTable && ( // Mostrar OrdersTable si showOrdersTable es verdadero
                            <div>
                                {orders.length === 0 ? (
                                    <p className="text-white">No hay pedidos disponibles.</p>
                                ) : (
                                    <table className="tabla-con-divisiones w-full border-collapse">
                                        <thead>
                                            <tr>
                                                <th>Tracking</th>
                                                <th>Descripción</th>
                                                <th>Estado de pedido</th>
                                                <th>Fecha de entrega del pedido</th>
                                                <th>Dirección de entrega</th>
                                                <th>Costo de pedido</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((order, index) => (
                                                <tr key={index}>
                                                    <td className="align-middle text-center">{order.tracking_number}</td>
                                                    <td className="align-middle text-center">{order.description}</td>
                                                    <td className="align-middle text-center">{order.status}</td>
                                                    <td className="align-middle text-center">{order.shipping_date}</td>
                                                    <td className="align-middle text-center">{order.shipping_address}</td>
                                                    <td className="align-middle text-center">{order.cost} COP</td>
                                                    <td className="flex justify-center">
                                                        <button onClick={() => handleEdit(order.orderId)} className="px-4 py-2 bg-blue-500 text-white rounded-md mx-1">Editar</button>
                                                        <button onClick={() => handleDelete(order.orderId, order.tracking_number)} className="px-4 py-2 bg-red-500 text-white rounded-md mx-1">Eliminar</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        )}
                        {editingOrderId !== null && ( // Mostrar OrderEdit si editingOrderId no es nulo
                            <OrderEdit orderId={editingOrderId} onSave={handleSave} />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
