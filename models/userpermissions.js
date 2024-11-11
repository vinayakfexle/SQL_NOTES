module.exports = (sequelize, DataTypes) => {
    const UserPermission = sequelize.define('UserPermission', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'users', 
              key: 'userId'    
            }
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
        tableName: 'userpermissions', 
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ['user_id']
            }
        ]
    })
    return UserPermission;
}