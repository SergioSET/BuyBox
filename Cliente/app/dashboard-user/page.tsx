'use client'
import React, { useState } from 'react';
import Navbar from '@/components/navbar';
import Dashboard from '@/components/dashboard';
import CrearPedido from '@/components/crear-pedido';

export default function Dashboard_usuario() {
  const [isDashboardVisible, setIsDashboardVisible] = useState(true);

  const hideDashboard = () => {
    setIsDashboardVisible(false);
  };

  const handleShowDashboard = () => {
    setIsDashboardVisible(true);
  };

  return (
    <>
      <Navbar hideDashboard={hideDashboard} />
      {isDashboardVisible ? <Dashboard /> : <CrearPedido showDashboard={handleShowDashboard} />}
    </>
  );
}
