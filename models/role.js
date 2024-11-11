module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
      roleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      roleName: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
        tableName: 'roles',
        timestamps: false
    });
    return Role;
}
    