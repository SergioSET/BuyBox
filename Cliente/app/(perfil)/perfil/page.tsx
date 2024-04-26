'use client';
import { useEffect, useState } from 'react';

const MyPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Función para obtener el valor de la cookie 'token'
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
      
      return null; // Retorna null si no se encuentra la cookie
    };

    // Obtener el valor del token de la cookie
    const token = getCookie();

    if (!token) {
      setError('Token not found');
      return;
    }

    // Extraer el ID del token (por ejemplo, si el token es en formato JWT)
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload.user; // Suponiendo que el ID del usuario está en la propiedad 'user' del payload

    // Realizar la solicitud fetch a la API con el ID extraído
    fetch(`http://localhost:3000/api/usuarios/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Opcional, dependiendo de cómo manejes la autenticación en tu API
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setData(data.name);
    })
    .catch(error => {
      setError(error.message);
    });
  }, []);

  const deleteCookie = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  // Función para manejar el evento de clic del botón de cerrar sesión
  const handleLogout = () => {
    deleteCookie();
    // Redirigir al usuario a la página de inicio de sesión o a cualquier otra página que desees
    window.location.href = '/';
  };


  return (
    <div>
  {error && <p>Error: {error}</p>}
  {data && (
    <div className="profile-container">
      <div className="profile-info">
      <h1 style={{ textAlign: 'center', fontSize: '2rem' }}>Bienvenido a tu perfil {data}</h1>
      <hr />
      <img src=".\images\User-Profile-PNG-Image.png" alt="Perfil" style={{ width: '300px', height: '250px', borderRadius: '50%', margin: '0 auto', display: 'block' }} />
      <hr />
      <h1 style={{ textAlign: 'left', fontSize: '2rem' }}>Usuario: {data}</h1>
      <hr />
      <h1 style={{ textAlign: 'left', fontSize: '2rem' }}>Email: </h1>
      <hr />
      <h1 style={{ textAlign: 'left', fontSize: '2rem' }}>Dirección:</h1>
      <hr />
      <h1 style={{ textAlign: 'left', fontSize: '2rem' }}>Cambio de contraseña</h1>
      <hr />
      <button onClick={handleLogout} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3">Cerrar sesión</button>
      </div>
    </div>
  )}
</div>
  );
};

export default MyPage;