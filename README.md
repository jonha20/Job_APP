# 📦 Buscador de Ofertas - Proyecto Full Stack

Este proyecto consiste en una aplicación web orientada a la búsqueda de ofertas de empleo. El sistema incluye autenticación de usuarios, gestión de favoritos, y scrapping de datos de ofertas desde fuentes externas.

---

## 🗄️ Base de Datos

### PostgreSQL (pgAdmin / Render)
El sistema utiliza **2 tablas principales** alojadas en PostgreSQL para el almacenamiento estructurado de datos relacionados con usuarios y anuncios favoritos.

### MongoDB (MongoDB Atlas)
Se utiliza una colección en MongoDB Atlas para almacenar los datos recopilados automáticamente por un **scraper**, que consulta fuentes externas de ofertas.

---

## 🔧 Backend (API)

La aplicación se basa en un servidor **Node.js** usando **Express** y múltiples librerías NPM.

### 📌 Rutas Principales (con vistas)

Estas rutas están disponibles desde el navegador:

- `/register` → Registro de usuarios  
- `/login` → Inicio de sesión  
- `/ads` → Listado de anuncios  
- `/favorites` → Anuncios guardados por el usuario  

Cada una soporta métodos HTTP según corresponda: `GET`, `POST`, `PUT`, `DELETE`.

### 🔐 Rutas solo por API

Estas rutas solo son accesibles mediante peticiones API:

- `/recoverpassword` → Recuperar contraseña (GET)  
- `/restorepassword` → Cambiar contraseña (GET)  
- `/users` → Gestión completa de usuarios (GET, POST, PUT, DELETE)

📍 **Enlace de despliegue**:  
👉 [https://job-app-whlc.onrender.com/login](https://job-app-whlc.onrender.com/login)

---

## 🧰 Tecnologías y Librerías

- `express` (servidor backend)  
- `bcrypt` (encriptación de contraseñas)  
- `jsonwebtoken` (autenticación y protección de rutas)  
- `pg` (conexión a PostgreSQL)  
- `mongoose` (para conectarse a MongoDB Atlas)  
- `dotenv`, `cors`, y otros middlewares  

---

## 🛡️ Seguridad y Roles

El sistema cuenta con:

- **Middleware de autenticación**: Protección de rutas privadas con tokens JWT.  
- **Middleware de roles**: Diferenciación de permisos entre `admin` y `user`.

---

## 🔍 Funcionalidad de Usuario

- **Buscador por país**: Implementado mediante manipulación del DOM.  
- **Favoritos**: Los usuarios pueden guardar anuncios de empleo como favoritos.

---

## 🚀 Despliegue

El proyecto está desplegado en **Render** tanto para el servidor Express como para la base de datos PostgreSQL. MongoDB está gestionado mediante **MongoDB Atlas**.

---

## 👥 Autores

- Michelle Diaz  
- Franco Enrici  
- Jonathan Moran
