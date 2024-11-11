module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    forgetpassword: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 6, // Default role ID set to 6
      references: {
        model: 'roles', // Name of the table in the database
        key: 'roleId'    // Primary key in the `roles` table
      },
      onDelete: 'CASCADE'
    }
  }, {
    tableName: 'users',
    timestamps: true
  });
  return User;
}
