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
                        <Link href="/perfil" className="px-4 py-2 bg-blue-500 text-white rounded-md">
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
                            <Link href="/crear-pedido" className="px-4 py-2 bg-blue-500 text-white rounded-md">
                                Crear Pedido
                            </Link>
                        </div>

                    </div>
                    <table className="tabla-con-divisiones">
                        <thead>
                            <tr>
                                <th>Id de pedido</th>
                                <th>Nombre pedido</th>
                                <th>Descripción</th>
                                <th>Estado de pedido</th>
                                <th>Fecha de salida de pedido</th>
                                <th>Dirección de salida</th>
                                <th>Dirección de entrega</th>
                                <th>Costo de pedido</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="align-middle text-center">1</td>
                                <td className="align-middle text-center">Sofa C324</td>
                                <td>Articulo inmueble de alta calidad, delicado y de gran dimensión</td>
                                <td className="align-middle text-center">Estado de pedido</td>
                                <td className="align-middle text-center">Fecha de salida de pedido</td>
                                <td className="align-middle text-center">Dirección de salida</td>
                                <td className="align-middle text-center">Dirección de entrega</td>
                                <td className="align-middle text-center">Costo de pedido</td>
                                <td>
                                    {/* Buttons to edit and delete the pedido */}
                                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md ml-6 mb-3">Editar</button>
                                    <button className="px-4 py-2 bg-red-500 text-white rounded-md ml-4">Eliminar</button>
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