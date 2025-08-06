const express = require('express');
const app = express();
const sequelize = require('./models/db');
const authRoutes = require('./routes/authRoutes');

app.use(express.json());
app.use('/api', authRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Server started on http://localhost:3000'));
});
