import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Img from '../../images/register.jpeg';

export default function Register() {
    const navigate = useNavigate();
    const [name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, password, admin: '0' }),
            });

            if (response.ok) {
                navigate('/login');
            } else {
                const data = await response.json();
                setError(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while signing in.');
        }
    };

    return (
        <section className="relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                    <Link to='/' className="absolute top-0 left-0 m-4 btn text-white bg-purple-600 hover:bg-purple-700">Atrás</Link>
                    <div className="flex max-w-4xl mx-auto">
                        <div className="w-1/2 hidden md:block ">
                            <img src={Img} alt="Imagen de registro" className="object-cover h-full w-full" />
                        </div>
                        <div className="w-full md:w-1/2 bg-gray-800 p-6 rounded-lg">
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-wrap -mx-3 mb-4">
                                    <div className="w-full px-3 ">
                                        <h1 className="h1 text-center">Registro</h1>
                                        <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="username">
                                            Usuario
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            className="form-input w-full text-gray-300"
                                            placeholder="Usuario"
                                            required
                                            value={name}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-4">
                                    <div className="w-full px-3">
                                        <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">
                                            Contraseña
                                        </label>
                                        <input
                                            id="password"
                                            type="password"
                                            className="form-input w-full text-gray-300"
                                            placeholder="Contraseña (Al menos 10 caracteres)"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-4">
                                    <div className="w-full px-3">
                                        <div className="flex justify-between"></div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mt-6">
                                    <div className="w-full px-3">
                                        <button type="submit" className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">
                                            Regístrate
                                        </button>
                                    </div>
                                </div>
                                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                            </form>
                            <div className="text-gray-400 text-center mt-6">
                                ¿Ya tienes una cuenta?{' '}
                                <Link to="/login" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">
                                    Inicia sesión
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
