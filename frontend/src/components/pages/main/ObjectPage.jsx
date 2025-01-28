import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import HeaderMain from "../../ui/HeaderMain";

function ObjectsPage() {
  const { user } = useAuth();
  const [objects, setObjects] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Obtener todos los objetos
  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const response = await axios.get("http://localhost:3000/objetos");
        setObjects(response.data);
      } catch (error) {
        console.error("Error al obtener los objetos:", error);
      }
    };
    fetchObjects();
  }, []);

  // Agregar un objeto a favoritos
  const handleAddToFavorites = async (id_object) => {
    setLoading(true);
    setMessage("");
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("No se encontró un token válido.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/favoritos",
        { id_object }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );

      setFavorites((prevFavorites) => [...prevFavorites, response.data]);
      setMessage("El objeto se agregó a tus favoritos exitosamente.");
    } catch (error) {
      console.error("Error al agregar el objeto a favoritos:", error);
      setMessage("Ocurrió un error al agregar el objeto a favoritos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <HeaderMain />

      <div className="container mx-auto py-10 mt-20">
        <h1 className="text-3xl font-bold mb-8 text-center text-black">Información de Objetos Disponibles</h1>

        {message && (
          <div
            className={`mb-4 p-4 rounded ${
              message.includes("exitosamente") ? "bg-green-200" : "bg-red-200"
            } text-gray-800`}
          >
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {objects.map((object) => (
            <div key={object.id_object} className="bg-gray-800 shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-bold mb-2 text-white">{object.oficial_name}</h2>
              <p className="text-gray-300"><strong>Nombre alternativo:</strong> {object.alternative_name}</p>
              <p className="text-gray-300"><strong>Tipo de Objeto:</strong> {object.object_type}</p>
              <p className="text-gray-300"><strong>Constelación:</strong> {object.constellation}</p>
              <p className="text-gray-300"><strong>Temporada de Visibilidad:</strong> {object.visibility_season}</p>
              <p className="text-gray-300"><strong>Coordenadas:</strong> {object.coordinates}</p>

              {/* Botón para agregar a favoritos */}
              <button
                onClick={() => handleAddToFavorites(object.id_object)}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 disabled:opacity-50"
                disabled={loading || favorites.some((fav) => fav.id_object === object.id_object)}
              >
                {favorites.some((fav) => fav.id_object === object.id_object)
                  ? "Ya en Favoritos"
                  : "Agregar a Favoritos"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ObjectsPage;
