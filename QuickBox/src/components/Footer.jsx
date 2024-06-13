import React from "react";
import { Link } from "react-router-dom";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareYoutube } from "react-icons/fa6";
import { useSelector } from "react-redux";
import '../styles/Footer.css';

const Footer = () => {
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  return (
    <footer className="footer footer-center p-10 text-base-content rounded mt-10 max-md:px-0">
      <div className="footer-overlay"></div> {/* Overlay para la imagen de fondo */}
      <nav className="grid grid-flow-col max-sm:grid-flow-row gap-4 relative z-10">
   
      </nav>
      <nav className="relative z-10">
        <div className="grid grid-flow-col gap-4">
          <FaSquareXTwitter className="text-6xl max-sm:text-4xl text-accent-content" />
          <FaSquareFacebook className="text-6xl max-sm:text-4xl text-accent-content" />
          <FaSquareInstagram className="text-6xl max-sm:text-4xl text-accent-content" />
          <FaSquareYoutube className="text-6xl max-sm:text-4xl text-accent-content" />
        </div>
      </nav>
      <aside className="relative z-10">
        <p className="copy">
          Copyright © 2024 - All right reserved by QuickBox
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
