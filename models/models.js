const Sequelize = require("sequelize");
const sequelize = require("../config/database.js");

sequelize
    .sync()
    .then(() => {
        console.log("Database");
    })
    .catch((error) => console.log(error, "error"));

const UserModel = require("./user.js");
const User = UserModel(sequelize, Sequelize);

const ProjectModel = require("./project.js");
const Project = ProjectModel(sequelize, Sequelize);

const ProjectCategoryModel = require("./projectcategory.js");
const ProjectCategory = ProjectCategoryModel(sequelize, Sequelize);

const RoleModel = require("./role.js");
const Role = RoleModel(sequelize, Sequelize);

const RolePermissionsModel = require("./rolepermissions.js");
const RolePermission = RolePermissionsModel(sequelize, Sequelize);

const UserPermissionsModel = require("./userpermissions.js");
const UserPermission = UserPermissionsModel(sequelize, Sequelize);



module.exports = {
    User,
    Project,
    ProjectCategory,
    Role,
    RolePermission,
    UserPermission
}

