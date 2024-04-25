'use client';

import React, { useState } from 'react';
import Link from "next/link";

export default function CrearPedido() {
    const [nombrePedido, setNombrePedido] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [repartidora, setRepartidora] = useState('0');
    const [peso, setPeso] = useState(0);
    const [largo, setLargo] = useState(0);
    const [ancho, setAncho] = useState(0);
    const [alto, setAlto] = useState(0);
    const [fechaPedido, setFechaPedido] = useState('');
    const [direccionSalida, setDireccionSalida] = useState('');
    const [direccionEntrega, setDireccionEntrega] = useState('');
    const [distancia, setDistancia] = useState(0);

    const handleLimpiarCampos = () => {
        setNombrePedido('');
        setDescripcion('');
        setRepartidora('0');
        setPeso(0);
        setLargo(0);
        setAncho(0);
        setAlto(0);
        setFechaPedido('');
        setDireccionSalida('');
        setDireccionEntrega('');
        setDistancia(0);
    }

    const handleGuardarPedido = () => {
        const costosRepartidora = {
            1: 0.98,
            2: 1.20,
            3: 1.01,
            4: 0.98,
            5: 0.87,
            6: 0.75,
        }

        const costoEnvio = costosRepartidora[repartidora] * distancia;
        const volumen = largo * ancho * alto;
        const costoVolumen = volumen / 5000;
        const costoTotal = costoEnvio + costoVolumen;

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
                                    <input type="text" id="nombrePedido" value={nombrePedido} onChange={(e) => setNombrePedido(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="descripcion" className="block  text-sm font-bold mb-2">
                                        Descripción del pedido
                                    </label>
                                    <textarea id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="repartidora" className="block  text-sm font-bold mb-2">
                                        Repartidora
                                    </label>
                                    <select id="repartidora" value={repartidora} onChange={(e) => setRepartidora(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                        <option value="0">Selecciona una opción</option>
                                        <option value="1">Envíame</option>
                                        <option value="2">Servientrega</option>
                                        <option value="3">Coordinadora</option>
                                        <option value="4">Deprisa</option>
                                        <option value="5">Inter Rapidísimo</option>
                                        <option value="6">TCC</option>
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="peso" className="block  text-sm font-bold mb-2">
                                        Peso del pedido
                                    </label>
                                    <input type="number" id="peso" value={peso} onChange={(e) => setPeso(Number(e.target.value))} className="shadow appearance-none border rounded w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" min="0" step="1" />
                                    <label className="w-1/5 m-3">kgs</label>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="dimensiones" className="block  text-sm font-bold mb-2">
                                        Dimensiones del pedido
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        <label className="w-full">Largo:</label>
                                        <input type="number" id="dimensiones" value={largo} onChange={(e) => setLargo(Number(e.target.value))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" min="0" step="1" />
                                        <label className="w-full">cm</label>
                                        <label className="w-full">Ancho:</label>
                                        <input type="number" id="dimensiones" value={ancho} onChange={(e) => setAncho(Number(e.target.value))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" min="0" step="1" />
                                        <label className="w-full">cm</label>
                                        <label className="w-full">Alto:</label>
                                        <input type="number" id="dimensiones" value={alto} onChange={(e) => setAlto(Number(e.target.value))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" min="0" step="1" />
                                        <label className="w-full">cm</label>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="fechaPedido" className="block  text-sm font-bold mb-2">
                                        Fecha de salida de pedido
                                    </label>
                                    <input type="date" id="fechaPedido" value={fechaPedido} onChange={(e) => setFechaPedido(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="direccionSalida" className="block  text-sm font-bold mb-2">
                                        Dirección de salida
                                    </label>
                                    <input type="text" id="direccionSalida" value={direccionSalida} onChange={(e) => setDireccionSalida(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="direccionEntrega" className="block  text-sm font-bold mb-2">
                                        Dirección de entrega
                                    </label>
                                    <input type="text" id="direccionEntrega" value={direccionEntrega} onChange={(e) => setDireccionEntrega(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="distancia" className="block  text-sm font-bold mb-2">
                                        Distancia a recorrer
                                    </label>
                                    <input type="number" id="distancia" value={distancia} onChange={(e) => setDistancia(Number(e.target.value))} className="shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" min="0" step="1" />
                                    <label className="w-1/5 m-3">km</label>
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
            </div >
        </section >
    )
}