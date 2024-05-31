import React, { useEffect, useState } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../css/dashboard-user.css';
import Navbar from '../../components/navbar-user';
import token from "../../apis/getCookies";


export default function DashboardUser() {
    const [orders, setOrders] = useState([]);
    const [userId, setUserId] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCookie = () => {
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

            return null;
        };

        const token = getCookie();
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
                console.log(error.message);
            });

        fetch(`http://localhost:3000/order/list/${userId}`, {
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
                console.log(error.message);
            });
    }, []);

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
                    setOrders(orders.filter(order => order.id !== id));
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
