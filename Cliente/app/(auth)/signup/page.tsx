'use client';

import { useRouter } from 'next/navigation'
import { useState } from 'react';
import Link from 'next/link';

export default function SignUp() {

  const router = useRouter()
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);


  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });

      if (response.ok) {
        router.push('/signin');
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
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">Bienvenido al registro.</h1>
          </div>
          <div className="max-w-sm mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
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
                  <div className="flex justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox" />
                      <span className="text-gray-400 ml-2">Recuérdame</span>
                    </label>
                    <Link href="/reset-password" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">
                      ¿Olvidaste la contraseña?
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button type="submit" className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">
                    Registrate
                  </button>
                </div>
              </div>
              {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </form>
            <div className="text-gray-400 text-center mt-6">
              Ya tienes una cuenta?{' '}
              <Link href="/signin" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">
                Inicia sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
