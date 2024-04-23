import Link from "next/link";

export const metadata = {
    title: 'Dashboard - Pedidos',
    description: 'Page description',
}

export default function Dashboard() {
    return (
        <section className="relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">
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
                    {/* Table component */}
                    <table id="myTable" className="w-full">
                        {/* Table header */}
                        <thead>
                            <tr>
                                <th>Id de pedido</th>
                                <th>Nombre pedido</th>
                                <th>Descripción</th>
                                <th>Estado de pedido</th>
                                <th>Fecha de salida de pedido</th>
                                <td>Dirreción de salida</td>
                                <th>Dirreción de entrega</th>
                                <th>Costo de pedido</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        {/* Table body */}
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Sofa C324</td>
                                <td>Articulo inmueble de alta calidad, delicado y de gran dimensión</td>
                                <td>Estado de pedido</td>
                                <td>Fecha de salida de pedido</td>
                                <td>Dirreción de salida</td>
                                <td>Dirreción de entrega</td>
                                <td>Costo de pedido</td>
                                <td>
                                    {/* Buttons to edit and delete the pedido */}
                                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Editar</button>
                                    <button className="px-4 py-2 bg-red-500 text-white rounded-md">Eliminar</button>
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