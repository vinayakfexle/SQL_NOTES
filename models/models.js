const Sequelize = require("sequelize");
const sequelize = require("../config/database.js");

sequelize
    .sync()
    .then(() => {
        console.log("Database");
    })
    .catch((error) => console.log(error, "error"));

    const User = require("./user.js")(sequelize, Sequelize);    // done
    const Project = require("./project.js")(sequelize, Sequelize);  //done
    const ProjectCategory = require("./projectcategory.js")(sequelize, Sequelize);  //done 
    const Role = require("./role.js")(sequelize, Sequelize);    //done
    const RolePermission = require("./rolepermissions.js")(sequelize, Sequelize);   
    const UserPermission = require("./userpermissions.js")(sequelize, Sequelize);   //done
    const ProjectCollaborator = require("./projectcollaborator.js")(sequelize, Sequelize);    // 
    const ProjectRevenue = require("./projectrevenue.js")(sequelize, Sequelize); 
    const Tag = require("./tag.js")(sequelize, Sequelize);  //done
    const ProjectTag = require("./projecttags.js")(sequelize, Sequelize);   //done
    const Milestone = require("./milestones.js")(sequelize, Sequelize);   // done
    const Task = require("./task.js")(sequelize, Sequelize);   //done
    const Note = require("./note.js")(sequelize, Sequelize);   
    const Reminder = require("./reminders.js")(sequelize, Sequelize);
    const Meeting = require("./meetings.js")(sequelize, Sequelize);
    const MeetingAttendee = require("./meetingattendees.js")(sequelize, Sequelize);
    const FileAttachment = require("./fileattachements.js")(sequelize, Sequelize);
    const EmailTemplate = require("./emailtemplates.js")(sequelize, Sequelize);
    const ActivityLog = require("./activitylogs.js")(sequelize, Sequelize);
    const MenuItem = require("./menuitems.js")(sequelize, Sequelize);

    // Associations  
    Project.hasMany(Task, {
        foreignKey: "projectId",
        onDelete: "cascade",
    });

    Project.belongsTo(User, {
        foreignKey: "userId",
        onDelete: "cascade",
    });

    RolePermission.belongsTo(Role, {
        foreignKey: 'role_id',
        onDelete: 'CASCADE', 
    });

    UserPermission.belongsTo(User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
    });

    ProjectCollaborator.belongsTo(Project, {
        foreignKey: 'projectId',
        onDelete: 'CASCADE',
    });

    ProjectCollaborator.belongsTo(User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
    });
    
    Note.belongsTo(Project, { 
        foreignKey: "projectId",
        onDelete: "cascade"
    });

    Reminder.belongsTo(Project, { 
        foreignKey: "projectId", 
        onDelete: "cascade"
    });

    Reminder.belongsTo(Task, { 
        foreignKey: "taskId", 
        onDelete: "cascade"
    });

    Meeting.belongsTo(Project, { 
        foreignKey: "projectId", 
        onDelete: "cascade"
    });

    Meeting.belongsTo(User, { 
        foreignKey: "createdBy", 
        onDelete: "cascade"
    });

    MeetingAttendee.belongsTo(Meeting, { 
        foreignKey: "meetingId", 
        onDelete: "cascade" 
    });

    MeetingAttendee.belongsTo(User, { 
        foreignKey: "userId", 
        onDelete: "cascade" 
    });

    FileAttachment.belongsTo(Project, { 
        foreignKey: "projectId", 
        onDelete: "cascade" 
    });

    FileAttachment.belongsTo(Note, { 
        foreignKey: "noteId", 
        onDelete: "cascade" 
    });

    FileAttachment.belongsTo(User, { 
        foreignKey: "uploadedBy", 
        onDelete: "cascade" 
    });

    ActivityLog.belongsTo(User, { 
        foreignKey: 'userId', 
        onDelete: "cascade"  
    });

    ActivityLog.belongsTo(Project, { 
        foreignKey: 'projectId', 
        onDelete: "cascade"  
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
    Task,
    Note,
    Reminder,
    Meeting,
    MeetingAttendee,
    FileAttachment,
    EmailTemplate,
    MenuItem
}

