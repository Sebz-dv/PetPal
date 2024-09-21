const userModel = require('./userModel'); // Asegúrate de que la ruta sea correcta
const key = '123456789trytryrtyr'; // Llave para el encriptador
const encryptor = require('simple-encryptor')(key); // Inicializa el encriptador con la llave

// Función para crear un usuario en la base de datos
module.exports.createUserDBService = async (userDetails) => {
    try {
        const userModelData = new userModel(userDetails); // Crear una instancia del modelo

        const encrypted = encryptor.encrypt(userDetails.password);
        userModelData.password = encrypted;

        await userModelData.save(); // Guardar el usuario
        return true;
    } catch (error) {
        console.error("Error saving user:", error);
        return false;
    }
};

// Función para autenticar un usuario
module.exports.loginUserDBService = async (loginDetails) => {
    try {
        const user = await userModel.findOne({ email: loginDetails.email }).exec();

        if (!user) {
            return false;
        }

        const decryptedPassword = encryptor.decrypt(user.password);

        if (decryptedPassword === loginDetails.password) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error during login:", error);
        return false;
    }
};
