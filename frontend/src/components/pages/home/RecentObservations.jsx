import React from "react";
import '../../../index.css';

const recentObservations = [
  { object: "Betelgeuse", date: "2025-01-01", location: "Buenos Aires", image: "path_to_image" },
  { object: "Nebulosa Trífida", date: "2025-01-10", location: "Madrid", image: "path_to_image" },
];

function RecentObservations() {
  return (
    <section className="bg-blue-900 text-white py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Observaciones Recientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {recentObservations.map((obs, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded shadow-lg overflow-hidden hover:scale-105 transition-transform"
            >
              <img src={obs.image} alt={obs.object} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold">{obs.object}</h3>
                <p className="text-gray-400">{obs.date} - {obs.location}</p>
                <button className="mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-500">
                  Ver detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecentObservations;
