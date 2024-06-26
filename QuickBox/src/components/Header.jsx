import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaHeadphones } from "react-icons/fa6";
import { FaRegEnvelope } from "react-icons/fa6";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { FaHeart } from "react-icons/fa6";
import { AiFillShopping } from "react-icons/ai";
import { FaSun } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa6";
import { FaWindowClose } from "react-icons/fa";

import "../styles/Header.css";
import { useDispatch, useSelector } from "react-redux";
import { changeMode } from "../features/auth/authSlice";
import { store } from "../store";
import axios from "axios";
import { clearWishlist, updateWishlist } from "../features/wishlist/wishlistSlice";
import logo from '../assets/box-open-solid.svg';  // Ajusta la ruta según donde hayas guardado el SVG
import shopping_cart from '../assets/cart-shopping-solid.svg';  // Ajusta la ruta según donde hayas guardado el SVG


const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loginState = localStorage.getItem("isLoggedIn") ? true : false;

  const { amount } = useSelector((state) => state.cart);
  const { total } = useSelector((state) => state.cart);
  const [id, setId] = useState(localStorage.getItem("id"));
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.auth);


  // const fetchWishlist = async () => {
  //   if (loginState) {
  //     try {
  //       const getResponse = await axios.get(`http://localhost:8080/user/${localStorage.getItem("id")}`);
  //       const userObj = getResponse.data;

  //       store.dispatch(updateWishlist({ userObj }));


  //     } catch (error) {
  //       console.error(error);
  //     }
  //   } else {
  //     store.dispatch(clearWishlist());
  //   }

  // };


  useEffect(() => {
    setIsLoggedIn(loginState);

    // fetchWishlist();

  }, [loginState]);

  return (
    <>
      <div className="navbar bg-base-100 max-w-7xl mx-auto">
        <div className="flex-1">
          <Link
            to="/"
            className="btn btn-ghost normal-case text-2xl font-black text-accent-content"
          >
          <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />

          QuickBox
        </Link>
        </div>
        <div className="flex-none">
          {/* <Link
            to="/search"
            className="btn btn-ghost btn-circle text-accent-content"
          >
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </Link> */}
          {/* <button
            className="text-accent-content btn btn-ghost btn-circle text-xl"
            onClick={() => dispatch(changeMode())}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button> */}
          {/* <Link
            to="/wishlist"
            className="btn btn-ghost btn-circle text-accent-content"
          >
            <FaHeart className="text-xl" />
          </Link> */}
          <div className="dropdown dropdown-end">
            <Link to="/cart" className="btn btn-ghost btn-circle">
              <div className="indicator">
                
              <img src={shopping_cart} alt="Logo" className="h- w-6 mr-0.7" />
              </div>
            </Link>
          </div>
          {isLoggedIn && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
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
                  <Link to="/locker" className="text-accent-content">
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

              <NavLink className="Login1" to="/login">
                Iniciar sesión
              </NavLink>
              <span className="Sbarra"></span>
              <NavLink className="Login" to="/register">
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
              {/* <li className="text-xl">
                <NavLink className="text-accent-content" to="/contact">
                  Contact
                </NavLink>
              </li> */}
              {/* {!isLoggedIn && (
                <>
                  <li className="text-xl">
                    <NavLink className="text-accent-content" to="/login">
                      Login
                    </NavLink>
                  </li>
                  <li className="text-xl">
                    <NavLink className="text-accent-content" to="/register">
                      Register
                    </NavLink>
                  </li>
                </>
              )} */}
            </ul>
          </div>
        </div>

        <div className="container text-2xl navlinks-container">
          <NavLink className="NavOp" to="/">
            Inicio
          </NavLink>
          <NavLink className="NavOp" to="/shop">
            Tienda
          </NavLink>
          <NavLink className="NavOp" to="/locker">
            Casillero
          </NavLink>
          <NavLink className="NavOp" to="/about-us">
            Acerca de nosotros
          </NavLink>
          {/* <NavLink className="text-accent-content" to="/contact">
            Contact
          </NavLink> */}
          {/* {!isLoggedIn && (
            <>
              <NavLink className="text-accent-content" to="/login">
                Login
              </NavLink>
              <NavLink className="text-accent-content" to="/register">
                Register
              </NavLink>
            </>
          )} */}
        </div>
      </div>
    </>
  );
};

export default Header;
