import React from "react";
import { Link } from "react-router-dom";
import '../../index.css';

function Header() {
  return (
    <header className="bg-black bg-opacity-70 text-white py-4 fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Nombre del Sistema */}
        <h1 className="text-2xl font-bold">Mapa Estelar</h1>

        {/* Botones de Acción */}
        <div className="flex space-x-4">
          <Link to="/login" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500">
            Iniciar Sesión
          </Link>
          <Link to="/register" className="bg-green-600 px-4 py-2 rounded hover:bg-green-500">
            Registrarse
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
