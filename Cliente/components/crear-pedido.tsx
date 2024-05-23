'use client';

import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useRouter } from 'next/navigation';

export default function CrearPedido({ showDashboard }) {
    const router = useRouter();
    const [tracking, setTracking] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [repartidora, setRepartidora] = useState('0');
    const [peso, setPeso] = useState(0);
    const [largo, setLargo] = useState(0);
    const [ancho, setAncho] = useState(0);
    const [alto, setAlto] = useState(0);
    const [direccionEntrega, setDireccionEntrega] = useState('');
    const [distancia, setDistancia] = useState(0);
    const [userId, setUserId] = useState(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getCookie = (): string | null => {
            const name = 'token=';
            const decodedCookie = decodeURIComponent(document.cookie);
            const cookieArray = decodedCookie.split(';');
            for (let i = 0; i < cookieArray.length; i++) {
                let cookie = cookieArray[i];
                while (cookie.charAt(0) === ' ') {
                    cookie = cookie.substring(1);
                }
                if (cookie.indexOf(name) === 0) {
                    return cookie.substring(name.length, cookie.length);
                }
            }
            return null;
        };

        const token = getCookie();

        if (!token) {
            setError('Token not found');
            return;
        }

        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.user;

        fetch(`http://localhost:3000/api/usuarios/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUserId(data.id);
            })
            .catch(error => {
                setError(error.message);
            });
    }, []);

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

    const handleSubmit = async (costoTotal: number) => {
        const response = await fetch('http://localhost:3000/order/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId,
                tracking,
                descripcion,
                direccionEntrega,
                costoTotal
            }),
        });

        if (response.ok) {
            showDashboard();
        } else {
            alert('Error al guardar el pedido');
        }
    }

    const handleGuardarPedido = () => {
        const costosRepartidora: { [key: number]: number } = {
            1: 0.05,
            2: 0.06,
            3: 0.055,
            4: 0.05,
            5: 0.045,
            6: 0.04,
        }

        const costoRepartidora = costosRepartidora[Number(repartidora)];
        const costoDimensiones = 5000 + (largo * ancho * alto * costoRepartidora);
        const costoDistancia = 5000 + distancia * (costoRepartidora * 10);
        const costoPeso = 5000 + peso * (costoRepartidora * 10);
        const costoTotal = Math.floor(costoDimensiones + costoDistancia + costoPeso);

        confirmAlert({
            title: 'Confirmar guardar pedido',
            message: `¿Estás seguro de guardar el pedido con un costo total de $${costoTotal}?`,
            buttons: [
                {
                    label: 'Sí',
                    onClick: () => {
                        handleSubmit(costoTotal);
                    }
                },
                {
                    label: 'No',
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
                            <button className="px-4 btn-sm text-white bg-blue-500 hover:bg-blue-700 rounded-md ml-6 mb-3" onClick={showDashboard}>
                                Regresar a Pedidos
                            </button>

                            <button className="px-4 py-2 btn-sm text-white bg-red-500 hover:bg-red-700 rounded-md ml-6 mb-3" onClick={handleLimpiarCampos}>
                                Limpiar campos
                            </button>

                            <button className="px-4 py-2 btn-sm text-white bg-green-500 hover:bg-green-700 rounded-md ml-6 mb-3" onClick={handleGuardarPedido}>
                                Guardar Pedido
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </section>
    )
}
