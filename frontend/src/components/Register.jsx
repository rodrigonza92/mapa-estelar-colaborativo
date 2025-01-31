import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      // Enviar datos al endpoint de registro
      const response = await axios.post("http://localhost:3000/auth/register", {
        ...formData,
        rol: "Principiante", // Rol predeterminado
      });

      // Si el registro es exitoso, mostrar mensaje y redirigir
      setSuccess("Usuario registrado con éxito.");
      setTimeout(() => navigate("/login"), 2000); // Redirige al login después de 2 segundos
    } catch (err) {
      if (err.response?.status === 409) {
        // Código HTTP 409: Conflicto (usuario ya existe)
        setError("El correo electrónico ya está registrado.");
      } else {
        setError(err.response?.data?.message || "Error al registrar usuario.");
      }
    }
  };

  const handleCancel = () => {
    navigate("/login"); // Redirige al login
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white flex justify-center items-center py-10 px-4">
      <div className="bg-gray-100 text-gray-800 rounded-lg shadow-lg w-full max-w-2xl p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Registro de Usuario</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Nombre:</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Apellido:</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Correo Electrónico:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Contraseña:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Confirmar Contraseña:
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
