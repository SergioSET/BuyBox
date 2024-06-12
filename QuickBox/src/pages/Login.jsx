import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { SectionTitle } from "../components";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../store";
import { loginUser, logoutUser } from "../features/auth/authSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar la visibilidad de la contraseña
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Estado para la carga inicial
  const loginState = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500); // Simula un retardo de 2 segundos

    if (loginState) {
      localStorage.clear();
      store.dispatch(logoutUser());
      navigate("/login");
    }
  }, []);

  const isValidate = () => {
    let isProceed = true;

    if (email.length === 0) {
      isProceed = false;
      toast.warn("Porfavor digita un correo electrónico");
    } else if (password.length < 6) {
      isProceed = false;
      toast.warn("La contraseña debe ser de al menos 6 caracteres");
    }
    return isProceed;
  };

  const proceedLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      let foundUser = data.user;

      if (foundUser) {
        toast.success("Inicio de Sesión exitoso");
        localStorage.setItem("user", JSON.stringify(foundUser));
        localStorage.setItem("isLoggedIn", true);
        store.dispatch(loginUser());
        if (foundUser.role === "Admin") {
          navigate("/admin/user-list");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      toast.error("Error al iniciar sesión");
      console.log(error.message);
    }
  };

  const iconContainerStyle = {
    position: 'absolute', // Posición absoluta para posicionarlo dentro del contenedor relativo
    right: '0.75rem', // Distancia desde el borde derecho del contenedor
    top: '50%', // Centrado verticalmente
    transform: 'translateY(-80%)', // Ajuste para centrar verticalmente
    cursor: 'pointer', // Cambiar el cursor a puntero para indicar que es clickeable
    color: 'white', // Color del icono
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader size={60} color={"#123abc"} />
      </div>
    );
  }

  return (
    <>
      <h1 className="TitleShop">Inicio de Sesión</h1>
      <div className="flex flex-col justify-center ">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <div className="bg-gray-900 border border-gray-600 shadow w-full rounded-lg divide-y divide-gray-200">
            <form className="px-5 py-7" onSubmit={proceedLogin}>
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Correo Electrónico
              </label>
              <input 
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // Cambia el tipo de input para mostrar u ocultar la contraseña
                  required={true}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                />
                <div style={iconContainerStyle} onClick={() => setShowPassword(!showPassword)}>
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye} // Cambia el icono según el estado de visibilidad
                  />
                </div>
              </div>
              <button
                type="submit"
                className="transition duration-200 bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span className="inline-block mr-2">Ingresar</span>
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
          <div className="py-5 text-center">
            <Link
              to="/register"
              className="btn bg-blue-800 hover:bg-blue-500 text-white py-2 px-4 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105"
              onClick={() => window.scrollTo(0, 0)}
            >
              ¿No tienes una cuenta? Regístrate.
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
