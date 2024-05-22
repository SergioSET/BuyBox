
import { Card, Text, Title } from "@tremor/react";
import Search from "@/components/Search";
import UsersTable from "@/components/UsersTable";
import React, { useEffect, useState } from 'react';

type Props = {
  searchParams: {
    q: string;
  };
};

export default function Home() {

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Usuarios</Title>
      <Text>Aquí podrás administrador los atributos de todos los usuarios.</Text>
      <Search />
      <Card className="mt-6">
        <UsersTable />
      </Card>
    </main>
  );
}
