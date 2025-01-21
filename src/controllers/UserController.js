const { User, Role } = require('../models/associations');

class UserController {
  // Tüm kullanıcıları listele (admin için)
  static async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users', details: error });
    }
  }

  // Kullanıcıya rol atama
  static async assignRole(req, res) {
    try {
      const { id } = req.params;
      const { roleId } = req.body;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const role = await Role.findByPk(roleId);
      if (!role) {
        return res.status(404).json({ error: 'Role not found' });
      }
  
      // Kullanıcının eski rol ilişkisini kaldır (Eğer varsa)
      if (user.roleId) {
        user.roleId = null; // Eski ilişkiyi temizle
      }
  
      // Yeni rolü ata
      user.roleId = roleId;
      await user.save();

      res.status(200).json({ message: 'Role updated successfully', user });
    } catch (error) {
      res.status(500).json({ error: 'Failed to assign role', details: error });
    }
  }
}

module.exports = UserController;
