const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config(); // .env dosyasını yükle

const sequelize = new Sequelize(
  process.env.DB_NAME,      // Veritabanı adı
  process.env.DB_USER,      // Kullanıcı adı
  process.env.DB_PASSWORD,  // Şifre
  {
    host: process.env.DB_HOST,    // Host (örn: localhost)
    dialect: 'mysql',            // Kullanılan veritabanı türü
    port: process.env.DB_PORT || 3306, // Port (varsayılan: 3306)
    logging: false               // SQL çıktısını kapatmak için
  }
);

module.exports = sequelize;
