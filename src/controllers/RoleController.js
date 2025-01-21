const Role = require('../models/Role');

class RoleController {
  static async createRole(req, res) {
    try {
      const { name } = req.body;
  
      // Tüm rolleri al
      const roles = await Role.findAll();
  
      // Aynı isimde bir rol olup olmadığını kontrol et
      const existingRole = roles.find(role => role.name.toLowerCase() === name.toLowerCase());
      if (existingRole) {
        return res.status(400).json({ error: 'Role with the same name already exists' });
      }
  
      // En yüksek ID değerini bul ve yeni ID'yi belirle
      const maxId = roles.reduce((max, role) => (role.id > max ? role.id : max), 0);
      const newId = maxId + 1;
  
      // Yeni rol oluştur
      const role = await Role.create({ id: newId, name });
      res.status(201).json(role);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create role', details: error });
    }
  }

  static async deleteRole(req, res) {
    try {
      const { id } = req.params;
      const role = await Role.findByPk(id);
      if (!role) {
        return res.status(404).json({ error: 'Role not found' });
      }
      await role.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete role', details: error });
    }
  }
}

module.exports = RoleController;
