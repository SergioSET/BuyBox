"use client";
import { Card, Text, Title } from "@tremor/react";
import UsersTable from "@/components/UsersTable";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'

type Props = {
  searchParams: {
    q: string;
  };
};

export default function User_Admin() {
  const router = useRouter()

  const handleCreate = () => {
    router.push('/user-create-admin');
  }
  
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Usuarios</Title>
      <Text>Aquí podrás administrador los atributos de todos los usuarios.</Text>
      <button onClick={handleCreate} className="btn btn-primary">Crear Usuario</button>
      <Card className="mt-6">
        <UsersTable />
      </Card>
    </main>
  );
}
