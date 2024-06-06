import React from "react";
import { Link, NavLink } from "react-router-dom";
import { AiFillShopping } from "react-icons/ai";
import { FaWindowClose } from "react-icons/fa";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";

const AdminHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const loginState = localStorage.getItem("isLoggedIn") ? true : false;

  React.useEffect(() => {
    setIsLoggedIn(loginState);
  }, [loginState]);

  return (
    <>
      <div className="navbar bg-base-100 max-w-7xl mx-auto">
        <div className="flex-1">
          <Link to="/admin" className="btn btn-ghost normal-case text-2xl font-black text-accent-content">
            <AiFillShopping />
            BuyBox
          </Link>
        </div>
        <div className="flex-none">
          {isLoggedIn && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://xsgames.co/randomusers/assets/avatars/male/60.jpg" />
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <Link to="/login" className="text-accent-content">Cerrar Sesión</Link>
                </li>
              </ul>
            </div>
          )}
          {!isLoggedIn && (
            <div className="container text-2xl navlinks-container">
              <NavLink className="text-accent-content" to="/login">Iniciar sesión</NavLink>
              <NavLink className="text-accent-content" to="/register">Registrarse</NavLink>
            </div>
          )}
        </div>
      </div>

      <div className="admin-stats grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-4">
        <div className="stat-card bg-base-200 p-2 rounded shadow">
          <div className="stat-value text-xl">150</div>
          <div className="stat-title text-sm">Users</div>
          <Link to="/admin/user-list" className="btn btn-primary mt-2 btn-sm">Manage</Link>
        </div>
        <div className="stat-card bg-base-200 p-2 rounded shadow">
          <div className="stat-value text-xl">250</div>
          <div className="stat-title text-sm">Products</div>
          <Link to="/admin/product-list" className="btn btn-primary mt-2 btn-sm">Manage</Link>
        </div>
        <div className="stat-card bg-base-200 p-2 rounded shadow">
          <div className="stat-value text-xl">100</div>
          <div className="stat-title text-sm">Orders</div>
          <Link to="/admin/order-list" className="btn btn-primary mt-2 btn-sm">Manage</Link>
        </div>
        <div className="stat-card bg-base-200 p-2 rounded shadow">
          <div className="stat-value text-xl">24/7</div>
          <div className="stat-title text-sm">Support</div>
          <button className="btn btn-primary mt-2 btn-sm">Contact</button>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
