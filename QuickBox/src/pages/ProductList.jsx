import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import '../../src/styles/dashboard-user.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faEye, faPlus, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

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
    const [modalImage, setModalImage] = useState(null);

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

    const toggleImageVisibility = (id, imgSrc = null) => {
        setModalImage(imgSrc);
        setVisibleImages(prevState => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const closeModal = () => {
        setModalImage(null);
    };


    const modalStyles = {
        display: 'flex', // Usa flexbox para el modal
        justifyContent: 'center', // Centra horizontalmente
        alignItems: 'center', // Centra verticalmente
        position: 'fixed',
        zIndex: 1,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        overflow: 'auto',
        backgroundColor: 'rgba(0,0,0,0.7)',
    };

    const modalContentStyles = {
        backgroundColor: '#fefefe',
        padding: '20px',
        border: '1px solid #888',
        width: 'auto', // Ancho automático basado en el contenido
        maxWidth: '600px', // Máximo ancho permitido
        textAlign: 'center',
    };

    const closeStyles = {
        color: '#aaa',
        float: 'right',
        fontSize: '28px',
        fontWeight: 'bold',
        cursor: 'pointer',
    };

    const imageStyles = {
        width: 'auto',
        maxWidth: '100%',
        maxHeight: '80vh',
    };

    const linkStyles = {
        display: 'block',
        marginTop: '10px',
        color: '#007bff',
        textDecoration: 'none',
        cursor: 'pointer',
    };

    return (
        <>
            <section className="relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                        <div className="tabla-con-divisiones-container">
                            <button onClick={handleCreate} className="btn btn-primary mb-4">
                                <FontAwesomeIcon icon={faPlus} /> Crear nuevo producto
                            </button>
                            {products.length === 0 ? (
                                <p>No hay productos disponibles.</p>
                            ) : (
                                <table className="tabla-con-divisiones">
                                    <thead>
                                        <tr>
                                            <th className="table-header" style={{ width: '15%', textAlign: 'center' }}>Nombre</th>
                                            <th className="table-header" style={{ width: '27%', textAlign: 'center' }}>Descripción</th>
                                            <th className="table-header" style={{ width: '16%', textAlign: 'center' }}>Imagen</th>
                                            <th className="table-header" style={{ width: '7%', textAlign: 'center' }}>Precio</th>
                                            <th className="table-header" style={{ width: '15%', textAlign: 'center' }}>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-body">
                                        {products.map((product) => (
                                            <tr key={product.id}>
                                                <td>{product.name}</td>
                                                <td>{product.description}</td>
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                    <button
                                                        onClick={() => toggleImageVisibility(product.id, product.img)}
                                                        className="btn btn-primary"
                                                    >
                                                        <FontAwesomeIcon icon={faEye} /> Mostrar imagen
                                                    </button>
                                                </td>
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{product.price}</td>
                                                <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <button onClick={() => handleEdit(product.id)} className="btn btn-primary" style={{ marginRight: '5px' }}>
                                                        <FontAwesomeIcon icon={faEdit} /> Editar
                                                    </button>
                                                    <button onClick={() => handleDelete(product.id, product.name)} className="btn btn-red" style={{ marginRight: '5px' }}>
                                                        <FontAwesomeIcon icon={faTrashAlt} /> Borrar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </section>

          
            {modalImage && (
                <div id="myModal" style={modalStyles} onClick={closeModal}>
                    <div style={modalContentStyles} onClick={e => e.stopPropagation()}>
                        <span style={closeStyles} onClick={closeModal}>&times;</span>
                        <img src={modalImage} alt="Product" style={imageStyles} />
                        <a href={modalImage} target="_blank" rel="noopener noreferrer" style={linkStyles}>
                            <FontAwesomeIcon icon={faExternalLinkAlt} /> Ver en pestaña nueva
                        </a>
                    </div>
                </div>
            )}
        </>
    );
}