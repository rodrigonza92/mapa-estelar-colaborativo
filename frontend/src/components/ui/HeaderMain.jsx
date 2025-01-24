import React from "react";
import { Link } from "react-router-dom";
import '../../index.css';

function HeaderMain() {
  return (
    <header className="header-main bg-gray-800 bg-opacity-80 text-white py-5 fixed w-full top-0 left-0 z-10">
      <div className="header-container container mx-auto flex justify-between items-center">
        {/* Logo / Nombre del Sistema */}
        <h1 className="header-title text-3xl font-semibold">Mapa Estelar</h1>
        
        {/* Navegación */}
        <nav className="header-nav">
          <ul className="header-menu flex space-x-8">
            <li>
              <Link to="/observations" className="header-link hover:text-gray-300">Observaciones</Link>
            </li>
            <li>
              <Link to="/info" className="header-link hover:text-gray-300">Información</Link>
            </li>
            <li>
              <Link to="/about" className="header-link hover:text-gray-300">Sobre Nosotros</Link>
            </li>
          </ul>
        </nav>

        {/* Botón de Acción */}
        <div className="header-actions flex space-x-6">
          <Link to="/perfil" className="header-profile bg-indigo-600 px-5 py-3 rounded hover:bg-indigo-500">
            Perfil
          </Link>
        </div>
      </div>
    </header>
  );
}

export default HeaderMain;
