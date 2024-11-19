module.exports = (sequelize, DataTypes) => {
    const MenuItem = sequelize.define('MenuItem', {
        menuItemId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        path: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    }, {
        tableName: 'menuitems',
        timestamps: false, 
    });

    return MenuItem;
};
