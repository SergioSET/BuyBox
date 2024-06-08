import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import '../../src/styles/dashboard-user.css';
import '../../src/styles/margin.css';

export const userlistloader = async ({ request }) => {
    try {
        const response = await fetch(`http://localhost:3000/api/usuarios`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }

    return null;
}

export default function UserList() {
    const users = useLoaderData();
    const navigate = useNavigate();

    const handleCreate = () => {
        navigate(`/admin/new-user`);
    };

    const handleEdit = (id) => {
        navigate(`/admin/edit-user/${id}`);
    };

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
                    window.location.reload();
                })
                .catch(error => {
                    console.log(error.message);
                });
        }
    };

    return (
        <>
            <section className="relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                        <button onClick={handleCreate} className="btn btn-primary mb-4">Crear nuevo usuario</button>
                        {users.length === 0 ? (
                            <p>No hay usuarios disponibles.</p>
                        ) : (
                            <table className="tabla-con-divisiones">
                                <thead>
                                    <tr>
                                        <th style={{ width: '15%' }}>Nombre</th>
                                        <th style={{ width: '10%' }}>Rol</th>
                                        <th style={{ width: '22%' }}>Correo electrónico</th>
                                        <th style={{ width: '20%' }}>Dirección</th>
                                        <th style={{ width: '15%' }}>Teléfono</th>
                                        <th style={{ width: '20%' }}>Acciones</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.name}</td>
                                            <td>{user.role}</td>
                                            <td>{user.email}</td>
                                            <td>{user.address}</td>
                                            <td>{user.phone}</td>
                                            <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <button onClick={() => handleEdit(user.id)} className="btn btn-primary">Editar</button>
                                                <button onClick={() => handleDelete(user.id)} className="btn btn-error" style={{ marginLeft: '10px' }}>Borrar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
