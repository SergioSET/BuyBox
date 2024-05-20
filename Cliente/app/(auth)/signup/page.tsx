'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function SignUp() {
  const router = useRouter();
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/usuarios', {
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
        setError(data.message || 'An error occurred during registration.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while signing up.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="flex flex-wrap justify-center items-center max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1 w-full">Registro</h1>
          </div>
          <div className="flex flex-wrap max-w-3xl mx-auto">
            <div className="w-full md:w-1/2 p-4">
              <img src="/path/to/your/image.jpg" alt="Description of the image" className="w-full h-auto rounded" />
            </div>
            <div className="w-full md:w-1/2 p-4">
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
                        {/* Additional optional elements */}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mt-6">
                  <div className="w-full px-3">
                    <button
                      type="submit"
                      className="btn text-white bg-purple-600 hover:bg-purple-700 w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Registrando...' : 'Regístrate'}
                    </button>
                  </div>
                </div>
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
              </form>
              <div className="text-gray-400 text-center mt-6">
                ¿Ya tienes una cuenta?{' '}
                <Link href="/signin" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">
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
