import { useEffect, useState } from 'react';
import bcrypt from 'bcryptjs';
import Img from '../../images/User-Profile-PNG-Image.png';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar-user';


export default function Perfil() {
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
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleVolver = () => {
        navigate('/dashboard');
    }

    useEffect(() => {

        const getCookie = () => {
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
                setId(data.id);
                setEmail(data.email || '');
                setDireccion(data.direccion || '');
                setData(data.name || '');
                setTitulo(data.name || '');
                setPasswordI(data.password || '');
                console.log(data);
            })
            .catch(error => {
                setError(error.message);
            });
    }, []);

    const handleSave = () => {
        if (!bcrypt.compareSync(oldPassword, passwordI)) {
            setError('La contraseña antigua es incorrecta.');
            return;
        }

        if (password !== confirmPassword && password !== '' && confirmPassword !== '') {
            setError('Las nuevas contraseñas no coinciden.');
            return;
        }

        const userData = {
            name: data,
            email: email,
            direccion: direccion,
            password: password
        };

        const getCookie = () => {
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
        fetch(`http://localhost:3000/api/usuarios/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                navigate('/dashboard');
            })
            .catch(error => {
                setError(error.message);
            });
    };

    return (
        <>
            <Navbar />
            <div style={{ background: '#1a1a1a', color: 'white', padding: '20px', borderRadius: '10px', maxWidth: '500px', margin: '0 auto' }}>
                {error && <p>Error: {error}</p>}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h1>Bienvenido a tu perfil {titulo}</h1>
                    <img src={Img} alt="Perfil" style={{ width: '200px', height: 'auto', borderRadius: '50%', margin: '20px 0' }} />
                    <hr />
                    <label>Usuario:</label>
                    <input type='text' value={data} onChange={(e) => setData(e.target.value)} className="input-field" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '8px', margin: '8px 0', width: '80%', color: 'black' }} />
                    <label>Email:</label>
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '8px', margin: '8px 0', width: '80%', color: 'black' }} />
                    <label>Dirección:</label>
                    <input type='text2' value={direccion} onChange={(e) => setDireccion(e.target.value)} className="input-field" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '8px', margin: '8px 0', width: '80%', color: 'black' }} />
                    <label>Contraseña Antigua:</label>
                    <input type='password' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="input-field" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '8px', margin: '8px 0', width: '80%', color: 'black' }} />
                    <label>¿Quieres cambiar la contraseña?</label>
                    <input type='checkbox' onChange={(e) => setChange(e.target.checked)} className="input-field" style={{ margin: '8px 0', width: '05%' }} />
                    {change && (
                        <>
                            <label>Nueva Contraseña:</label>
                            <input type='password' onChange={(e) => setPassword(e.target.value)} className="input-field" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '8px', margin: '8px 0', width: '80%', color: 'black' }} />
                            <label>Confirmar Nueva Contraseña:</label>
                            <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="input-field" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '8px', margin: '8px 0', width: '80%', color: 'black' }} />
                        </>
                    )}
                    <button onClick={handleSave} className="btn-sm text-white bg-purple-600 hover:bg-purple-700" style={{ display: 'block', width: '60%', padding: '10px 0', fontSize: '1.5rem', marginTop: '20px' }}>
                        Guardar
                    </button>
                    <div className="mr-1 py-4 px-1 justify-start">
                        <button onClick={handleVolver} className="btn-sm text-white bg-purple-600 hover:bg-purple-700">
                            Volver
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
