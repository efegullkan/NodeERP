const express = require('express');
const RoleController = require('../controllers/RoleController');
const { authMiddleware, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);
router.use(authorize('Admin'));

router.post('/', RoleController.createRole);
router.delete('/:id', RoleController.deleteRole);

module.exports = router;
