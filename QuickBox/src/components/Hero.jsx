import { Link } from "react-router-dom";
import "../styles/Hero.css";
const Hero = () => {
  return (
    <div className="hero bg-base-200 bg-blend-overlay">
    <div className="hero-content text-center">
      <div className="max-w-xl">
        <h1 className="text-6xl font-bold max-md:text-4xl text-accent-content">Compras y Envíos sin Complicaciones</h1>
        <p className="py-6 text-2xl max-md:text-lg text-accent-content">Gestiona tus compras desde EE.UU. de forma fácil y clara. Administra tu casillero, estima costos y sigue tus pedidos en tiempo real.</p>
        <Link to="/shop" className="btn btn-wide bg-blue-600 hover:bg-blue-500 text-white button-3d">¡Compra ahora!</Link>
      </div>
    </div>
  </div>
  )
}

export default Hero