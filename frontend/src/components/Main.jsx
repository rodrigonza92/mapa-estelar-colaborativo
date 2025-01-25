import React from "react";
import { useAuth } from "../context/AuthContext";
import HeaderMain from "./ui/HeaderMain"; // Asegúrate de que esta ruta sea correcta.
import background from "../assets/background.jpg"; // Ajusta la ruta según la ubicación de tu archivo.

function Main() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bienvenido, {user?.name || "Usuario"}!</h1>
      <p>¡Has iniciado sesión exitosamente!</p>
      <p>
        Este es un proyecto creado para permitir que los aficionados y
        profesionales de la astronomía compartan sus observaciones y
        fotografías de manera colaborativa, creando un catálogo celeste
        accesible y organizado.
      </p>
      <p>
        Únete a nuestra comunidad y contribuye al desarrollo de este atlas
        celeste. Registra observaciones, gana puntos y ayuda a verificar las
        contribuciones de otros astrónomos.
      </p>
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#2b6cb0",
          color: "white",
          border: "none",
          borderRadius: "5px",
          margin: "10px",
        }}
      >
        Comienza a explorar
      </button>
      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          backgroundColor: "#e53e3e",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}

export default Main;
