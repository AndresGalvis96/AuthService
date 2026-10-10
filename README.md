# Servicio web de registro e inicio de sesión

API REST en Node.js + Express que permite registrar usuarios y autenticarlos.
Las contraseñas se almacenan cifradas con bcrypt.

## Requisitos
- Node.js 18 o superior
- Git

## Instalación y ejecución
```bash
npm install
npm start
```
El servicio queda disponible en `http://localhost:3000`.

## Endpoints

### POST /api/registro
Cuerpo: `{ "usuario": "nombre", "contrasena": "Clave123" }`

| Código | Significado | Respuesta |
|---|---|---|
| 201 | Usuario creado | `{"exito":true,"mensaje":"Usuario registrado correctamente"}` |
| 400 | Faltan datos | `{"exito":false,"mensaje":"Debe enviar usuario y contraseña"}` |
| 409 | Usuario ya existe | `{"exito":false,"mensaje":"El usuario ya está registrado"}` |

### POST /api/login
Cuerpo: `{ "usuario": "juan", "contrasena": "Clave123" }`

| Código | Significado | Respuesta |
|---|---|---|
| 200 | Credenciales correctas | `{"exito":true,"mensaje":"Autenticación satisfactoria"}` |
| 401 | Credenciales incorrectas | `{"exito":false,"mensaje":"Error en la autenticación"}` |

## Pruebas con curl
```bash
curl -X POST http://localhost:3000/api/registro -H "Content-Type: application/json" -d '{"usuario":"juan","contrasena":"Clave123"}'
curl -X POST http://localhost:3000/api/login -H "Content-Type: application/json" -d '{"usuario":"juan","contrasena":"Clave123"}'
```

## Nota
Los usuarios se guardan en memoria; se pierden al reiniciar el servidor.
