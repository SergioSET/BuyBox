import React, { useEffect } from "react";
import { SectionTitle } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Animated } from "react-animated-css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { store } from "../store";
import { calculateTotals, clearCart } from "../features/cart/cartSlice";
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import imagen1 from "/productImages/producto1.jpg";
import imagen2 from "/productImages/producto2.jpg";
import imagen3 from "/productImages/producto3.jpg";
import imagen4 from "/productImages/producto4.jpg";
import "../ThankYou.css"; // Asegúrate de importar tu archivo CSS

const ThankYou = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveToOrderHistory = async () => {
    try {
      await axios.post("http://localhost:8080/orders", {
        userId: localStorage.getItem("id"),
        orderStatus: "in progress",
        subtotal: total,
        cartItems: cartItems,
      });
      toast.success("Order completed");
    } catch (err) {
      toast.error("Failed to save order");
    }
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      saveToOrderHistory();
      store.dispatch(clearCart());
      store.dispatch(calculateTotals());
    }
  }, [cartItems]);

  useEffect(() => {
    if (!loginState) {
      toast.error("You must be logged in to access this page");
      navigate("/");
    }
  }, [loginState, navigate]);

  // Lista de imágenes para la galería (sustituye con tus propias imágenes)
  const images = [
    {
      original: imagen1,
      description: 'Camisa para hombre',
      link: "/shop/product/1"
    },
    {
      original: imagen2,
      description: 'Silla Gamer',
      link: "/shop/product/2"
    },
    {
      original: imagen3,
      description: 'Caja de herramientas',
      link: "/shop/product/3"
    },
    {
      original: imagen4,
      description: 'Camara web',
      link: "/shop/product/4"
    }
  ];

  const renderImage = (item) => {
    return (
      <div className="image-gallery-image fixed-size">
        <Link to={item.link}>
          <img src={item.original} alt={item.description} />
        </Link>
        <p className="image-gallery-description">{item.description}</p>
      </div>
    );
  };

  return (
    <>
      <h1 className="text-center TitleShop">Gracias por tu compra ☺</h1>
      <ToastContainer />
      <div className="thankyou-content text-center text-accent-content px-10 max-w-7xl mx-auto">
        <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
          <h3 className="text-2xl mt-10 max-sm:text-xl">
            Esperamos que disfrutes de tus pedidos cuando lleguen,
            apreciamos mucho tu solicitud.
          </h3>
        </Animated>
        <Animated animationIn="bounceInRight" animationOut="fadeOut" isVisible={true}>
          <h3 className="text-2xl mt-5 max-sm:text-xl">
            Aquí hay algunas cosas que puedes hacer ahora:
          </h3>
        </Animated>
        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
          <ul className="text-xl mt-5 text-blue-500 max-sm:text-lg">
            <li className="btn bg-blue-800 hover:bg-blue-500 text-white py-2 px-4 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105">
              <Link to="/locker">&rarr; Ver listado de ordenes &larr;</Link>
            </li>
            <h1 className="text-center">Mira nuestros otros productos</h1>
          </ul>
        </Animated>
        <Animated animationIn="bounceInUp" animationOut="fadeOut" isVisible={true}>
        </Animated>

        {/* Integración de la galería de imágenes */}
        <div className="gallery-container py-9">
          <ImageGallery
            items={images}
            renderItem={renderImage}
            showPlayButton={false}
            showFullscreenButton={false}
            showThumbnails={false}
            showBullets={true}
          />
        </div>
        <h4 className="TitleShop">
          ¡De nuevo ¡gracias por tu compra!
        </h4>
        <h4 className="TitleShop">
          De corazón, El equipo de QuickBox
        </h4>
      </div>
    </>
  );
};

export default ThankYou;
