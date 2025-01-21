const express = require('express');
const UserController = require('../controllers/UserController');
const { authMiddleware, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// Genel kullanıcı rotaları
router.get('/', authMiddleware, authorize('admin'), UserController.getAllUsers);

// Admin için özel rotalar
router.put('/:id/role', authMiddleware, authorize('admin'), UserController.assignRole);

module.exports = router;
