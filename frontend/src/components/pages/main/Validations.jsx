import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import HeaderMain from "../../ui/HeaderMain";

const ValidationView = () => {
  const { user } = useAuth();
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingObservations = async () => {
      try {
        const response = await axios.get("http://localhost:3000/observaciones", {
          params: { state: "Pendiente de revisión" },
        });
        setObservations(response.data);
      } catch (error) {
        console.error("Error al obtener las observaciones pendientes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPendingObservations();
  }, []);

  const handleValidation = async (observationId, newState) => {
    try {
      await axios.put(`http://localhost:3000/observaciones/${observationId}`,
        { state: newState },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      await axios.post("http://localhost:3000/notificaciones", {
        id_user: observations.find((obs) => obs.id === observationId).id_user,
        message:
          newState === "Pública"
            ? "Tu observación ha sido aprobada y ahora es pública."
            : "Tu observación no ha sido validada y ahora es privada.",
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setObservations((prev) => prev.filter((obs) => obs.id !== observationId));
    } catch (error) {
      console.error("Error al actualizar la observación:", error);
      alert("Hubo un error al procesar la validación.");
    }
  };

  if (loading) {
    return <p className="text-center text-lg">Cargando observaciones...</p>;
  }

  return (
    <div><HeaderMain />
    <div className="container mx-auto py-10 mt-20">
      <h1 className="text-2xl font-bold mb-6">Validación de Observaciones</h1>
      {observations.length === 0 ? (
        <p className="text-center text-gray-600">No hay observaciones pendientes de revisión.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {observations.map((observation) => (
            <div key={observation.id} className="bg-white p-4 rounded-lg shadow-lg">
              {observation.image_url && (
                <img
                  src={observation.image_url}
                  alt="Observación"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h2 className="text-xl font-semibold mb-2">{observation.description}</h2>
              <p><strong>Ubicación:</strong> {observation.location}</p>
              <p><strong>Fecha y hora:</strong> {observation.timestamp}</p>
              <p><strong>Condiciones del cielo:</strong> {observation.sky_conditions}</p>
              <p><strong>Equipo utilizado:</strong> {observation.equipment_used}</p>
              <p className="font-semibold text-gray-700">Estado: {observation.state}</p>
              <div className="mt-4 flex justify-between">
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  onClick={() => handleValidation(observation.id, "Pública")}
                >
                  Aprobar
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  onClick={() => handleValidation(observation.id, "Privada")}
                >
                  Rechazar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default ValidationView;
