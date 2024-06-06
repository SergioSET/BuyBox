import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import '../../src/styles/dashboard-user.css';

export const productlistloader = async ({ request }) => {
    try {
        const response = await fetch(`http://localhost:3000/api/product`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }

    return null;
}

export default function ProductList() {
    const products = useLoaderData();
    const navigate = useNavigate();
    const [visibleImages, setVisibleImages] = useState({});

    const handleCreate = () => {
        navigate(`/admin/new-product`);
    };

    const handleEdit = (id) => {
        navigate(`/admin/edit-product/${id}`);
    };

    const handleDelete = (id, name) => {
        if (window.confirm("¿Estás seguro que deseas borrar el producto " + name + "?")) {
            fetch(`http://localhost:3000/api/product/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    window.location.reload();
                })
                .catch(error => {
                    console.log(error.message);
                });
        }
    };

    const toggleImageVisibility = (id) => {
        setVisibleImages((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    return (
        <>
            <section className="relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                        <button onClick={handleCreate} className="btn btn-primary mb-4">Crear nuevo producto</button>
                        {products.length === 0 ? (
                            <p>No hay productos disponibles.</p>
                        ) : (
                            <table className="tabla-con-divisiones">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Descripción</th>
                                        <th>Imagen</th>
                                        <th>Precio</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product.id}>
                                            <td>{product.name}</td>
                                            <td>{product.description}</td>
                                            <td>
                                                {visibleImages[product.id] ? (
                                                    <img
                                                        src={product.img}
                                                        alt={product.name}
                                                        onClick={() => toggleImageVisibility(product.id)}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                ) : (
                                                    <button
                                                        onClick={() => toggleImageVisibility(product.id)}
                                                        className="btn btn-primary"
                                                    >
                                                        Mostrar imagen
                                                    </button>
                                                )}
                                            </td>
                                            <td>{product.price}</td>
                                            <td>
                                                <button onClick={() => handleEdit(product.id)} className="btn btn-primary">Editar</button>
                                                <button onClick={() => handleDelete(product.id, product.name)} className="btn btn-danger">Borrar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
