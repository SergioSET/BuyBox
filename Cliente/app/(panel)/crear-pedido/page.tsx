'use client';

import React, { useState } from 'react';
import Link from "next/link";
import { confirmAlert } from 'react-confirm-alert';
import "react-confirm-alert/src/react-confirm-alert.css";

export default function CrearPedido() {
    const [tracking, setTracking] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [repartidora, setRepartidora] = useState('0');
    const [peso, setPeso] = useState(0);
    const [largo, setLargo] = useState(0);
    const [ancho, setAncho] = useState(0);
    const [alto, setAlto] = useState(0);
    const [direccionEntrega, setDireccionEntrega] = useState('');
    const [distancia, setDistancia] = useState(0);

    const handleLimpiarCampos = () => {
        setTracking('');
        setDescripcion('');
        setRepartidora('0');
        setPeso(0);
        setLargo(0);
        setAncho(0);
        setAlto(0);
        setDireccionEntrega('');
        setDistancia(0);
    }

    const handleGuardarPedido = () => {
        const costosRepartidora: { [key: number]: number } = {
            1: 0.05,  // Costo base más bajo
            2: 0.06,
            3: 0.055,
            4: 0.05,
            5: 0.045,
            6: 0.04,   // Costo base más alto
        }

        const costoRepartidora = costosRepartidora[Number(repartidora)];
        const costoDimensiones = 5000 + (largo * ancho * alto * costoRepartidora);  // Ajuste del costo base
        const costoDistancia = 5000 + distancia * (costoRepartidora * 10);  // Ajuste del costo base
        const costoPeso = 5000 + peso * (costoRepartidora * 10);  // Ajuste del costo base
        const costoTotal = costoDimensiones + costoDistancia + costoPeso;  // Suma de costos en lugar de multiplicación

        confirmAlert({
            title: 'Confirmar guardar pedido',
            message: `¿Estás seguro de guardar el pedido con un costo total de $${costoTotal}?`,
            buttons: [
                {
                    label: 'Sí',
                    onClick: () => {
                        // Lógica para guardar pedido
                        // alert('Pedido guardado exitosamente');
                        alert('Esta función no está implementada');
                        // handleLimpiarCampos();
                    }
                },
                {
                    label: 'No',
                    // onClick: () => {
                    //     alert('Pedido no guardado');
                    // }
                }
            ]
        });
    }

    return (
        <section className="relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                    <div className="justify-between items-center mb-8">
                        <div className="w-full mt-5">
                            <h1 className="h1 mb-3">Crear Pedido</h1>
                            <form action="" className="grid grid-cols-3 gap-6">
                                <div className="mb-4">
                                    <label htmlFor="tracking" className="block text-sm font-bold mb-2">
                                        Tracking
                                    </label>
                                    <input type="text" id="tracking" value={tracking} onChange={(e) => setTracking(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
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