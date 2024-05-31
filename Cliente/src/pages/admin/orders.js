import { Card, Text, Title } from "@tremor/react";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import OrdersTable from '../../components/ordersTable';
import NavbarAdmin from '../../components/navbar-admin';

export default function OrdersAdmin() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/api/order/index', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setOrders(data);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);

    return (
        <>
            <NavbarAdmin />
            <main className="p-4 md:p-10 mx-auto max-w-7xl">
                <Title>Ordenes</Title>
                <Text>Aquí podrás administrar los atributos de todas las ordenes.</Text>
                <Card>
                    <OrdersTable orders={orders} />
                </Card>
            </main>
        </>
    );
}
