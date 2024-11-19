module.exports = (sequelize, DataTypes) => {
    const FileAttachment = sequelize.define('FileAttachment', {
        fileId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        projectId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        noteId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        fileName: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        fileType: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        filePath: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        uploadedBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        uploadedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        tableName: 'fileattachments',
        timestamps: false,
    });

    return FileAttachment;
};
