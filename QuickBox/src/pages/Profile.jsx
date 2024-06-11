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
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error.response);
      toast.error("Failed to update profile.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <SectionTitle title="User Profile" path="Home | User Profile" />
      <form className="max-w-7xl mx-auto text-center px-10" onSubmit={updateProfile}>
        <div className="grid grid-cols-3 max-lg:grid-cols-1">
          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Nombre</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">E-mail</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Teléfono</span>
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Dirección</span>
            </label>
            <input
              type="text"
              name="address"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.address}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Contraseña</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.password}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button
          className="btn btn-lg bg-blue-600 hover:bg-blue-500 text-white mt-10"
          type="submit"
        >
          Actualizar perfil
        </button>
      </form>
    </>
  );
};

export default Profile;
