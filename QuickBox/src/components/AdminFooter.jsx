import React from "react";
import { Link } from "react-router-dom";
import { FaSquareXTwitter, FaSquareFacebook, FaSquareInstagram, FaSquareYoutube } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Footer = () => {
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded mt-10 max-md:px-0">
      <nav className="grid grid-flow-col max-sm:grid-flow-row gap-4">
        <Link to="/admin/user-list" className="link link-hover text-2xl max-md:text-xl text-accent-content" onClick={() => window.scrollTo(0, 0)}>
          Dashboard
        </Link>
        <Link to="/admin/user-list" className="link link-hover text-2xl max-md:text-xl text-accent-content" onClick={() => window.scrollTo(0, 0)}>
          Usuarios
        </Link>
        <Link to="/admin/product-list" className="link link-hover text-2xl max-md:text-xl text-accent-content" onClick={() => window.scrollTo(0, 0)}>
          Productos
        </Link>
        <Link to="/order-list" className="link link-hover text-2xl max-md:text-xl text-accent-content" onClick={() => window.scrollTo(0, 0)}>
          Pedidos
        </Link>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <FaSquareXTwitter className="text-6xl max-sm:text-4xl text-accent-content" />
          <FaSquareFacebook className="text-6xl max-sm:text-4xl text-accent-content" />
          <FaSquareInstagram className="text-6xl max-sm:text-4xl text-accent-content" />
          <FaSquareYoutube className="text-6xl max-sm:text-4xl text-accent-content" />
        </div>
      </nav>
      <aside>
        <p className="text-2xl max-sm:text-sm text-accent-content">
          Copyright © 2023 - All right reserved by BuyBox
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
