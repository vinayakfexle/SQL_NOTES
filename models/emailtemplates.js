module.exports = (sequelize, DataTypes) => {
    const EmailTemplate = sequelize.define('EmailTemplate', {
        templateId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        templateName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        subject: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        tableName: 'emailtemplates',
        timestamps: false,
    });

    return EmailTemplate;
};
