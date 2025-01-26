import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddObservation = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    timestamp: "",
    location: "",
    sky_conditions: "",
    equipment_used: "",
    description: "",
    id_object: "",
  });

  const [photos, setPhotos] = useState([]);
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const response = await axios.get("http://localhost:3000/objetos");
        setObjects(response.data);
      } catch (error) {
        console.error("Error al cargar los objetos:", error);
        alert("No se pudieron cargar los objetos disponibles.");
      }
    };
    fetchObjects();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPhotos([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const observationData = {
        ...formData,
        id_user: user.id,
        state: "Privada",
      };

      await axios.post("http://localhost:3000/observaciones", observationData, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Observación registrada con éxito.");
      navigate("/dashboard"); // Redirigir al dashboard después de registrar
    } catch (error) {
      console.error("Error al registrar la observación:", error);
      alert("Hubo un error al registrar la observación.");
    }
  };

  const handleCancel = () => {
    navigate(-1); // Redirigir a la página anterior
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white flex justify-center items-center py-10 px-4">
      <div className="bg-gray-100 text-gray-800 rounded-lg shadow-lg w-full max-w-3xl p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Registrar Observación
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Fecha y hora:
            </label>
            <input
              type="datetime-local"
              name="timestamp"
              value={formData.timestamp}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Ubicación:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Condiciones del cielo:
            </label>
            <input
              type="text"
              name="sky_conditions"
              value={formData.sky_conditions}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Equipo utilizado:
            </label>
            <input
              type="text"
              name="equipment_used"
              value={formData.equipment_used}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Descripción:
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:ring focus:ring-blue-500"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Objeto Astronómico:
            </label>
            <select
              name="id_object"
              value={formData.id_object}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:ring focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Selecciona un objeto
              </option>
              {objects.map((object) => (
                <option key={object.id_object} value={object.id_object}>
                  {object.oficial_name} ({object.object_type})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Fotografías (máximo 5):
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              Registrar Observación
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddObservation;
