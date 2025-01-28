import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, token } = useAuth();
  const [profileData, setProfileData] = useState({});
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/usuarios/profile_data", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setProfileData(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos del perfil:", error);
      }
    };

    const fetchObservations = async () => {
      try {
        const response = await axios.get("http://localhost:3000/observaciones", {
          params: { userId: user.id },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setObservations(response.data);
      } catch (error) {
        console.error("Error al obtener las observaciones:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
    fetchObservations();
  }, [token, user.id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async () => {
    try {
      await axios.patch("http://localhost:3000/usuarios/profile_data", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProfileData(formData);
      setEditMode(false);
      alert("Perfil actualizado exitosamente");
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      alert("Hubo un error al actualizar el perfil");
    }
  };

  if (loading) {
    return <div className="text-center text-lg text-gray-500">Cargando...</div>;
  }

  return (
    <div className="relative p-8 max-w-4xl mx-auto bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 shadow-2xl rounded-lg text-white"      >      
      <h1 className="text-3xl font-semibold mb-6">Perfil Personal</h1>

      {editMode ? (
        <div className="edit-section mt-6 space-y-6">
          <div>
            <label className="block text-sm font-medium">Nombre:</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name || ""}
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-2 bg-white text-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Apellido:</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name || ""}
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-2 bg-white text-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-2 bg-white text-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Contraseña:</label>
            <input
              type="password"
              name="password"
              value={formData.password || ""}
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-2 bg-white text-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleUpdateProfile}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold text-white transition duration-300"
            >
              Guardar Cambios
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="px-6 py-3 bg-gray-300 hover:bg-gray-400 rounded-lg font-semibold text-gray-800 transition duration-300"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="view-section mt-6 space-y-4">
          <p>
            <strong className="text-gray-100">Nombre:</strong>{" "}
            {profileData.first_name} {profileData.last_name}
          </p>
          <p>
            <strong className="text-gray-100">Email:</strong> {profileData.email}
          </p>
          <p>
            <strong className="text-gray-100">Rol:</strong> {profileData.rol}
          </p>
          <p>
            <strong className="text-gray-100">Puntos:</strong> {profileData.points}
          </p>
          <p>
            <strong className="text-gray-100">Fecha de Registro:</strong>{" "}
            {profileData.registration_date}
          </p>
          <button
            onClick={() => setEditMode(true)}
            className="mt-4 px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold text-white transition duration-300"
          >
            Editar Perfil
          </button>
        </div>
      )}

      <h2 className="mt-12 text-2xl font-semibold text-gray-100">
        Historial de Observaciones
      </h2>
      {observations.length > 0 ? (
        <ul className="mt-4 space-y-4">
          {observations.map((observation) => (
            <li
              key={observation.id}
              className="observation-item p-6 bg-gray-700 rounded-lg shadow-md hover:shadow-xl transition duration-300"
            >
              <h3 className="text-lg font-semibold">{observation.description}</h3>
              <p className="text-sm text-gray-200">{observation.details}</p>
              <p className="text-xs text-gray-400">
                <em>Estado:</em> {observation.state}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-gray-400">No tienes observaciones registradas.</p>
      )}
    </div>
  );
};

export default Profile;
