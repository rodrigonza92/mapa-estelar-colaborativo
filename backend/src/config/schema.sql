-- EJECUTAR ESTE SCRIPT PARA CREAR LA BASE DE DATOS DEL PROYECTO

-- Crear la base de datos
CREATE DATABASE observaciones_db;
USE observaciones_db;

-- Tabla Usuario
CREATE TABLE Usuario (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol ENUM('principiante', 'validador') DEFAULT 'principiante',
    points INT DEFAULT 0,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Objeto Celeste
CREATE TABLE Objeto (
    id_object INT AUTO_INCREMENT PRIMARY KEY,
    oficial_name VARCHAR(100) NOT NULL,
    alternative_name VARCHAR(100),
    object_type ENUM('estrella', 'satelite', 'planeta', 'galaxia', 'nebula', 'cluster') NOT NULL,
    constellation VARCHAR(50),
    visibility_season VARCHAR(50),
    coordinates VARCHAR(50),
    apparent_magnitude FLOAT
);

-- Tabla Observación
CREATE TABLE Observacion (
    id_observation INT AUTO_INCREMENT PRIMARY KEY,
    timestamp DATETIME NOT NULL,
    location VARCHAR(255),
    sky_conditions VARCHAR(255),
    equipamiento_utilizado VARCHAR(255),
    description TEXT,
    state ENUM('Privada', 'Pública', 'Pendiente de revisión') DEFAULT 'Privada',
    id_user INT NOT NULL,
    id_object INT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES Usuario(id_user),
    FOREIGN KEY (id_object) REFERENCES Objeto(id_object)
);

-- Tabla Validación
CREATE TABLE Validacion (
    id_validation INT AUTO_INCREMENT PRIMARY KEY,
    state ENUM('Aprobada', 'Rechazada') NOT NULL,
    comments TEXT,
    id_validador INT NOT NULL,
    FOREIGN KEY (id_validador) REFERENCES Usuario(id_user)
);

-- Tabla Fotografía
CREATE TABLE Fotografia (
    id_img INT AUTO_INCREMENT PRIMARY KEY,
    img_path VARCHAR(255) NOT NULL,
    exposure_time FLOAT,
    ISO INT,
    applied_processing TEXT,
    state VARCHAR(50),
    id_observation INT,
    id_validation INT,
    FOREIGN KEY (id_observation) REFERENCES Observacion(id_observation),
    FOREIGN KEY (id_validation) REFERENCES Validacion(id_validation)
);

-- Tabla Favoritos
CREATE TABLE Favoritos (
    id_favorite INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    id_object INT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES Usuario(id_user),
    FOREIGN KEY (id_object) REFERENCES Objeto(id_object)
);

