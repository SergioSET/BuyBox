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

type Props = {
  users?: User[];
};


export default function UsersTable() {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

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
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md ml-6 mb-3">Editar</button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-md ml-4">Eliminar</button>
            </TableCell>
            {/* <TableCell>
              <Text>
                {new Intl.DateTimeFormat("en-US").format(user.createdAt)}
              </Text>
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
