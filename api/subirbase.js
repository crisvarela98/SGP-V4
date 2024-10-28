const mongoose = require('mongoose');
const fs = require('fs');

// URI de conexión a MongoDB
const uri = "mongodb+srv://crisvarela98:8RhsLRfAy0UHpMlW@adminsgppanel.fwdca.mongodb.net/adminSGPpanel";

// Conectar a MongoDB
mongoose.connect(uri)
    .then(async () => {
        console.log('Conectado a MongoDB Atlas');

        // Definir el esquema (si es necesario) y la colección
        const schema = new mongoose.Schema({}, { strict: false }); // Esquema flexible

        // Leer y subir datos para la colección 'pedidos'
        const pedidosData = JSON.parse(fs.readFileSync('data/pedidos.json', 'utf-8'));
        const Pedidos = mongoose.model('pedidos', schema, 'pedidos');
        await Pedidos.insertMany(pedidosData);
        console.log('Datos de pedidos subidos a MongoDB');

        // Leer y subir datos para la colección 'notas'
        const notasData = JSON.parse(fs.readFileSync('data/notas.json', 'utf-8'));
        const Notas = mongoose.model('notas', schema, 'notas');
        await Notas.insertMany(notasData);
        console.log('Datos de notas subidos a MongoDB');

        // Cerrar la conexión
        mongoose.connection.close();
        console.log('Conexión cerrada');
    })
    .catch((error) => {
        console.error('Error conectando a MongoDB:', error);
    });
