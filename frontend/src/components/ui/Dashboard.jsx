import React, { useState, useEffect } from "react";
import HeaderMain from "./HeaderMain";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [points, setPoints] = useState(0);
  const [publications, setPublications] = useState([]);
  const [rankings, setRankings] = useState([]);

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

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <HeaderMain />

      {/* Dashboard */}
      <div className="flex flex-1 mt-[80px]">
        {/* Columna izquierda */}
        <div className="w-1/4 bg-gray-800 text-white p-4 space-y-4">
          <h2 className="text-xl font-bold">Panel de Navegación</h2>
          <button className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700">
            Crear Nueva Observación
          </button>
          <div>
            <h3 className="font-semibold mt-4">Búsquedas</h3>
            <button className="w-full bg-gray-700 py-2 mt-2 rounded-lg hover:bg-gray-600">
              Buscar Objetos
            </button>
            <button className="w-full bg-gray-700 py-2 mt-2 rounded-lg hover:bg-gray-600">
              Buscar Observaciones
            </button>
          </div>
          <div>
            <h3 className="font-semibold mt-4">Favoritos</h3>
            <button className="w-full bg-gray-700 py-2 mt-2 rounded-lg hover:bg-gray-600">
              Ver Historial de Favoritos
            </button>
          </div>
        </div>

        {/* Columna central */}
        <div className="flex-1 bg-gray-100 p-4 space-y-4">
          <h2 className="text-2xl font-bold text-center">Novedades</h2>
          <div className="space-y-4">
            {publications.map((pub) => (
              <div key={pub.id} className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold">{pub.title}</h3>
                <p>{pub.description}</p>
                <span className="text-sm text-gray-500">{pub.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Columna derecha */}
        <div className="w-1/4 bg-gray-800 text-white p-4 space-y-4">
          <h2 className="text-xl font-bold">Sistema de Puntos</h2>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-lg font-semibold">Puntos actuales: {points}</p>
            {points > 20 && (
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
                  {index + 1}. {user.name} - {user.points} puntos
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
