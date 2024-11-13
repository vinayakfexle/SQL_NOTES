module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define('Tag', {
        tagId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        tagName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'tags',
        timestamps: false
    });
    return Tag;
};
