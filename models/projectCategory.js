const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

module.exports = (sequelize, DataTypes) => {
    const ProjectCategory = sequelize.define('ProjectCategory', {
        categoryId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        categoryName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },{
        tableName: 'projectcategories',
        timestamps: true
    });

    return ProjectCategory;
}