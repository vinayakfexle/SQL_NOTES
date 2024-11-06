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

module.exports = {
    User,
    Project
}

