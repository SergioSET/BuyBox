import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { AiFillShopping } from "react-icons/ai";
import { FaWindowClose } from "react-icons/fa";

import "../styles/Header.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loginState = localStorage.getItem("isLoggedIn") ? true : false;

  useEffect(() => {
    setIsLoggedIn(loginState);
  }, [loginState]);

  return (
    <>
      <div className="navbar bg-base-100 max-w-7xl mx-auto">
        <div className="flex-1">
          <Link
            to="/"
            className="btn btn-ghost normal-case text-2xl font-black text-accent-content"
          >
            <AiFillShopping />
            BuyBox
          </Link>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <Link to="/cart" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </Link>
          </div>
          {isLoggedIn && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  {/* <img src="https://xsgames.co/randomusers/avatar.php?g=male" /> */}
                  <img src="https://xsgames.co/randomusers/assets/avatars/male/60.jpg" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link
                    to="/user-profile"
                    className="justify-between text-accent-content"
                  >
                    Perfil
                  </Link>
                </li>
                <li>
                  <Link to="/order-history" className="text-accent-content">
                    Casillero
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="text-accent-content">
                    Cerrar Sesión
                  </Link>
                </li>
              </ul>
            </div>
          )} {!isLoggedIn && (
            <div className="container text-2xl navlinks-container">
              <NavLink className="text-accent-content" to="/login">
                Iniciar sesión
              </NavLink>
              <NavLink className="text-accent-content" to="/register">
                Registrarse
              </NavLink>
            </div>
          )}
        </div>
      </div>

      <div className="navbar-bottom-menu border-y border-gray-800">
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">

            {/* Page content here */}
            <label htmlFor="my-drawer" className="btn drawer-button">
              <HiMiniBars3BottomLeft className="text-4xl" />
            </label>
          </div>
          <div className="drawer-side z-10">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>

            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content mt-4">
              <label htmlFor="my-drawer" className="btn drawer-button">
                <FaWindowClose className="text-3xl ml-auto" />
              </label>
              {/* Sidebar content here */}
              <li className="text-xl">
                <NavLink className="text-accent-content" to="/">
                  Página principal
                </NavLink>
              </li>
              <li className="text-xl">
                <NavLink className="text-accent-content" to="/shop">
                  Tienda
                </NavLink>
              </li>
              <li className="text-xl">
                <NavLink className="text-accent-content" to="/locker">
                  Casillero
                </NavLink>
              </li>
              <li className="text-xl">
                <NavLink className="text-accent-content" to="/about-us">
                  Acerca de nosotros
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="container text-2xl navlinks-container">
          <NavLink className="text-accent-content" to="/">
            Página principal
          </NavLink>
          <NavLink className="text-accent-content" to="/shop">
            Tienda
          </NavLink>
          <NavLink className="text-accent-content" to="/locker">
            Casillero
          </NavLink>
          <NavLink className="text-accent-content" to="/about-us">
            Acerca de nosotros
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Header;
