import React from "react";
import HeaderMain from "./ui/HeaderMain"; // Asegúrate de que esta ruta sea correcta.
import background from "../assets/background.jpg"; // Ajusta la ruta según la ubicación de tu archivo.

function Main() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <HeaderMain />

      {/* Contenido Principal */}
      <div
        className="flex-1 flex items-center justify-center text-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="bg-black bg-opacity-60 p-6 rounded-md max-w-3xl text-white space-y-6">
          <h1 className="text-4xl font-bold">¡Bienvenido!</h1>
          <p className="text-lg">
            ¡Has iniciado sesión exitosamente! Este es un proyecto creado para
            permitir que los aficionados y profesionales de la astronomía
            compartan sus observaciones y fotografías de manera colaborativa,
            creando un catálogo celeste accesible y organizado.
          </p>
          <p className="text-lg">
            Únete a nuestra comunidad y contribuye al desarrollo de este atlas
            celeste. Registra observaciones, gana puntos y ayuda a verificar las
            contribuciones de otros astrónomos.
          </p>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all">
            Comienza a explorar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main;
