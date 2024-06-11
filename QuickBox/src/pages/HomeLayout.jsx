import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Header } from '../components';
import loadingAnimation from '/buybox.webm'; // Ajusta la ruta al archivo .webm de tu animación de carga

const HomeLayout = () => {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 2000); // Ocultar el logo después de 2 segundos

    // Limpia el temporizador cuando el componente se desmonta
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const BASE_URL = "https://app.chatwoot.com/";
    const script = document.createElement("script");

    script.src = BASE_URL + "/packs/js/sdk.js";
    script.defer = true;
    script.async = true;

    script.onload = () => {
      window.chatwootSDK.run({
        websiteToken: "qm8XhwyAvgUrkxo4RAKBY5gF",
        baseUrl: BASE_URL,
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
    {showLogo && ( // Mostrar el video si showLogo es true
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <video autoPlay loop muted className="w-64">
          <source src={loadingAnimation} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
    )}
      <Header />
      
      <Outlet />
      <Footer />
    </>
  );
};

export default HomeLayout;
