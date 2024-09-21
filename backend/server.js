const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./route/routes'); // Asegúrate de que este archivo exporte las rutas correctamente

const app = express();

// Desactiva el modo estricto para consultas
mongoose.set('strictQuery', false);

// Conexión a la base de datos usando async/await
async function connectToDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/petpal");
        console.log("Successfully Connected to DB");
    } catch (error) {
        console.log("Error Connecting to DB", error);
    }
}

// Configura CORS antes de las rutas
app.use(cors({
    origin: "http://localhost:4200", // Permite solicitudes desde tu frontend
}));

app.use(express.json()); // Asegúrate de que esta línea esté antes de las rutas

// Define las rutas después de la configuración de CORS y express.json
app.use(routes);

// Inicia el servidor en el puerto 9002
app.listen(9002, function check(err) {
    if (err) {
        console.log("Error");
    } else {
        console.log("Started");
    }
});

connectToDB();
