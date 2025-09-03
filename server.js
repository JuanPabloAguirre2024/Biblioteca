require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error(err));

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));