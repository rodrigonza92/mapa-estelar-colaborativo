import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import "../../../styles/AddObservation.css";

const AddObservation = ({ userId }) => {
  const { user } = useAuth();
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
    } catch (error) {
      console.error("Error al registrar la observación:", error);
      alert("Hubo un error al registrar la observación.");
    }
  };

  return (
    <div className="add-observation-container">
      <h1>Registrar Observación</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Fecha y hora:
          <input
            type="datetime-local"
            name="timestamp"
            value={formData.timestamp}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Ubicación:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Condiciones del cielo:
          <input
            type="text"
            name="sky_conditions"
            value={formData.sky_conditions}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Equipo utilizado:
          <input
            type="text"
            name="equipment_used"
            value={formData.equipment_used}
            onChange={handleChange}
          />
        </label>
        <label>
          Descripción:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        <label>
          Objeto Astronómico:
          <select
            name="id_object"
            value={formData.id_object}
            onChange={handleChange}
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
        </label>
        <label>
          Fotografías (máximo 5):
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
        <button type="submit">Registrar Observación</button>
      </form>
    </div>
  );
};

export default AddObservation;
