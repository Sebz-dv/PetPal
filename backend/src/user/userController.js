const User = require('./userModel'); // Asegúrate de que la ruta sea correcta
const userService = require('./userService');

// Controlador para crear un usuario
const createUserControllerFn = async (req, res) => {
  try {
    const status = await userService.createUserDBService(req.body);

    if (status) {
      res.status(201).send({
        "status": true,
        "message": "User created successfully"
      });
    } else {
      res.status(400).send({
        "status": false,
        "message": "Error creating user"
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      "status": false,
      "message": "Internal server error"
    });
  }
};

// Controlador para login de usuario
const loginUserControllerFn = async (req, res) => {
  try {
    const isAuthenticated = await userService.loginUserDBService(req.body);

    if (isAuthenticated) {
      res.status(200).send({
        "status": true,
        "message": "Login successful"
      });
    } else {
      res.status(401).send({
        "status": false,
        "message": "Invalid email or password"
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      "status": false,
      "message": "Internal server error"
    });
  }
};

const getUserFirstNameControllerFn = async (req, res) => {
  try {
    const email = req.query.email;
    const user = await userService.getUserByEmail(email);

    if (user) {
      res.status(200).send({
        "status": true,
        "firstName": user.firstname,
      });
    } else {
      res.status(404).send({
        "status": false,
        "message": "User not found",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      "status": false,
      "message": "Internal server error",
    });
  }
};

// Controlador para verificar si el email ya existe
const getCheckEmailControllerFN = async (req, res) => {
  const {
    email
  } = req.query;

  try {
    const user = await User.findOne({
      email: email
    });

    if (user) {
      return res.json({
        exists: true
      });
    } else {
      return res.json({
        exists: false
      });
    }
  } catch (err) {
    console.error('Error al verificar email:', err);
    return res.status(500).json({
      status: false,
      message: 'Error en el servidor al verificar el email',
    });
  }
};

const getEmailControllerFN = async (req, res) => {
  const email = req.params.email;
  console.log("Email recibido:", email); // Verifica que se esté recibiendo el email correctamente

  // Buscar el usuario en la base de datos
  User.findOne({
      email: email
    })
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({
          message: "User not found"
        });
      }
    })
    .catch(err => {
      console.error("Error al recuperar el usuario:", err); // Log de error
      res.status(500).json({
        message: "Error retrieving user"
      });
    });
};

module.exports = {
  createUserControllerFn,
  loginUserControllerFn,
  getUserFirstNameControllerFn,
  getCheckEmailControllerFN,
  getEmailControllerFN
};
