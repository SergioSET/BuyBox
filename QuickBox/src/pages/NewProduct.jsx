    import React, { useState } from "react";
    import { Link, useNavigate } from "react-router-dom";
    import { SectionTitle } from "../components";
    import axios from 'axios';
    import { toast } from "react-toastify";

    const NewProduct = () => {
    const [name, setName] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [price, setPrice] = useState("");
    const [imagen, setImagen] = useState(null);  

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('descripcion', descripcion);
            formData.append('price', price);
            formData.append('imagen', imagen);

            const response = await axios.post('http://localhost:3000/api/product/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success("Producto agregado con exito");

        } catch (error) {
            console.error('Error:', error);
        }
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImagen(file);
    };

    return (
        <>
        <SectionTitle title="Nuevo producto" />
        <div className="flex flex-col justify-center sm:py-12">
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
            <div className="bg-dark border border-gray-600 shadow w-full rounded-lg divide-y divide-gray-200">
                <form className="px-5 py-7" onSubmit={handleSubmit}>
                <label className="font-semibold text-sm pb-1 block text-accent-content">
                    Nombre
                </label>
                <input
                    type="text"
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={true}
                />
                <label className="font-semibold text-sm pb-1 block text-accent-content">
                    Descripcion
                </label>
                <textarea
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required={true}
                />
                <label className="font-semibold text-sm pb-1 block text-accent-content">
                    Precio
                </label>
                <input
                    type="number"
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required={true}
                />
                <label className="font-semibold text-sm pb-1 block text-accent-content">
                    Imagen
                </label>
                <input
                    type="file"
                    accept="image/*"
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                    onChange={handleFileChange}
                    required={true}
                />
                
                <button
                    type="submit"
                    className="transition duration-200 bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                >
                    <span className="inline-block mr-2">Agregar nuevo producto</span>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                    </svg>
                </button>
                </form>
            </div>
            </div>
        </div>
        </>
    );
    };

    export default NewProduct;
