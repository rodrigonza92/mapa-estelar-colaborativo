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
    equipamiento_utilizado: "",
    description: "",
    id_object: "",
    id_user: "",
    state: "",
  });

  const [photos, setPhotos] = useState([]);
  const [objects, setObjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photoDetails, setPhotoDetails] = useState({
    file: null,
    exposure_time: "",
    iso: "",
    processing: "",
  });

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

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPhotoDetails({
      file: null,
      exposure_time: "",
      iso: "",
      processing: "",
    });
  };

  const handlePhotoChange = (e) => {
    setPhotoDetails({ ...photoDetails, file: e.target.files[0] });
  };

  const handlePhotoDetailsChange = (e) => {
    setPhotoDetails({ ...photoDetails, [e.target.name]: e.target.value });
  };

  const handleAddPhoto = () => {
    if (!photoDetails.file) {
      alert("Por favor selecciona una fotografía.");
      return;
    }

    // Renombrar la foto
    const renamedFile = new File(
      [photoDetails.file],
      `${Date.now()}_${photoDetails.file.name}`,
      { type: photoDetails.file.type }
    );

    // Crear el objeto de la foto
    const photoData = {
      file: renamedFile,
      exposure_time: photoDetails.exposure_time,
      iso: photoDetails.iso,
      processing: photoDetails.processing,
    };

    setPhotos([...photos, photoData]);
    handleCloseModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Construir los datos de la observación
      const observationData = {
        timestamp: formData.timestamp,
        description: formData.description,
        location: formData.location,
        sky_conditions: formData.sky_conditions,
        equipamiento_utilizado: formData.equipment_used,
        state: formData.state || "Privada",
        id_user: user.id_user,
        id_object: formData.id_object,
      };
  
      // Crear la observación en el servidor
      const observationResponse = await axios.post(
        "http://localhost:3000/observaciones",
        observationData,
        { headers: { "Content-Type": "application/json" } }
      );
  
      const observationId = observationResponse.data.id;
  
      for (const photo of photos) {
        const photoData = {
          img_path: `/uploads/${photo.file.name}`,
          exposure_time: photo.exposure_time,
          ISO: photo.iso,
          applied_processing: photo.processing,
          state: "Pendiente",
          id_observation: observationId,
        };
  
        await axios.post("http://localhost:3000/fotografias", photoData, {
          headers: { "Content-Type": "application/json" },
        });
      }
  
      // Notificar éxito y redirigir
      alert("Observación y fotografías registradas con éxito.");
      navigate("/main");
    } catch (error) {
      console.error("Error al registrar la observación o fotografías:", error);
      alert("Hubo un error al registrar la observación o las fotografías.");
    }
  };  

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white flex justify-center items-center py-10 px-4">
      <div className="bg-gray-100 text-gray-800 rounded-lg shadow-lg w-full max-w-3xl p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Registrar Observación
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Formulario registrar observacion */}
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
          </div>

          {/* Modal registrar fotografia */}
          <div>
            <button
              type="button"
              onClick={handleOpenModal}
              className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              Agregar Fotografía
            </button>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Agregar Fotografía</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Archivo:
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:ring focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Tiempo de exposición:
                    </label>
                    <input
                      type="text"
                      name="exposure_time"
                      value={photoDetails.exposure_time}
                      onChange={handlePhotoDetailsChange}
                      className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:ring focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">ISO:</label>
                    <input
                      type="text"
                      name="iso"
                      value={photoDetails.iso}
                      onChange={handlePhotoDetailsChange}
                      className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:ring focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Procesamiento aplicado:
                    </label>
                    <textarea
                      name="processing"
                      value={photoDetails.processing}
                      onChange={handlePhotoDetailsChange}
                      className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:ring focus:ring-blue-500"
                    ></textarea>
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleAddPhoto}
                    className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          )}

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
