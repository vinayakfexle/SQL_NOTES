module.exports = (sequelize, DataTypes) => {
    const ProjectCollaborator = sequelize.define('ProjectCollaborator',{
        collaboratorId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            field: 'collaboratorId'
        },
        projectId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        role: {
            type: DataTypes.ENUM('owner', 'editor', 'viewer'),
            allowNull: true,
            defaultValue: 'viewer',
            field: 'role'
        },
        canEditTasks: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: 0,
            field: 'canEditTasks'
        },
        canViewFiles: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: 1,
            field: 'canViewFiles'
        }
    }, {
        sequelize,
        modelName: 'ProjectCollaborator',
        tableName: 'projectcollaborators',
        timestamps: false
    });
    return ProjectCollaborator;
}