'use client';

import { User } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from "@tremor/react";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'

type Props = {
  users?: User[];
};


export default function UsersTable() {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()

  const handleDelete = (id: number, name: String) => {

    if (window.confirm("¿Estás seguro que deseas borrar el usuario " + name + "?")) {
      fetch(`http://localhost:3000/api/usuarios/${id}`, {
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
          console.log('User deleted successfully:', data);
          router.push('/users-admin');
        })
        .catch(error => {
          setError(error.message);
        });
    }
  };

  const handleEdit = (id: number) => {
    router.push('/user-edit-admin/' + id);
  }


  useEffect(() => {
    fetch(`http://localhost:3000/api/usuarios`, {
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
        setUsers(data);
      })
      .catch(error => {
        setError(error.message);
      });
  });

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Nombre</TableHeaderCell>
          <TableHeaderCell>Correo</TableHeaderCell>
          <TableHeaderCell>Dirección</TableHeaderCell>
          <TableHeaderCell>Rol</TableHeaderCell>
          <TableHeaderCell>Fecha creación</TableHeaderCell>
          <TableHeaderCell>Fecha actualización</TableHeaderCell>
          <TableHeaderCell>Acciones</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users?.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>
              <Text>{user.email ?? 'Sin correo'}</Text>
            </TableCell>
            <TableCell>
              <Text>{user.direccion ?? 'Sin dirección'}</Text>
            </TableCell>
            <TableCell>
              {user.admin === 1 ? "Administrador" : "Usuario"}
            </TableCell>
            <TableCell>
              <Text>{user.created_at}</Text>
            </TableCell>
            <TableCell>
              <Text>{user.updated_at}</Text>
            </TableCell>
            <TableCell>
              <button onClick={() => handleEdit(user.id)} className="px-4 py-2 bg-blue-500 text-white rounded-md ml-6 mb-3">Editar</button>
              <button onClick={() => handleDelete(user.id, user.name)} className="px-4 py-2 bg-red-500 text-white rounded-md ml-4">Eliminar</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
