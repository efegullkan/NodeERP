const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database'); // Veritabanı yapılandırmasını dahil et
const { Role } = require('./models/associations');

dotenv.config(); // .env dosyasını yükle

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);

app.get('/', (req, res) => {
  res.send('NodeERP API is running...');
});


sequelize
  .sync({ alter: true })  // alter: true, tabloyu mevcut verilerle uyumlu hale getirir
  .then(async () => {
    console.log('Database & tables updated!');
    
    // Rolleri ekle
    const roles = ['Admin', 'User'];
    for (const roleName of roles) {
      await Role.findOrCreate({
        where: { name: roleName },
        defaults: { name: roleName }
      });
    }

    console.log('Roles initialized.');
  })
  .catch(err => console.error('Error during database sync:', err));

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
