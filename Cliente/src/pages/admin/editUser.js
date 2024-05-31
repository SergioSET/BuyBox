import { Card, Text, Title, TextInput, Button } from "@tremor/react";
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import NavbarAdmin from '../../components/navbar-admin';
import token from "../../apis/getCookies";

export default function EditUser() {
    const initialUser = useParams().id;
    const [user, setUser] = useState();
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleVolver = () => {
        navigate('/usersAdmin');
    }

    useEffect(() => {
        fetch(`http://localhost:3000/api/usuarios/${initialUser}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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
                setUser(data);
            })
            .catch(error => {
                console.log(error);
                setError(error.message);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
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
                navigate('/usersAdmin');
                console.log('User updated successfully:', data);
            })
            .catch((error) => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <NavbarAdmin />
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
                        <Button onClick={handleVolver} className="mt-4">Volver</Button>
                    </form>
                </Card>
            </main>
        </>
    );
}
