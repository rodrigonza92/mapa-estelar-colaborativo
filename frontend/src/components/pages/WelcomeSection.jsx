import React from "react";
import backgroundImage from '../../assets/background.jpg';
import '../../index.css';

function WelcomeSection() {
  return (
    <section className="bg-cover bg-center bg-no-repeat text-white py-20" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Explora, Observa y Colabora con el Universo
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Comparte tus descubrimientos y construyamos juntos un mapa del cielo.
        </p>
        <button className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-500">
          Comienza tu Exploración
        </button>
      </div>
    </section>
  );
}

export default WelcomeSection;
