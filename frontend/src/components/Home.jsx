import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bienvenido al Mapa Estelar</h1>
      <p>Por favor, inicia sesión para acceder a la aplicación.</p>
      <Link to="/login">Iniciar Sesión</Link>
    </div>
  );
}

export default Home;
