import React from "react";
import HeaderMain from "./ui/HeaderMain"; // Asegúrate de que esta ruta sea correcta.

function Main() {
  return (
    <div>
      {/* Header */}
      <HeaderMain />

      {/* Contenido Principal */}
      <div style={{ textAlign: "center", marginTop: "120px" }}>
        <h1>Bienvenido a la Main Page</h1>
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
          }}
        >
          Comienza a explorar
        </button>
      </div>
    </div>
  );
}

export default Main;
