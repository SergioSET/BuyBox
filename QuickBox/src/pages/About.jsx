import React from "react";
import { SectionTitle } from "../components";
import { Link } from "react-router-dom";
import "../styles/About.css";
const About = () => {
  return (
    <div>
      <h1 className="TitleShop">Shop</h1>
      <h2 className="SubtitleShop">Home | About</h2>
      {/*<SectionTitle title="Login" path="Home | Login" />*/}
      <div className="about-content text-center max-w-2xl mx-auto mt-5">
      <h2 className="LovC">¡Amamos nuestros clientes!</h2>
      <p className="TextContUs">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
        obcaecati eum est commodi, quam, ut quidem deleniti quos quod temporibus
        dicta deserunt voluptates ab! Deleniti id repellat, labore fugiat
        obcaecati dolorem minima fugit quasi nam velit reiciendis delectus ea
        tempora.
      </p>
      <Link to="/contact" className="BtnContactUs">Contact Us</Link>
      </div>
    </div>
  );
};

export default About;
