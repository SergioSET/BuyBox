// page.tsx
'use client'
import React, { useState } from 'react';
import Navbar_admin from '@/components/navbar-admin';
import UsersTable from '@/components/UsersTable';
import OrdersTable from '@/components/OrdersTable';


export default function AdminPage() {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleUsersClick = () => {
    setActiveComponent('UsersTable');
  };

  const handleOrdersClick = () => {
    setActiveComponent('OrdersTable');
  };

  return (
    <>
      <Navbar_admin onUsersClick={handleUsersClick} onOrdersClick={handleOrdersClick} />
      <div>
        {/* Renderizado condicional del componente activo */}
        {activeComponent === 'UsersTable' && <UsersTable />}
        {activeComponent === 'OrdersTable' && <OrdersTable />}
      </div>
    </>
  );
}
