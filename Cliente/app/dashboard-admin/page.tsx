'use client'
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar_admin from '@/components/navbar-admin';

// Cargar OrdersTable dinámicamente
const OrdersTable = dynamic(() => import('@/components/OrdersTable'), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

export default function Dashboard_Admin() {
  const [showOrdersTable, setShowOrdersTable] = useState(false);

  const toggleOrdersTable = () => {
    setShowOrdersTable(prev => !prev);
  };

  return (
    <>
      <Navbar_admin toggleOrdersTable={toggleOrdersTable} />
      {showOrdersTable && <OrdersTable />}
    </>
  );
}
