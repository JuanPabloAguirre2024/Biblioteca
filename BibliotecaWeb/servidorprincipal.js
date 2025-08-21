const express = require('express');
const cors = require('cors');
const app = express();
const librosRoutes = require('./routes/libros');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/libros', librosRoutes);

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});