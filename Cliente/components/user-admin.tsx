"use client";
import { Card, Text, Title } from "@tremor/react";
import UsersTable from "@/components/UsersTable";
import UserEdit from "@/components/UserEdit";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UserAdmin() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:3000/api/usuarios', {
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
        setUsers(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const handleDelete = (id, name) => {
    if (window.confirm(`¿Estás seguro que deseas borrar el usuario ${name}?`)) {
      fetch(`http://localhost:3000/api/usuarios/${id}`, {
        method: 'DELETE',
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
        .then(() => {
          setUsers(users.filter((user) => user.id !== id));
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleSave = (updatedUser) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    setEditingUser(null);
  };

  const handleCreate = () => {
    router.push('/user-create-admin');
  };

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Usuarios</Title>
      <Text>Aquí podrás administrar los atributos de todos los usuarios.</Text>
      <button onClick={handleCreate} className="btn btn-primary">Crear Usuario</button>
      <Card className="mt-6">
        {editingUser ? (
          <UserEdit user={editingUser} onSave={handleSave} />
        ) : (
          <UsersTable users={users} onDelete={handleDelete} onEdit={handleEdit} />
        )}
      </Card>
    </main>
  );
}
