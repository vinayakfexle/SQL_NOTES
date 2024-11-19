module.exports = (sequelize, DataTypes) => {
    const Reminder = sequelize.define('Reminder', {
        reminderId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        projectId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        taskId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        reminderDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        isSent: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        tableName: 'reminders',
        timestamps: false,
    });

    return Reminder;
};
