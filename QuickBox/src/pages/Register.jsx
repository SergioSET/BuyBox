import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Usuario");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [adress, setAdress] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [loading, setLoading] = useState(true); // Estado para la carga inicial
  const [submitting, setSubmitting] = useState(false); // Estado para el envío del formulario

  const navigate = useNavigate();

  useEffect(() => {
    // Simular una carga inicial
    setTimeout(() => {
      setLoading(false);
    }, 500); // Simula un retardo de 2 segundos
  }, []);

  const isValidate = () => {
    let isProceed = true;
    let errorMessage = "";

    if (name.length === 0) {
      isProceed = false;
      errorMessage = "Please enter the value in username field";
    } else if (email.length === 0) {
      isProceed = false;
      errorMessage = "Please enter the value in email field";
    } else if (phone.length < 4) {
      isProceed = false;
      errorMessage = "Phone must be longer than 3 characters";
    } else if (adress.length < 4) {
      isProceed = false;
      errorMessage = "Adress must be longer than 3 characters";
    } else if (password.length < 6) {
      isProceed = false;
      errorMessage = "Please enter a password longer than 5 characters";
    } else if (confirmPassword.length < 6) {
      isProceed = false;
      errorMessage = "Please enter a confirm password longer than 5 characters";
    } else if (password !== confirmPassword) {
      isProceed = false;
      errorMessage = "Passwords must match";
    }

    if (!isProceed) {
      // Reset touched state when validation fails
      setPasswordTouched(false);
      setConfirmPasswordTouched(false);
      toast.warn(errorMessage);
    }

    return isProceed;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidate()) return;

    setSubmitting(true); // Mostrar spinner al enviar el formulario

    try {
      const response = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, role, phone, adress, password }),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while signing in.');
    } finally {
      setSubmitting(false); // Ocultar spinner al completar el envío
    }
  };

  const inputStyle = {
    textAlign: 'left',
    backgroundColor: '#121212',
    border: 'none',
    color: 'white', 
    paddingRight: '2.5rem',
  };

  const iconContainerStyle = {
    position: 'absolute',
    right: '0.75rem',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    color: 'gray',
    display: 'flex',
    alignItems: 'center',
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
      <h1 className="TitleShop">QuickBox</h1>
      <h2 className="SubtitleShop">Registro</h2>
      <div className="flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <div className="bg-gray-900 border border-gray-600 shadow w-full rounded-lg divide-y divide-gray-200">
            <form className="px-5 py-7" onSubmit={handleSubmit}>
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Nombre
              </label>
              <input
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={true}
              />
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Correo Electrónico
              </label>
              <input
                type="email"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
              />
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Número de Teléfono
              </label>
              <input
                type="tel"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required={true}
              />
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Dirección
              </label>
              <input
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={adress}
                onChange={(e) => setAdress(e.target.value)}
                required={true}
              />
              <label className="font-semibold text-sm pb-1 block text-accent-content">
              Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordTouched(true);
                  }}
                  required={true}
                />
                {passwordTouched && (
                  <div style={iconContainerStyle} onClick={() => setShowPassword(!showPassword)}>
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      style={{
                        position: 'absolute',
                        top: '70%',
                        right: '1px', // Adjust right padding for centering
                        transform: 'translateY( -100%)'
                      }}
                    />
                  </div>
                )}
              </div>
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Repetir Contraseña
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setConfirmPasswordTouched(true);
                  }}
                  required={true}
                />
                {confirmPasswordTouched && (
                  <div style={iconContainerStyle} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <FontAwesomeIcon
                      icon={showConfirmPassword ? faEyeSlash : faEye}
                      style={{
                        position: 'absolute',
                        top: '70%',
                        right: '1px', // Adjust right padding for centering
                        transform: 'translateY( -100%)'
                      }}
                    />
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="transition duration-200 bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                {submitting ? (
                  <ClipLoader size={20} color={"#ffffff"} />
                ) : (
                  <>
                    <span className="inline-block mr-2">Registrarse</span>
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
                  </>
                )}
              </button>
            </form>
          </div>
          <div className="py-5 text-center">
            <Link
              to="/login"
              className="btn btn-neutral text-white"
              onClick={() => window.scrollTo(0, 0)}
            >
              ¿Ya tienes una cuenta? Inicia sesión.
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
