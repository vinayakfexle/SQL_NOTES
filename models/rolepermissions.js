module.exports = (sequelize, DataTypes) => {
    const RolePermission = sequelize.define('RolePermission', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'roles', 
              key: 'roleId'    
            }
        },
        resource_type: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        read_permission: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        create_permission: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        update_permission: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        delete_permission: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        tableName: 'rolepermissions', 
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ['role_id', 'resource_type']
            }
        ]
    })
    return RolePermission;
}