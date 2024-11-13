module.exports = (sequelize, DataTypes) => {
    const Milestone = sequelize.define('Milestone',{
        milestoneId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            field: 'milestoneId'
        },
        projectId: {
            type: DataTypes.INTEGER,
            field: 'projectId'
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'title'
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'description'
        },
        dueDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            field: 'dueDate'
        },
        isCompleted: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: 0,
            field: 'isCompleted'
        }
    }, {
        sequelize,
        modelName: 'Milestone',
        tableName: 'milestones',
        timestamps: false
    });

    return Milestone;
}
