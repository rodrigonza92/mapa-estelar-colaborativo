import React from "react";
import '../../../index.css';

const featuredObjects = [
  { name: "Nebulosa de Orión", type: "Nebulosa", constellation: "Orión", image: "/assets/orion.jpg" },
  { name: "Andrómeda", type: "Galaxia", constellation: "Andrómeda", image: "/assets/andromeda.jpg" },
  { name: "Polaris", type: "Estrella", constellation: "Osa Menor", image: "/assets/polar.jpg" },
];

function FeaturedObjects() {
  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Objetos Celestes Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredObjects.map((object, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded shadow-lg overflow-hidden hover:scale-105 transition-transform"
            >
              <img src={object.image} alt={object.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold">{object.name}</h3>
                <p className="text-gray-400">{object.type} - {object.constellation}</p>
                <button className="mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-500">
                  Ver más
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedObjects;
