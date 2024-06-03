import React, { useState } from 'react';
// import 'react-confirm-alert/src/react-confirm-alert.css';
// import '../../css/dashboard-user.css';
// import Navbar from '../../components/navbar-user';
import { useLoaderData } from 'react-router-dom';

export const lockerLoader = async ({ request }) => {
    const [orders, setOrders] = useState([]);
    const [userId, setUserId] = localStorage.getItem("userId");

    try {
        const response = await fetch(`http://localhost:3000/api/usuarios/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');

            const data = await response.json();
            setUserId(data.id);
        }
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

            const data = await response.json();
            setOrders(data);
            return data;
        }
    } catch (error) {
        console.log(error.message);
    }

    return null;
}

export default function Locker() {
    const orders = useLoaderData();

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
                    console.log(data);
                    window.location.reload();
                })
                .catch(error => {
                    setError(error.message);
                });
        }
    };

    return (
        <>
            <Navbar />
            <section className="relative">

                <div className="max-w-6xl mx-auto px-4 sm:px-6">

                    <div className="pt-32 pb-12 md:pt-40 md:pb-20">

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
                                    {orders.map((order, index) => (
                                        <tr key={index}>
                                            <td className="align-middle text-center">{order.tracking_number}</td>
                                            <td className="align-middle text-center">{order.description}</td>
                                            <td className="align-middle text-center">{order.status}</td>
                                            <td className="align-middle text-center">{order.shipping_date}</td>
                                            <td className="align-middle text-center">{order.shipping_address}</td>
                                            <td className="align-middle text-center">{order.cost} COP</td>
                                            <td>
                                                <button onClick={() => handleDelete(order.id, order.name)} className="px-4 py-2 bg-red-500 text-white rounded-md ml-4">Eliminar</button>
                                            </td>
                                        </tr>
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
