import { Card, Text, Title } from "@tremor/react";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import UsersTable from '../../components/usersTable';
import NavbarAdmin from '../../components/navbar-admin';

export default function UsersAdmin() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

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

    return (
        <>
            <NavbarAdmin />
            <main className="p-4 md:p-10 mx-auto max-w-7xl">
                <Title>Usuarios</Title>
                <Text>Aquí podrás administrar los atributos de todos los usuarios.</Text>
                <Card>
                    <UsersTable users={users} />
                </Card>
            </main>
        </>
    );
}
