module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
      taskId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      projectId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      taskName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      assignedTo: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('pending', 'in progress', 'completed'),
        allowNull: true,
        defaultValue: 'pending',
      },
      dueDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      priority: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        allowNull: true,
        defaultValue: 'medium',
      },
      templateId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    }, {
      tableName: 'tasks',
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    });
    
    return Task;
  };
  