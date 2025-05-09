-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    logged BOOLEAN DEFAULT false,
    rol VARCHAR(50) DEFAULT 'user'
);

-- Crear tabla de ofertas
CREATE TABLE IF NOT EXISTS ofertas (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    country VARCHAR(100),
    salary VARCHAR(100),
    id_user INTEGER REFERENCES users(id)
);

-- Crear tabla de favoritos
CREATE TABLE IF NOT EXISTS favourite (
    id_offer SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    country VARCHAR(100),
    salary VARCHAR(100),
    id_user INTEGER REFERENCES users(id)
); 