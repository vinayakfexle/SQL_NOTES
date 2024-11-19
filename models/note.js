module.exports = (sequelize, DataTypes) => {
    const Note = sequelize.define('Note', {
        noteId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        projectId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        isPinned: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
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
        tableName: 'notes',
        timestamps: false
    });

    return Note;
};