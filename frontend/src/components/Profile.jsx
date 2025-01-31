import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import background from "../assets/background.jpg";

const Profile = () => {
  const { user, token } = useAuth();
  const [profileData, setProfileData] = useState({});
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

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
        const response = await axios.get("http://localhost:3000/observaciones/user", {
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
    return <div className="flex justify-center items-center h-screen text-lg text-gray-500">Cargando...</div>;
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat p-8"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="max-w-4xl mx-auto bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Perfil Personal</h1>

        {editMode ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre:</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name || ""}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Apellido:</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name || ""}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contraseña:</label>
              <input
                type="password"
                name="password"
                value={formData.password || ""}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleUpdateProfile}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
              >
                Guardar Cambios
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition duration-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <p className="text-gray-700">
                <strong>Nombre:</strong> {profileData.first_name} {profileData.last_name}
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Email:</strong> {profileData.email}
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Rol:</strong> {profileData.rol}
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Puntos:</strong> {profileData.points}
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Fecha de Registro:</strong> {profileData.registration_date}
              </p>
            </div>
            <button
              onClick={() => setEditMode(true)}
              className="mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-300"
            >
              Editar Perfil
            </button>
            <button
                onClick={() => navigate("/main")}
                className="px-6 py-3 bg-gray-800 hover:bg-gray-600 text-white font-semibold rounded-lg transition duration-300"
            >
                Volver atrás
            </button>
          </div>
        )}

        <h2 className="mt-12 text-2xl font-bold text-gray-800 mb-6">Historial de Observaciones</h2>
        {observations.length > 0 ? (
          <ul className="space-y-4">
            {observations.map((observation) => (
              <li
                key={observation.id}
                className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-800">{observation.description}</h3>
                <p className="text-sm text-gray-600 mt-2">{observation.details}</p>
                <p className="text-xs text-gray-500 mt-2">
                  <em>Estado:</em> {observation.state}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No tienes observaciones registradas.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
