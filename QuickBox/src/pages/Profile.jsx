import React, { useEffect, useState } from "react";
import { SectionTitle } from "../components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("user")) || {});
  const loginState = localStorage.getItem("isLoggedIn") ? true : false;
  const [userFormData, setUserFormData] = useState({
    id: userData.id || "",
    name: userData.name || "",
    email: userData.email || "",
    phone: userData.phone || "",
    address: userData.address || "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginState) {
      toast.error("You must be logged in to access this page");
      navigate("/");
    }
  }, [loginState, navigate]);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/usuarios/${userFormData.id}`, {
        ...userFormData,
      });

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      const updatedData = response.data.user[0];
      setUserData(updatedData);
      localStorage.setItem("user", JSON.stringify(updatedData));
      toast.success("¡El perfil se ha actualizado exitosamente!");
    } catch (error) {
      console.error(error.response);
      toast.error("El perfil no se ha podido actualizar.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Verificar los datos iniciales del usuario
  console.log("Datos iniciales de usuario:", userData);

  // Verificar los datos del estado actual
  console.log("Datos actuales del estado:", userFormData);

  return (
    <>
      <h1 className="text-center TitleShop">Bienvenido a tu Perfil</h1>
      <form className="max-w-7xl mx-auto text-center px-10" onSubmit={updateProfile}>
        <div className="max-w-md mx-auto">
          <div className="form-control mb-4 ">
            <label className="label ">
              <span className="label-text font-semibold text-accent-content">Nombre</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Escribe un nombre"
              className="input  w-full bg-100"
              value={userFormData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text   font-semibold text-accent-content">E-mail</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Escribe un correo"
              className="input input-bordered w-full bg-100 text-white"
              value={userFormData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-accent-content  font-semibold ">Teléfono</span>
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Escribe tu numero de teléfono"
              className="input input-bordered w-full bg-100 text-white"
              value={userFormData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-accent-content  font-semibold ">Dirección</span>
            </label>
            <input
              type="text"
              name="address"
              placeholder="Escribe una dirección"
              className="input input-bordered w-full bg-100"
              value={userFormData.address}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-accent-content  font-semibold ">Contraseña</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Escribe tu contraseña"
              className="input input-bordered w-full bg-100 text"
              value={userFormData.password}
              onChange={handleInputChange}
            />
          </div>

          <button
            className="btn btn-lg bg-blue-600 hover:bg-blue-500 text-white mt-6"
            type="submit"
          >
            Actualizar perfil
          </button>
        </div>
      </form>
    </>
  );
};

export default Profile;
