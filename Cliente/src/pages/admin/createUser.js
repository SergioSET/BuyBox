import { Card, Text, Title, TextInput, Button } from "@tremor/react";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateUser() {
    const [user, setUser] = useState({ name: '', email: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value,
        }));
        console.log(user);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/api/usuarios`, {
            method: "POST",
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
            .then(data => {
                navigate('/usersAdmin');
                console.log('User updated successfully:', data);
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    };

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <Card className="mt-6">
                <Title>Crear usuario</Title>
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
                        <option value="0">Usuario</option>
                        <option value="1">Administrador</option>
                    </select>
                    <Text>Contraseña</Text>
                    <TextInput
                        label="Password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                    <Button type="submit" className="mt-4">Save</Button>
                </form>
            </Card>
        </main>
    );
}
