module.exports = (sequelize, DataTypes) => {
    const Meeting = sequelize.define('Meeting', {
        meetingId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        projectId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        meetingTitle: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        agenda: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        meetingDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        location: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        createdBy: {
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
        tableName: 'meetings',
        timestamps: false,
    });

    return Meeting;
};
