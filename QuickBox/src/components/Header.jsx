import { store } from "../store";
import axios from "axios";
import { clearWishlist, updateWishlist } from "../features/wishlist/wishlistSlice";
import logo from '../assets/box-open-solid.svg';  // Ajusta la ruta según donde hayas guardado el SVG
import shopping_cart from '../assets/cart-shopping-solid.svg';  // Ajusta la ruta según donde hayas guardado el SVG


const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
@@ -61,9 +64,10 @@ const Header = () => {
            to="/"
            className="btn btn-ghost normal-case text-2xl font-black text-accent-content"
          >
            <AiFillShopping />
            BuyBox
          </Link>
          <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />

          BuyBox
        </Link>
        </div>
        <div className="flex-none">
          {/* <Link
@@ -100,20 +104,8 @@ const Header = () => {
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

              <img src={shopping_cart} alt="Logo" className="h- w-6 mr-0.7" />
              </div>
            </Link>
          </div>
@@ -150,10 +142,11 @@ const Header = () => {
            </div>
          )} {!isLoggedIn && (
            <div className="container text-2xl navlinks-container">

              <NavLink className="Login1" to="/login">
                Iniciar sesión
              </NavLink>
              <span className="Sbarra">/</span>
              <span className="Sbarra"></span>
              <NavLink className="Login" to="/register">
                Registrarse
              </NavLink>
@@ -229,7 +222,7 @@ const Header = () => {

        <div className="container text-2xl navlinks-container">
          <NavLink className="NavOp" to="/">
            Página principal
            Inicio
          </NavLink>
          <NavLink className="NavOp" to="/shop">
            Tienda
  91 changes: 75 additions & 16 deletions91  
QuickBox/src/styles/Header.css
Original file line number	Diff line number	Diff line change
@@ -75,6 +75,10 @@
    font-size: 18px;
    color: lightgrey;
    transition: color 0.3s ease; /* Transición suave de color durante 0.3 segundos */
    font-family: 'Nunito Sans', sans-serif;
    border: 2px solid #2563eb;
    padding: 10px 20px; 
    border-radius: 20px;
}

.Login:hover {
@@ -83,36 +87,91 @@

.Login1 {
    font-size: 18px;
    color: lightgrey;
    color: white;
    background-color: #2596be; /* Color de fondo del botón */
    transition: color 0.3s ease; /* Transición suave de color durante 0.3 segundos */
    margin-left: 10px;
    border: 2px; /* Borde del botón */
    font-family: 'Nunito Sans', sans-serif;
    border-radius: 20px; /* Borde redondeado */
    padding: 10px 20px; /* Padding para un mejor aspecto del botón */
}

.Login1:hover {
    color: #2563eb; /* Cambia el color al pasar el mouse por encima */
}


.NavOp {
    font-size: 20px;
    display: block;
    position: relative;
    text-decoration: none; /* Desactiva la subrayado predeterminado */
    color: white; /* Cambia el color del texto según lo necesites */
    overflow: hidden;
    text-decoration: none;
    color: white;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 20px;
}

.NavOp span {
    display: block;
    width: 100%;
    transition: transform 0.5s;
}

.NavOp span:nth-child(1) {
    color: #1abc9c;
    background-color: rgba(255, 255, 255, 0.1);
    font-size: 32px;
}

.NavOp span:nth-child(2) {
    background-color: #1abc9c;
    height: 100%;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
}

.NavOp:hover span:nth-child(1) {
    transform: translateY(-100%);
}

.NavOp:hover span:nth-child(2) {
    transform: translateY(-100%);
}

.NavOp::before,
.NavOp::after {
    content: '';
    position: absolute;
    bottom: 0;
    height: 4px;
    background: #2563eb;
    transition: all 0.5s ease;
}

.NavOp::before {
    width: 0;
    height: 2px;
    display: block;
    margin-top: 5px;
    right: 0;
    background: #2563eb; /* Cambia el color según lo necesites */
    transition: width 0.3s ease, left 0.3s ease;
    left: 50%;
    transform: translateX(-50%);
}

.NavOp::after {
    width: 0;
    right: 50%;
    transform: translateX(50%);
}

.NavOp:hover::before,
.NavOp:hover::after {
    width: 100%;
    right: 0;
}
    width: 50%;
}

.gif-image {
    display: none;

  }

  .btn:hover .gif-image {
    display: inline-block;

  }