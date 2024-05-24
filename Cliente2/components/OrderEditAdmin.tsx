'use client'
import { Card, Text, Title, TextInput, Button } from "@tremor/react";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface OrderEditProps {
  orderId: number;
  onSave: () => void; // Definir el tipo de la función onSave
}

export default function OrderEdit({ orderId, onSave }: OrderEditProps) {
  const [order, setOrder] = useState({});
  const [user, setUser] = useState({});
  const router = useRouter();

  const handleVolver = () => {
    if (user.admin === 1) {
      window.location.href = '/dashboard-admin';
    }
    else {
      window.location.href = '/dashboard-user';
    }
  }

  useEffect(() => {
    fetch(`http://localhost:3000/api/order/indexId/${orderId}`, {
      method: "GET",
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
        setOrder(data);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });

      fetch(`http://localhost:3000/api/usuarios/${order.id_usuario}`, {
        method: "GET",
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
          setUser(data);
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
        onSave(); // Llamar a la función onSave pasada desde OrdersTable
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