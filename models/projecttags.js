module.exports = (sequelize, DataTypes) => {
    const ProjectTag = sequelize.define('ProjectTag', {
        projectId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Project', 
                key: 'projectId'
            },
            onDelete: 'CASCADE'
        },
        tagId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Tag', 
                key: 'tagId'
            },
            onDelete: 'CASCADE'
        }
    }, {
        tableName: 'projecttags',
        timestamps: false
    });
    return ProjectTag;
};
