const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://Jennifer:basededatos@cluster0.3ouua0d.mongodb.net/dbNovaStock?appName=Cluster0');
        console.log('Conectado a MongoDB Atlas con éxito');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1); 
    }
};

module.exports = connectDB;