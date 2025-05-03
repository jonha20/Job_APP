# API Test Routes

## Autenticación

### 1. Registrar Usuario
```http
POST http://localhost:3000/api/users
Content-Type: application/json

{
    "email": "test@example.com",
    "password": "123456",
    "name": "Test User",
    "role": "user"  // opcional, por defecto es "user"
}
```

### 2. Login
```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
    "email": "test@example.com",
    "password": "123456"
}
```

### 3. Logout
```http
POST http://localhost:3000/api/auth/logout
Authorization: Bearer <tu_token_jwt>
```

## Anuncios

### 1. Crear Anuncio
```http
POST http://localhost:3000/api/ads
Content-Type: application/json
Authorization: Bearer <tu_token_jwt>

{
    "title": "Desarrollador Full Stack",
    "description": "Buscamos desarrollador con experiencia",
    "type": "job",
    "category": "IT",
    "location": "Remoto",
    "salary": 50000
}
```

### 2. Obtener Todos los Anuncios
```http
GET http://localhost:3000/api/ads
```

### 3. Obtener Anuncio por ID
```http
GET http://localhost:3000/api/ads/<id_del_anuncio>
```

### 4. Actualizar Anuncio
```http
PUT http://localhost:3000/api/ads/<id_del_anuncio>
Content-Type: application/json
Authorization: Bearer <tu_token_jwt>

{
    "title": "Desarrollador Full Stack Actualizado",
    "description": "Buscamos desarrollador con experiencia actualizada",
    "salary": 60000
}
```

### 5. Eliminar Anuncio
```http
DELETE http://localhost:3000/api/ads/<id_del_anuncio>
Authorization: Bearer <tu_token_jwt>
```

## Favoritos

### 1. Agregar a Favoritos
```http
POST http://localhost:3000/api/favorites
Content-Type: application/json
Authorization: Bearer <tu_token_jwt>

{
    "adId": "<id_del_anuncio>"
}
```

### 2. Obtener Favoritos del Usuario
```http
GET http://localhost:3000/api/favorites
Authorization: Bearer <tu_token_jwt>
```

### 3. Eliminar de Favoritos
```http
DELETE http://localhost:3000/api/favorites/<id_del_favorito>
Authorization: Bearer <tu_token_jwt>
```

## Usuarios

### 1. Actualizar Perfil
```http
PUT http://localhost:3000/api/users/profile
Content-Type: application/json
Authorization: Bearer <tu_token_jwt>

{
    "name": "Nuevo Nombre",
    "email": "nuevo@email.com"
}
```

### 2. Obtener Lista de Usuarios (Admin)
```http
GET http://localhost:3000/api/users
Authorization: Bearer <tu_token_jwt>
```

### 3. Eliminar Usuario (Admin)
```http
DELETE http://localhost:3000/api/users/<id_del_usuario>
Authorization: Bearer <tu_token_jwt>
```

## Notas Importantes

1. Reemplaza `<tu_token_jwt>` con el token que recibes al hacer login
2. Reemplaza `<id_del_anuncio>`, `<id_del_favorito>`, `<id_del_usuario>` con los IDs correspondientes
3. Las rutas marcadas como "Admin" requieren que el usuario tenga el rol "admin"
4. Para probar las rutas, puedes usar Thunder Client, Postman o cualquier cliente HTTP 