import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../index.css";

function HeaderMain() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header-main bg-gray-800 bg-opacity-80 text-white py-5 fixed w-full top-0 left-0 z-10">
      <div className="header-container container mx-auto flex justify-between items-center">
        {/* Logo / Nombre del Sistema */}
        <h1 className="header-title text-3xl font-semibold">Mapa Estelar</h1>

        {/* Navegación */}
        <nav className="header-nav">
          <ul className="header-menu flex space-x-8">
            {/* Mostrar siempre "Principal" */}
            <li>
              <Link to="/main" className="header-link hover:text-gray-300">
                Principal
              </Link>
            </li>
            {/* Mostrar "Validaciones" solo si el usuario es un validador */}
            {user?.rol === "validador" && (
              <li>
                <Link
                  to="/validations"
                  className="header-link hover:text-gray-300"
                >
                  Validaciones
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Botones de Acción */}
        <div className="header-actions flex space-x-6">
          <Link
            to="/perfil"
            className="header-profile bg-indigo-600 px-5 py-3 rounded hover:bg-indigo-500"
          >
            Perfil
          </Link>
          <button
            onClick={handleLogout}
            className="header-logout bg-red-600 px-5 py-3 rounded hover:bg-red-500"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
}

export default HeaderMain;
