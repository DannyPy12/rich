const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());  // Habilita CORS para todas las rutas
app.use('/api/auth', authRoutes);

sequelize.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(error => {
    console.error('Error syncing database:', error); // Asegurarse de que este log esté presente
  });
