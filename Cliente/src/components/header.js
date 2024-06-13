import { Link } from 'react-router-dom'
// import MobileMenu from './mobile-menu'
import Logo from '../images/logo.png';

export default function Header() {
    return (
        <header className="absolute w-full z-30" style={{ position: 'fixed', top: 0, left: 0, width: '100%', backgroundColor: '#151719', zIndex: 1000 }}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Site branding */}
                    <div className="shrink-0 mr-4">
                        {/* Logo */}
                        <Link to="#" className="block" aria-label="Cruip">
                            <img className="w-7 h-7 " src={Logo} alt="Descripción de la imagen" />
                        </Link>
                    </div>

                    {/* Desktop navigation */}
                    <nav className="hidden md:flex md:grow">
                        {/* Desktop sign in links */}
                        <ul className="flex grow justify-end flex-wrap items-center">
                            <li>
                                <Link
                                    to="/login"
                                    className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                                >
                                    Iniciar sesión
                                </Link>
                            </li>
                            <li>
                                <Link to="/register" className="btn-sm text-white bg-purple-1000 hover:bg-purple-700 ml-3">
                                    Registro
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* <MobileMenu /> */}

                </div>
            </div>
        </header>
    )
}
