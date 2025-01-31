import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../index.css";

const RecentObservations = () => {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await axios.get("http://localhost:3000/observaciones", {
          params: { state: "Pública", orderBy: "timestamp", limit: 10 },
        });

        const sortedPublications = response.data
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          .slice(0, 4);

        setPublications(sortedPublications);
      } catch (error) {
        console.error("Error al obtener las publicaciones:", error);
      }
    };

    fetchPublications();
  }, []);

  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Observaciones Recientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {publications.map((obs, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded shadow-lg overflow-hidden hover:scale-105 transition-transform"
            >
              <img src={obs.image_path} alt={obs.description} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold">{obs.description}</h3>
                <p className="text-gray-400">{obs.timestamp} - {obs.location}</p>
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
};

export default RecentObservations;
