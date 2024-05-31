
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/page.css';

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleDelete = (id, name) => {
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

  const handleEdit = (user) => {
    navigate(`/usersEdit/${user.id}`);
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


  const handleCreate = () => {
    navigate('/usersCreate');
  };

  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-12 md:pt-40 md:pb-20">
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-8">
          <div className="text-lg font-semibold text-white">Lista de Usuarios</div>
          <button onClick={handleCreate} className="px-4 py-2 bg-green-500 text-white rounded-md mx-1">Crear Usuario</button>
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
                  {user.admin === '1' ? "Administrador" : "Usuario"}
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
    </div>
  );
}
