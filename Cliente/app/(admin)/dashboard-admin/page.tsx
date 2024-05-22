
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
      <Title>Administrador</Title>
      <Text>Bienvenido al panel de administrador, desde aquí podrá realizar todas sus funciones.</Text>
    </main>
  );
}
