// user-edit.tsx
"use client";
import { Card, Text, Title, TextInput, Button } from "@tremor/react";
import React, { useEffect, useState } from 'react';

type Props = {
  user: {
    id: number;
    name: string;
    email: string;
    direccion: string;
    admin: number;
  };
  onSave: (user: any) => void;
};

export default function UserEdit({ user: initialUser, onSave }: Props) {
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(`http://localhost:3000/api/usuarios/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        onSave(data);
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  };

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Card className="mt-6">
        <Title>Editar usuario</Title>
        <form onSubmit={handleSubmit}>
          <Text>Nombre</Text>
          <TextInput
            label="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
          <Text>Correo electronico</Text>
          <TextInput
            label="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          <Text>Dirección</Text>
          <TextInput
            label="Address"
            name="direccion"
            value={user.direccion}
            onChange={handleChange}
          />
          <Text>Rol</Text>
          <select
            name="admin"
            value={user.admin}
            onChange={handleChange}
          >
            <option value="1">Administrador</option>
            <option value="0">Usuario</option>
          </select>
          <Button type="submit" className="mt-4">Save</Button>
        </form>
      </Card>
    </main>
  );
}
