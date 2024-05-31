import React from 'react';
import NavbarAdmin from '../../components/navbar-admin';

export default function DashboardAdmin() {
    return (
        <>
            <NavbarAdmin />
            <section className="relative">

                <div className="max-w-6xl mx-auto px-4 sm:px-6">

                    <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                        <p className="text-lg text-gray-600">Bienvenido al panel de administración.</p>
                    </div>
                </div>
            </section>
        </>
    );
}
