import React from "react";
import { SectionTitle } from "../components";
import { Link } from "react-router-dom";
import "../styles/About.css";
import image1 from "/src/assets/aboutus_1.png";

import image2 from "/src/assets/aboutus_2.png";


const About = () => {
  return (
    <div>
      {/*<SectionTitle title="Login" path="Home | Login" />*/}
      <div className="about-content text-center max-w-2xl mx-auto mt-5">
        <h2 className="LovC">¡Amamos nuestros clientes!</h2>
        <p className="TextContUs">
          En BuyBox, nos enorgullecemos de ofrecer una solución innovadora
          para la gestión de envíos internacionales. Nuestro proyecto nació con
          la misión de facilitar la importación de productos desde Estados
          Unidos hacia Colombia, a través de un casillero virtual. Esta
          herramienta intuitiva permite a los usuarios seleccionar servicios de
          entrega personalizados y obtener estimaciones de precio precisas
          basadas en la distancia recorrida, el tipo de empresa de transporte y
          el tamaño del artículo. Nuestra plataforma está diseñada para ser
          accesible y transparente, asegurando que cada envío sea gestionado con
          eficiencia y confianza.
          <br />
          <br />
          <img
            src={image1}
            alt="Imagen 1"
            className="image-centered border br-2"
          />
          Nuestro equipo está comprometido con la excelencia en el servicio al
          cliente. BuyBox no solo facilita la importación de productos, sino
          que también incluye un chat de atención al usuario para resolver
          cualquier duda o inconveniente que pueda surgir durante el proceso de
          envío. Además, nuestra aplicación cuenta con un completo sistema de
          gestión de productos (CRUD), que permite a los usuarios agregar,
          actualizar y eliminar productos de manera sencilla en su casillero
          virtual. Nos esforzamos por mantener una comunicación fluida y
          efectiva con nuestros clientes, garantizando una experiencia
          satisfactoria y sin complicaciones.
          <br />
          <br />
          <img
            src={image2}
            alt="Imagen 1"
            className="image-centered border br-2"
          />
          La gestión de órdenes es uno de los pilares fundamentales de BuyBox.
          Entendemos la importancia de tener control sobre los pedidos y, por
          ello, hemos desarrollado una interfaz intuitiva que facilita la
          administración de todas las órdenes en el casillero virtual. Nuestro
          objetivo es brindar una experiencia de usuario optimizada, donde la
          tecnología y la practicidad se unan para ofrecer un servicio de
          calidad superior. En BuyBox, estamos comprometidos con la innovación
          constante, asegurando que nuestros usuarios siempre tengan las mejores
          herramientas a su disposición para gestionar sus envíos
          internacionales.
        </p>
        <Link to="/contact" className="BtnContactUs">
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default About;
