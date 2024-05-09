  'use client';
  import { useEffect, useState } from 'react';
  import bcrypt from 'bcryptjs';

  const MyPage = () => {
    const [id, setId] = useState('');
    const [titulo, setTitulo] = useState('');
    const [data, setData] = useState('');
    const [password, setPassword] = useState('');
    const [passwordI, setPasswordI] = useState('');
    const [email, setEmail] = useState('');
    const [direccion, setDireccion] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [change, setChange] = useState(false);


    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      // Función para obtennpm install bcryptjser el valor de la cookie 'token'
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
        setId(data.id);
        setEmail(data.email);
        setDireccion(data.direccion);
        setData(data.name);
        setTitulo(data.name);
        setPasswordI(data.password);
        console.log(data);
      })
      .catch(error => {
        setError(error.message);
      });
    }, []);

    const deleteCookie = () => {
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    };

    // Función para manejar el evento de clic del botón de cerrar sesión
    // const handleLogout = () => {
    //   deleteCookie();
    //   // Redirigir al usuario a la página de inicio de sesión o a cualquier otra página que desees
    //   window.location.href = '/';
    // };
    const handleSave = () => {
  
      // Compara el hash de la contraseña antigua con el hash almacenado
      if (!bcrypt.compareSync(oldPassword, passwordI)) {
        setError('La contraseña antigua es incorrecta.');
        return;
      }
  
      if (password !== confirmPassword && password!='' && confirmPassword!='') {
        setError('Las nuevas contraseñas no coinciden.');
        return;
      }
      console.log(password)
      const userData = {
        "name": data,
        "email": email,
        "direccion": direccion,
        "password": password
      };
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
      const token = getCookie();
      fetch(`http://localhost:3000/api/usuarios/${id}`, {
        method: 'PUT', // Dependiendo de la API, puede ser PUT o POST
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Asegúrate de incluir el token de autorización si es necesario
        },
        body: JSON.stringify(userData) // Convertir el objeto userData a JSON
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Si la respuesta es exitosa, puedes redirigir al usuario
        window.location.href = '/';
      })
      .catch(error => {
        setError(error.message);
      });

      // // Redirigir al usuario a la página de inicio de sesión o a cualquier otra página que desees
      // window.location.href = '/';
    };

    return (
      <div>
    {error && <p>Error: {error}</p>}
      <div className="profile-container">
        <div className="profile-info">
        <h1 style={{ textAlign: 'center', fontSize: '2rem' }}>Bienvenido a tu perfil {titulo}</h1>
        <hr />
        <img src=".\images\User-Profile-PNG-Image.png" alt="Perfil" style={{ width: '300px', height: '250px', borderRadius: '50%', margin: '0 auto', display: 'block' }} />
        <hr />
        <h1 style={{ textAlign: 'left', fontSize: '2rem' }}>Usuario: <input type='text' value={data} onChange={(e) => setData(e.target.value)} className="input-field bg-slate-700"/> </h1>
        <hr />
        <h1 style={{ textAlign: 'left', fontSize: '2rem' }}>Email: <input  type='email'  value={email}  onChange={(e) => setEmail(e.target.value)} className="input-field bg-slate-700"/></h1>
        <hr />
        <h1 style={{ textAlign: 'left', fontSize: '2rem' }}>Dirección: <input  type='text'  value={direccion}  onChange={(e) => setDireccion(e.target.value)} className="input-field bg-slate-700"/></h1>
        <hr />
        <h1 style={{ textAlign: 'left', fontSize: '2rem' }}>
            Contraseña Antigua: 
            <input 
              type='password' 
              value={oldPassword} 
              onChange={(e) => setOldPassword(e.target.value)} 
              className="input-field bg-slate-700"
            />
          </h1>
          <hr />
          <h1 style={{ textAlign: 'left', fontSize: '2rem' }}>Quieres cambiar la contraseña? <input  type='checkbox' onChange={(e) => setChange(e.target.checked)} className="input-field bg-slate-700"/></h1>
        <hr />
        {change && (
            <>
              <h1 style={{ textAlign: 'left', fontSize: '2rem' }}>
                Nueva Contraseña: 
                <input 
                  type='password' 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="input-field bg-slate-700"
                />
              </h1>
              <hr />
              <h1 style={{ textAlign: 'left', fontSize: '2rem' }}>
                Confirmar Nueva Contraseña: 
                <input 
                  type='password' 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  className="input-field bg-slate-700"
                />
              </h1>
              <hr />
            </>
          )}
        {/* <h1 style={{ textAlign: 'left', fontSize: '2rem' }}>Contraseña: <input  type='password'  value={password}  onChange={(e) => setPassword(e.target.value)} style={{ color: 'black' }} onFocus={() => setPassword('')} onBlur={() => {
    if (password === '') {
      setPassword(passwordI) // Restaura el valor inicial si el campo está vacío al salir
    }
  }}/></h1> */}
        <hr />
        <button onClick={handleSave} className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-1 md-1" style={{ marginBottom: '10px' }}>Guardar</button>
        </div>
      </div>
  </div>
    );
  };

  export default MyPage;