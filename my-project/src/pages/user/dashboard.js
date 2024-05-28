import React, { useState } from 'react';
import Navbar from '../../components/navbar-user';
// import Dashboard from '../../components/dashboard';
// import CrearPedido from '../../componentscrear-pedido';

export default function DashboardUser() {
    const [isDashboardVisible, setIsDashboardVisible] = useState(true);

    const hideDashboard = () => {
        setIsDashboardVisible(false);
    };

    const handleShowDashboard = () => {
        setIsDashboardVisible(true);
    };

    return (
        <>
            <Navbar></Navbar>
            {/* <Navbar hideDashboard={hideDashboard} />
            {isDashboardVisible ? <Dashboard /> : <CrearPedido showDashboard={handleShowDashboard} />} */}
        </>
    );
}
