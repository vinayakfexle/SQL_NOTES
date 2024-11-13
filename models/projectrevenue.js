module.exports = (sequelize, DataTypes) => {
    const ProjectRevenue = sequelize.define('ProjectRevenue',{
        revenueId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            field: 'revenueId'
        },
        projectId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        expectedRevenue: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: true,
            field: 'expectedRevenue'
        },
        actualRevenue: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: true,
            field: 'actualRevenue'
        },
        revenueDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            field: 'revenueDate'
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'createdAt'
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            onUpdate: DataTypes.NOW,
            field: 'updatedAt'
        }
    }, {
        sequelize,
        modelName: 'ProjectRevenue',
        tableName: 'projectrevenue',
        timestamps: false 
    });
    return ProjectRevenue;
}
