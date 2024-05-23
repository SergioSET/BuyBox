'use client';

import { User } from "@prisma/client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import UserEdit from './user-edit';
import './page.css'; // Asegúrate de importar el CSS

type Props = {
  users?: User[];
};

export default function UsersTable() {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const router = useRouter();

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
          setUsers(users.filter(user => user.id !== id));
        })
        .catch(error => {
          setError(error.message);
        });
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleSave = (updatedUser: User) => {
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
    setEditingUser(null);
  };

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
  }, []);

  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-12 md:pt-40 md:pb-20">
      {editingUser ? (
        <UserEdit user={editingUser} onSave={handleSave} />
      ) : (
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-8">
            <div className="text-lg font-semibold text-white">Lista de Usuarios</div>
          </div>
          <table className="tabla-con-divisiones w-full border-collapse">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Dirección</th>
                <th>Rol</th>
                <th>Fecha creación</th>
                <th>Fecha actualización</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user.id}>
                  <td className="align-middle text-center">{user.name}</td>
                  <td className="align-middle text-center">
                    <span>{user.email ?? 'Sin correo'}</span>
                  </td>
                  <td className="align-middle text-center">
                    <span>{user.direccion ?? 'Sin dirección'}</span>
                  </td>
                  <td className="align-middle text-center">
                    {user.admin === 1 ? "Administrador" : "Usuario"}
                  </td>
                  <td className="align-middle text-center">
                    <span>{user.created_at}</span>
                  </td>
                  <td className="align-middle text-center">
                    <span>{user.updated_at}</span>
                  </td>
                  <td className="flex justify-center">
                    <button onClick={() => handleEdit(user)} className="px-4 py-2 bg-blue-500 text-white rounded-md mx-1">Editar</button>
                    <button onClick={() => handleDelete(user.id, user.name)} className="px-4 py-2 bg-red-500 text-white rounded-md mx-1">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
