'use client';

import Link from "next/link";

// export const metadata = {
//     title: 'Crear Pedido',
//     description: 'Page description',
// }

export default function CrearPedido() {
    const handleLimpiarCampos = () => {
        console.log('Limpiar campos');
    }

    const handleGuardarPedido = () => {
        console.log('Guardar Pedido');
    }

    'use client';

    return (
        <section className="relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                    <div className="justify-between items-center mb-8">
                        <div className="w-full mt-5">
                            <h1 className="h1 mb-3">Crear Pedido</h1>
                            <form action="" className="grid grid-cols-3 gap-6">
                                <div className="mb-4">
                                    <label htmlFor="nombrePedido" className="block text-sm font-bold mb-2">
                                        Nombre pedido
                                    </label>
                                    <input type="text" id="nombrePedido" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="descripcion" className="block  text-sm font-bold mb-2">
                                        Descripción del pedido
                                    </label>
                                    <textarea id="descripcion" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="repartidora" className="block  text-sm font-bold mb-2">
                                        Repartidora
                                    </label>
                                    <select id="repartidora" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                        <option value="0">Selecciona una opción</option>
                                        <option value="1">Envíame</option>
                                        <option value="2">Servientrega</option>
                                        <option value="3">Coordinadora</option>
                                        <option value="2">Deprisa</option>
                                        <option value="3">Inter Rapidísimo</option>
                                        <option value="3">TCC</option>
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="peso" className="block  text-sm font-bold mb-2">
                                        Peso del pedido
                                    </label>
                                    <input type="number" id="peso" className="shadow appearance-none border rounded w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" min="0" step="1" />
                                    <label className="w-1/5 m-3">kgs</label>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="dimensiones" className="block  text-sm font-bold mb-2">
                                        Dimensiones del pedido
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        <label className="w-full">Largo:</label>
                                        <input type="number" id="dimensiones" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" min="0" step="1" />
                                        <label className="w-full">cm</label>
                                        <label className="w-full">Ancho:</label>
                                        <input type="number" id="dimensiones" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" min="0" step="1" />
                                        <label className="w-full">cm</label>
                                        <label className="w-full">Alto:</label>
                                        <input type="number" id="dimensiones" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" min="0" step="1" />
                                        <label className="w-full">cm</label>
                                    </div>
                                </div>
                                {/*                                 
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div> */}

                                <div className="mb-4">
                                    <label htmlFor="fechaPedido" className="block  text-sm font-bold mb-2">
                                        Fecha de salida de pedido
                                    </label>
                                    <input type="date" id="fechaPedido" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="direccionSalida" className="block  text-sm font-bold mb-2">
                                        Dirección de salida
                                    </label>
                                    <input type="text" id="direccionSalida" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="direccionEntrega" className="block  text-sm font-bold mb-2">
                                        Dirección de entrega
                                    </label>
                                    <input type="text" id="direccionEntrega" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>

                            </form>
                        </div>

                        <div className="w-full flex justify-center items-center mt-5">
                            <Link href={"/dashboard"} className="px-4 py-2 bg-blue-500 text-white rounded-md">
                                Regresar a Pedidos
                            </Link>

                            <button className="px-4 py-2 bg-red-500 text-white rounded-md ml-2" onClick={handleLimpiarCampos}>
                                Limpiar campos
                            </button>

                            <button className="px-4 py-2 bg-green-500 text-white rounded-md ml-2" onClick={handleGuardarPedido}>
                                Guardar Pedido
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}