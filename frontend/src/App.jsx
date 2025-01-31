import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Main from "./components/Main";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import AddObservation from "./components/pages/main/AddObservation";
import { AuthProvider } from "./context/AuthContext";
import Validations from "./components/pages/main/Validations";
import Profile from "./components/Profile";
import ObjectPage from "./components/pages/main/ObjectPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<ProtectedRoute><Main /></ProtectedRoute>}/>
          <Route path="/add-observation" element={<ProtectedRoute><AddObservation /></ProtectedRoute>}/>
          <Route path="/validations" element={<ProtectedRoute><Validations /></ProtectedRoute>}/>
          <Route path="/objects" element={<ProtectedRoute><ObjectPage /></ProtectedRoute>}/>
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
