import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, Header } from '../components'

const HomeLayout = () => {

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
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default HomeLayout