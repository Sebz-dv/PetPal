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

// Controlador para obtener un usuario por Email
const getUserByEmailControllerFn = async (req, res) => {
    try {
        const user = await userService.getUserByEmailDBService(req.params.email);
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send({
                "status": false,
                "message": "User not found"
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

module.exports = { createUserControllerFn, loginUserControllerFn, getUserByEmailControllerFn };
