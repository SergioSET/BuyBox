import Link from "next/link";
import React from 'react';
import './page.css'; 

export const metadata = {
    title: 'Dashboard - Pedidos',
    description: 'Page description',
}

export default function Dashboard() {
    return (
        <section className="relative">

            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                    <div className="mr-1 py-4 px-1">
                        <Link href="/perfil" className="px-4 py-2 btn-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md ml-6 mb-3">
                            Perfil
                        </Link>
                    </div>

                    <div className="flex justify-between items-center mb-8">

                        <div className="flex items-center">
                            {/* Filter component */}
                            <input type="text" placeholder="Filter" className="px-4 py-2 border border-gray-300 rounded-md" />
                        </div>

                        <div>
                            {/* Button to create a new pedido */}
                            <Link href="/crear-pedido" className="px-4 py-2 btn-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md ml-6 mb-3">
                                Crear Pedido
                            </Link>
                        </div>

                    </div>
                    <table className="tabla-con-divisiones">
                        <thead>
                            <tr>
                                <th>Tracking</th>
                                <th>Descripción</th>
                                <th>Estado de pedido</th>
                                <th>Fecha de entrega del pedido</th>
                                <th>Dirreción de entrega</th>
                                <th>Costo de pedido</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="align-middle text-center">1234567890</td>
                                <td className="align-middle text-center">Articulo inmueble de alta calidad, delicado y de gran dimensión</td>
                                <td className="align-middle text-center">En camino</td>
                                <td className="align-middle text-center">27/05/2024</td>
                                <td className="align-middle text-center">Calle 72#21G-102</td>
                                <td className="align-middle text-center">$12.829</td>
                                <td>
                                    {/* Buttons to edit and delete the pedido */}
                                    <button className="px-4 py-2 btn-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md ml-6 mb-3">Editar</button>
                                    <button className="px-4 py-2 btn-sm bg-red-600 hover:bg-red-700 text-white rounded-md ml-4">Eliminar</button>
                                </td>
                            </tr>
                            {/* Add more rows here */}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}