"use client";
import { Card, Text, Title, TextInput, Button } from "@tremor/react";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation'

export default function Home() {
  const { id } = useParams();
  const [order, setOrder] = useState({ status: '', shipping_address: '' });
  const router = useRouter()

  useEffect(() => {
    fetch(`http://localhost:3000/api/order/indexId/${id}`, {
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
        console.log(data)
        setOrder(data);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder(prevState => ({
      ...prevState,
      [name]: value,
    }));
    console.log(order);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/api/order/${id}`, {
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
        router.push('/orders-admin');
        console.log('Order updated successfully:', data);
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
        </form>
      </Card>
    </main>
  );
}
