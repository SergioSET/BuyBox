import { Card, Text, Title, TextInput, Button } from "@tremor/react";
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import token from "../../apis/getCookies";


export default function OrderEdit() {
    const orderId = useParams().id;
    const [order, setOrder] = useState({});
    const navigate = useNavigate();

    const handleVolver = () => {
        navigate("/ordersAdmin");
    }


    useEffect(() => {
        fetch(`http://localhost:3000/order/indexId/${orderId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setOrder(data[0]);
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });

    }, [orderId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrder(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/api/order/${orderId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Order updated successfully:', data);
                navigate('/ordersAdmin');
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    };

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <Card className="mt-6">
                <Title>Editar usuario</Title>
                <form onSubmit={handleSubmit}>
                    <Text>Direccion de envio {order.shipping_address}</Text>
                    <TextInput
                        label="Direccion de envio"
                        name="shipping_address"
                        value={order.shipping_address}
                        onChange={handleChange}
                        required
                    />
                    <Text>Estado</Text>
                    <select
                        name="status"
                        value={order.status}
                        onChange={handleChange}
                    >
                        <option value="En proceso">En proceso</option>
                        <option value="Entregado">Entregado</option>
                    </select>
                    <Button type="submit" className="mt-4">Save</Button>
                    <Button onClick={handleVolver} className="mt-4">Volver</Button>
                </form>
            </Card>
        </main>
    );
}