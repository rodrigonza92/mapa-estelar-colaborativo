import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

const ValidationView = () => {
  const { user } = useAuth(); // Asumimos que el validador también está autenticado
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener observaciones con estado "Pendiente de revisión"
  useEffect(() => {
    const fetchPendingObservations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/observaciones",
          {
            params: { state: "Pendiente de revisión" },
          }
        );
        setObservations(response.data);
      } catch (error) {
        console.error("Error al obtener las observaciones pendientes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPendingObservations();
  }, []);

  // Manejar validación de la observación
  const handleValidation = async (observationId, newState) => {
    try {
      // Actualizar estado de la observación en la API
      await axios.put(
        `http://localhost:3000/observaciones/${observationId}`,
        { state: newState },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Notificar al usuario propietario
      await axios.post(
        `http://localhost:3000/notificaciones`,
        {
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
        }
      );

      // Actualizar la lista de observaciones
      setObservations((prev) =>
        prev.filter((obs) => obs.id !== observationId)
      );
    } catch (error) {
      console.error("Error al actualizar la observación:", error);
      alert("Hubo un error al procesar la validación.");
    }
  };

  if (loading) {
    return <p>Cargando observaciones...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Validación de Observaciones</h1>
      {observations.length === 0 ? (
        <p>No hay observaciones pendientes de revisión.</p>
      ) : (
        <div className="space-y-4">
          {observations.map((observation) => (
            <div
              key={observation.id}
              className="bg-white p-4 rounded-lg shadow"
            >
              <h2 className="text-xl font-semibold">
                {observation.description}
              </h2>
              <p>
                <strong>Ubicación:</strong> {observation.location}
              </p>
              <p>
                <strong>Fecha y hora:</strong> {observation.timestamp}
              </p>
              <p>
                <strong>Condiciones del cielo:</strong>{" "}
                {observation.sky_conditions}
              </p>
              <p>
                <strong>Equipo utilizado:</strong> {observation.equipment_used}
              </p>
              <p>
                <strong>Estado actual:</strong> {observation.state}
              </p>
              <div className="mt-4 flex gap-4">
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  onClick={() =>
                    handleValidation(observation.id, "Pública")
                  }
                >
                  Aprobar
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  onClick={() =>
                    handleValidation(observation.id, "Privada")
                  }
                >
                  Rechazar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ValidationView;
