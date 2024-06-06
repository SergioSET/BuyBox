import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import '../../src/styles/dashboard-user.css';

export const orderlistloader = async ({ request }) => {
    try {
        const response = await fetch(`http://localhost:3000/order/index`, {
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

export default function OrderList() {
    const orders = useLoaderData();
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [status, setStatus] = useState({});
    const [error, setError] = useState(null);

    const handleDelete = (id, tracking_number, name) => {
        if (window.confirm("¿Estás seguro que deseas borrar la orden " + tracking_number + " del usuario " + name + " ? ")) {
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

    const handleStatusChange = (id, newStatus) => {
        fetch(`http://localhost:3000/api/order/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setStatus(prevStatus => ({
                    ...prevStatus,
                    [id]: newStatus,
                }));
            })
            .catch(error => {
                setError(error.message);
            });
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
                    <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                        {Object.keys(groupedOrders).length === 0 ? (
                            <p>No hay pedidos disponibles.</p>
                        ) : (
                            <table className="tabla-con-divisiones">
                                <thead>
                                    <tr>
                                        <th>Usuario</th>
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
                                                <td className="align-middle text-center">{groupedOrders[trackingNumber][0].name}</td>
                                                <td className="align-middle text-center">{trackingNumber}</td>
                                                <td className="align-middle text-center">
                                                    <select
                                                        value={status[groupedOrders[trackingNumber][0].id] || groupedOrders[trackingNumber][0].status}
                                                        onChange={(e) => handleStatusChange(groupedOrders[trackingNumber][0].id, e.target.value)}
                                                    >
                                                        <option value="Pendiente">Pendiente</option>
                                                        <option value="Enviado">Enviado</option>
                                                        <option value="Entregado">Entregado</option>
                                                        <option value="Cancelado">Cancelado</option>
                                                    </select>
                                                </td>
                                                <td className="align-middle text-center">{groupedOrders[trackingNumber][0].shipping_date}</td>
                                                <td className="align-middle text-center">{groupedOrders[trackingNumber][0].address || "N/A"}</td>
                                                <td className="align-middle text-center">{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(groupedOrders[trackingNumber][0].cost)}</td>
                                                <td>
                                                    <button onClick={() => setExpandedOrder(expandedOrder === trackingNumber ? null : trackingNumber)} className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4">
                                                        {expandedOrder === trackingNumber ? "Cerrar" : "Ver Productos"}
                                                    </button>
                                                    <button onClick={() => handleDelete(groupedOrders[trackingNumber][0].orderId, trackingNumber, groupedOrders[trackingNumber][0].name)} className="px-4 py-2 bg-red-500 text-white rounded-md ml-4">
                                                        Borrar orden
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
