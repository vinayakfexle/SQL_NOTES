module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('Project', {
        projectId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        projectName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('active', 'completed'),
            allowNull: true,
            defaultValue: 'active',
        },
        deadline: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        priority: {
            type: DataTypes.ENUM('low', 'medium', 'high'),
            allowNull: true,
            defaultValue: 'medium',
        },
        isArchived: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: 0,
        }
    }, {
        tableName: 'projects',
        timestamps: false
    });
    
    return Project;
};
