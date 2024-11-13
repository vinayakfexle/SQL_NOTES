const Sequelize = require("sequelize");
const sequelize = require("../config/database.js");

sequelize
    .sync()
    .then(() => {
        console.log("Database");
    })
    .catch((error) => console.log(error, "error"));

    const User = require("./user.js")(sequelize, Sequelize);
    const Project = require("./project.js")(sequelize, Sequelize);
    const ProjectCategory = require("./projectcategory.js")(sequelize, Sequelize);
    const Role = require("./role.js")(sequelize, Sequelize);
    const RolePermission = require("./rolepermissions.js")(sequelize, Sequelize);
    const UserPermission = require("./userpermissions.js")(sequelize, Sequelize);
    const ProjectCollaborator = require("./projectcollaborator.js")(sequelize, Sequelize);
    const ProjectRevenue = require("./projectrevenue.js")(sequelize, Sequelize);
    const Tag = require("./tag.js")(sequelize, Sequelize);
    const ProjectTag = require("./projecttags.js")(sequelize, Sequelize);
    const Milestone = require("./milestones.js")(sequelize, Sequelize);
    const Task = require("./task.js")(sequelize, Sequelize);


    // Associations  
    Project.hasMany(Task, {
        foreignKey: "projectId",
        onDelete: "cascade",
    });

    Project.belongsTo(User, {
        foreignKey: "userId",
        onDelete: "cascade",
    });




module.exports = {
    User,
    Project,
    ProjectCategory,
    Role,
    RolePermission,
    UserPermission,
    Milestone,
    ProjectCollaborator,
    ProjectRevenue,
    Tag,
    ProjectTag,
    Task
}

