import React, { useState, useEffect } from "react";
import HeaderMain from "./HeaderMain";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [publications, setPublications] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [observations, setObservations] = useState([]);
  const [selectedFavorite, setSelectedFavorite] = useState(null);
  const [selectedObservation, setSelectedObservation] = useState(null);

  // Obtener objetos celestes guardados en favoritos
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("http://localhost:3000/favoritos", {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setFavorites(response.data.slice(0, 5));
      } catch (error) {
        console.error("Error al obtener favoritos:", error);
      }
    };
    fetchFavorites();
  }, []);

  // Obtener observaciones realizadas por el usuario
  useEffect(() => {
    const fetchObservations = async () => {
      try {
        const response = await axios.get("http://localhost:3000/observaciones/user", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setObservations(response.data.slice(0, 5));
      } catch (error) {
        console.error("Error al obtener observaciones:", error);
      }
    };
    fetchObservations();
  }, []);

  // Obtener puntos del usuario logueado
  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await axios.get('http://localhost:3000/usuarios/profile_data', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setPoints(response.data.points);
      } catch (error) {
        console.error("Error al obtener los puntos del usuario:", error);
      }
    };
    fetchPoints();
  }, []);
  

  // Obtener publicaciones recientes
  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await axios.get("http://localhost:3000/observaciones", {
          params: { state: "Pública", orderBy: "fecha", limit: 10 },
        });
        setPublications(response.data);
      } catch (error) {
        console.error("Error al obtener las publicaciones:", error);
      }
    };
    fetchPublications();
  }, []);

  // Obtener ranking basado en puntos
  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await axios.get("http://localhost:3000/usuarios");
        const sortedRankings = response.data
          .sort((a, b) => b.points - a.points)
          .slice(0, 5);
        setRankings(sortedRankings);
      } catch (error) {
        console.error("Error al obtener el ranking:", error);
      }
    };
    fetchRankings();
  }, []);

  const handleCreateObservation = () => {
    navigate("/add-observation");
  };

  // Renderizar modal para favoritos
  const renderFavoriteModal = () => {
    if (!selectedFavorite) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded-lg shadow-lg w-1/3">
          <h2 className="text-xl font-bold">Información del Objeto Celeste</h2>
          <p><strong>Nombre:</strong> {selectedFavorite.oficial_name}</p>
          <p><strong>Nombre alternativo:</strong> {selectedFavorite.alternative_name}</p>
          <p><strong>Tipo de Objeto:</strong> {selectedFavorite.object_type}</p>
          <p><strong>Constelacion:</strong> {selectedFavorite.constellation}</p>
          <p><strong>Temporada de mejor visibilidad:</strong> {selectedFavorite.visibility_season}</p>
          <p><strong>Coordenadas:</strong> {selectedFavorite.coordinates}</p>
          <p><strong>Magnitud Aparente:</strong> {selectedFavorite.apparent_magnitude}</p>
          <button
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => setSelectedFavorite(null)}
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  };

  // Renderizar modal para observaciones
  const renderObservationModal = () => {
    if (!selectedObservation) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded-lg shadow-lg w-1/3">
          <h2 className="text-xl font-bold">Editar Observación</h2>
          <p><strong>Descripción:</strong> {selectedObservation.description}</p>
          <p><strong>Ubicación:</strong> {selectedObservation.location}</p>
          <p><strong>Fecha y hora:</strong> {selectedObservation.timestamp}</p>
          <p><strong>Condiciones del cielo:</strong> {selectedObservation.sky_conditions}</p>
          <p><strong>Equipamiento utilizado:</strong> {selectedObservation.equipamiento_utilizado}</p>
          <p><strong>Estado:</strong> {selectedObservation.state}</p>
          <textarea
            className="w-full mt-4 p-2 border rounded"
            defaultValue={selectedObservation.notes}
          />
          <button
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Guardar Cambios
          </button>
          <button
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => setSelectedObservation(null)}
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <HeaderMain />

      {/* Dashboard */}
      <div className="flex flex-1 mt-[80px]">
        {/* Columna izquierda */}
        <div className="w-1/4 bg-gray-800 text-white p-4 space-y-4">
          <h2 className="text-xl font-bold">Panel de Navegación</h2>
          <button
            className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700"
            onClick={handleCreateObservation}
          >
            Crear Nueva Observación
          </button>

          {/* Lista de favoritos */}
          <div>
            <h3 className="text-lg font-bold mt-4">Objetos Favoritos Guardados</h3>
            {favorites.map((favorite) => (
              <button
                key={favorite.id}
                className="w-full bg-gray-700 py-2 mt-2 rounded-lg hover:bg-gray-600"
                onClick={() => setSelectedFavorite(favorite)}
              >
                {favorite.oficial_name}
              </button>
            ))}
          </div>

          {/* Historial de observaciones */}
          <div>
            <h3 className="text-lg font-bold mt-4">Historial de Observaciones</h3>
            {observations.map((observation) => (
              <button
                key={observation.id}
                className="w-full bg-gray-700 py-2 mt-2 rounded-lg hover:bg-gray-600"
                onClick={() => setSelectedObservation(observation)}
              >
                {observation.description}
              </button>
            ))}
          </div>
        </div>

        {/* Columna central */}
        <div className="flex-1 bg-gray-100 p-4 space-y-4">
          <h2 className="text-2xl font-bold text-center">Novedades</h2>
          <div className="space-y-4">
            {publications.map((pub) => (
              <div key={pub.id} className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold">{pub.description}</h3>
                <p>{pub.location}</p>
                <span className="text-sm text-gray-500">{pub.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Columna derecha */}
        <div className="w-1/4 bg-gray-800 text-white p-4 space-y-4">
          <h2 className="text-xl font-bold">Sistema de Puntos</h2>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-lg font-semibold">Puntos actuales:</p>
            <h1>{points}</h1>
            {points > 20 && user?.rol !== "validador" && (
              <button className="w-full bg-green-600 py-2 mt-4 rounded-lg hover:bg-green-700">
                Solicitar ser Validador
              </button>
            )}
          </div>
          <div>
            <h3 className="font-semibold mt-4">Ranking</h3>
            <ul className="space-y-2">
              {rankings.map((user, index) => (
                <li key={index}>
                  {index + 1}. {user.first_name} {user.last_name} - {user.points} puntos
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Modals */}
      {renderFavoriteModal()}
      {renderObservationModal()}
    </div>
  );
};

export default Dashboard;
