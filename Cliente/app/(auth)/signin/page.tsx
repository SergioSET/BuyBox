'use client';

import { useRouter } from 'next/navigation'
import { useState } from 'react';
import Link from 'next/link';
const apiurl = process.env.NEXT_PUBLIC_API_URL
export default function SignIn() {

  const router = useRouter()
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);


  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  
    try {
      const response = await fetch(apiurl + 'api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });
      const data = await response.json();
      if (response.ok) {
        const token = data.token;
      // Extract the value of myTokenName from the token
      const myTokenNameValue = token.split('myTokenName=')[1].split(';')[0];
      document.cookie = 'token='+myTokenNameValue+'; path=/'; 
        
      router.push('/dashboard');// Puedes agregar más atributos como 'expires' y 'secure' si es necesario
        
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
            <h1 className="h1">Bienvenido al inicio de sesión</h1>
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
                    Iniciar sesión
                  </button>
                </div>
              </div>
              {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </form>
            <div className="text-gray-400 text-center mt-6">
              No tienes una cuenta?{' '}
              <Link href="/signup" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">
                Registrate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
