const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors'); // Importar el paquete cors

dotenv.config();
connectDB();

const app = express();

// Configurar CORS con opciones específicas
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/stores', require('./routes/store'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));