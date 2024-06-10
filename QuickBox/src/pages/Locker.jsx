import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import '../../src/styles/dashboard-user.css';

export const lockerLoader = async ({ request }) => {
    if (localStorage.getItem("isLoggedIn") !== true) {
        return null;
    }

    const userId = JSON.parse(localStorage.getItem("user")).id || {};

    try {
        const response = await fetch(`http://localhost:3000/api/usuarios/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
    } catch (error) {
        console.log(error.message);
    }

    try {
        const response = await fetch(`http://localhost:3000/order/list/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }

    return null;
}

export default function Locker() {
    const orders = useLoaderData();
    const [expandedOrder, setExpandedOrder] = useState(null);

    const handleDelete = (id, name) => {
        if (window.confirm("¿Estás seguro que deseas borrar la orden " + name + "?")) {
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
                    window.location.reload();
                })
                .catch(error => {
                    setError(error.message);
                });
        }
    };

    // Agrupar órdenes por número de seguimiento
    const groupedOrders = orders.reduce((acc, order) => {
        if (!acc[order.tracking_number]) {
            acc[order.tracking_number] = [];
        }
        acc[order.tracking_number].push(order);
        return acc;
    }, {});

    return (
        <>
            <section className="relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="pt-22 pb-20 md:pt-20 md:pb-20">
                        {Object.keys(groupedOrders).length === 0 ? (
                            <p>No hay pedidos disponibles.</p>
                        ) : (
                            <table className="tabla-con-divisiones">
                                <thead>
                                    <tr>
                                        <th>Tracking</th>
                                        <th>Estado de pedido</th>
                                        <th>Fecha de entrega del pedido</th>
                                        <th>Dirección de entrega</th>
                                        <th>Costo de pedido</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(groupedOrders).map((trackingNumber, index) => (
                                        <React.Fragment key={index}>
                                            <tr>
                                                <td className="align-middle text-center">{trackingNumber}</td>
                                                <td className="align-middle text-center">{groupedOrders[trackingNumber][0].status}</td>
                                                <td className="align-middle text-center">{groupedOrders[trackingNumber][0].shipping_date}</td>
                                                <td className="align-middle text-center">{groupedOrders[trackingNumber][0].address || "N/A"}</td>
                                                <td className="align-middle text-center">{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(groupedOrders[trackingNumber][0].cost)}</td>
                                                <td>
                                                    <button onClick={() => setExpandedOrder(expandedOrder === trackingNumber ? null : trackingNumber)} className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4">
                                                        {expandedOrder === trackingNumber ? "Cerrar" : "Ver Productos"}
                                                    </button>
                                                </td>
                                            </tr>
                                            {expandedOrder === trackingNumber && groupedOrders[trackingNumber].map((order, i) => (
                                                <tr key={`expanded_${i}`}>
                                                    <td colSpan="7">
                                                        <div className="mt-4">
                                                            <h3>Productos de la orden:</h3>
                                                            <ul>
                                                                <li>{order.product_name} - Cantidad: {order.quantity}</li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
