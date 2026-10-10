// ============================================================
// Servicio web de registro e inicio de sesión
// Tecnologías: Node.js, Express, bcryptjs
// ============================================================

const express = require("express");
const bcrypt = require("bcryptjs");

const app = express();
const PUERTO = 3000;

// Middleware que permite leer el cuerpo de las peticiones en formato JSON
app.use(express.json());

// ------------------------------------------------------------
// "Base de datos" en memoria.
// Clave: nombre de usuario | Valor: hash de la contraseña.
// En un entorno real se reemplazaría por MySQL, MongoDB, etc.
// ------------------------------------------------------------
const usuarios = {};

// ------------------------------------------------------------
// POST /api/registro
// Recibe { usuario, contrasena } y registra al usuario.
// ------------------------------------------------------------
app.post("/api/registro", async (req, res) => {
  const { usuario, contrasena } = req.body;

  // Validación: ambos campos son obligatorios
  if (!usuario || !contrasena) {
    return res.status(400).json({
      exito: false,
      mensaje: "Debe enviar usuario y contraseña",
    });
  }

  // Validación: el usuario no debe existir previamente
  if (usuarios[usuario]) {
    return res.status(409).json({
      exito: false,
      mensaje: "El usuario ya está registrado",
    });
  }

  // Se cifra la contraseña (nunca se guarda en texto plano)
  // El número 10 corresponde a las rondas de "salt" del algoritmo
  usuarios[usuario] = await bcrypt.hash(contrasena, 10);

  return res.status(201).json({
    exito: true,
    mensaje: "Usuario registrado correctamente",
  });
});

// ------------------------------------------------------------
// POST /api/login
// Recibe { usuario, contrasena } y valida las credenciales.
// ------------------------------------------------------------
app.post("/api/login", async (req, res) => {
  const { usuario, contrasena } = req.body;

  // Se busca el hash guardado para ese usuario (undefined si no existe)
  const hashGuardado = usuarios[usuario];

  // Se compara la contraseña enviada con el hash almacenado.
  // Si el usuario no existe, la autenticación falla directamente.
  const esValida =
    usuario && contrasena && hashGuardado
      ? await bcrypt.compare(contrasena, hashGuardado)
      : false;

  if (!esValida) {
    // Mensaje genérico: no revela si falló el usuario o la contraseña
    return res.status(401).json({
      exito: false,
      mensaje: "Error en la autenticación",
    });
  }

  return res.status(200).json({
    exito: true,
    mensaje: "Autenticación satisfactoria",
  });
});

// ------------------------------------------------------------
// Inicio del servidor
// ------------------------------------------------------------
app.listen(PUERTO, () => {
  console.log(`Servicio en ejecución en http://localhost:${PUERTO}`);
});
