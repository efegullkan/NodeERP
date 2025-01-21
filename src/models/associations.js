const Role = require('./Role');
const User = require('./User');

Role.hasMany(User, { foreignKey: 'roleId', as: 'users' });
User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });

module.exports = { Role, User };
