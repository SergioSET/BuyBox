import React from "react";
import { Link, NavLink } from "react-router-dom";
import { AiFillShopping } from "react-icons/ai";
import { FaWindowClose } from "react-icons/fa";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import '../../src/styles/grid.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBox, faClipboardList, faHeadset } from '@fortawesome/free-solid-svg-icons';


const AdminHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const loginState = localStorage.getItem("isLoggedIn") ? true : false;

  React.useEffect(() => {
    setIsLoggedIn(loginState);
  }, [loginState]);

  const handleContactClick = () => {
    window.open("https://app.chatwoot.com/app/accounts/97406/dashboard", "_blank");
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-lg mb-1">
        <div className="flex-1">
          <Link
            to="/admin/user-list"
            className="btn btn-ghost normal-case text-2xl font-black text-white"
          >
            <AiFillShopping className="mr-2 text-3xl text-white" />
            QuickBox
          </Link>
        </div>
        <div className="flex-none">
          {isLoggedIn ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://xsgames.co/randomusers/assets/avatars/male/60.jpg" alt="avatar" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/login" className="text-primary">
                    Cerrar Sesión
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex space-x-4">
              <NavLink className="text-primary text-xl" to="/login">
                Iniciar sesión
              </NavLink>
              <NavLink className="text-primary text-xl" to="/register">
                Registrarse
              </NavLink>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid-container">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 gap-4 p-20 justify-center" style={{ paddingBottom: '0px' }}>
          <div className="stat-card bg-base-200 p-6 rounded-lg shadow-lg">
            <div className="stat-value text-3xl font-semibold text-primary">150</div>
            <div className="stat-title text-lg text-gray-600">Usuarios</div>
            <Link to="/admin/user-list" className="btn btn-primary mt-4">
              <FontAwesomeIcon icon={faUsers} className="mr-2" /> Gestionar
            </Link>
          </div>
          <div className="stat-card bg-base-200 p-6 rounded-lg shadow-lg">
            <div className="stat-value text-3xl font-semibold text-primary">250</div>
            <div className="stat-title text-lg text-gray-600">Productos</div>
            <Link to="/admin/product-list" className="btn btn-primary mt-4">
              <FontAwesomeIcon icon={faBox} className="mr-2" /> Gestionar
            </Link>
          </div>
          <div className="stat-card bg-base-200 p-6 rounded-lg shadow-lg">
            <div className="stat-value text-3xl font-semibold text-primary">100</div>
            <div className="stat-title text-lg text-gray-600">Órdenes</div>
            <Link to="/admin/order-list" className="btn btn-primary mt-4">
              <FontAwesomeIcon icon={faClipboardList} className="mr-2" /> Gestionar
            </Link>
          </div>
          <div className="stat-card bg-base-200 p-6 rounded-lg shadow-lg">
            <div className="stat-value text-3xl font-semibold text-primary">24/7</div>
            <div className="stat-title text-lg text-gray-600">Soporte</div>
            <button className="btn btn-primary mt-4" onClick={handleContactClick}>
              <FontAwesomeIcon icon={faHeadset } className="mr-2" /> Contactanos
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
