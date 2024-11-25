const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3002;

const restrictToAuthenticatedUserOnly = require('./middleware/auth');
const authRoute = require('./routers/user/auth');
const userRoute = require('./routers/user/userRouter');
const projectRoute = require('./routers/project/project.js');
const userBasedAccessRoute = require('./routers/accesscontrol/userbasedaccess.js');
const roleRoute = require('./routers/role/role.js');
const taskRoute = require('./routers/task/task.js');
const tagRoute = require('./routers/tag/tag.js');
const projectTagRoute = require('./routers/projecttag/projecttag.js');
const projectCategoryRoute = require('./routers/projectcategory/projectcategory.js');
const milestoneRouter = require('./routers/milestone/milestone.js');
const projectCollaboratorRouter = require('./routers/projectcollaborator/projectcollaborator.js');
const emailTemplatesRouter = require('./routers/emailtemplates/emailtemplates.js');
const meetingsRouter = require('./routers/meetings/meetings.js');
const meetingAttendeeRouter = require('./routers/meetingAttendee/meetingAttendee.js');
const notesRouter = require('./routers/notes/notes.js');
const reminderRouter = require('./routers/reminder/reminder.js');
const fileattachmentRouter = require('./routers/fileattachment/fileattachment.js');
const menuItemRouter = require('./routers/menuItem/menuItem.js');

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routers
app.use('/users/auth', authRoute);
app.use('/users', restrictToAuthenticatedUserOnly,  userRoute);
app.use('/projects', restrictToAuthenticatedUserOnly, projectRoute);
app.use('/roles', restrictToAuthenticatedUserOnly, roleRoute);
app.use('/userbasedaccess', restrictToAuthenticatedUserOnly, userBasedAccessRoute);
app.use('/tasks', restrictToAuthenticatedUserOnly, taskRoute);
app.use('/tags' , restrictToAuthenticatedUserOnly, tagRoute);
app.use('/projecttags' , restrictToAuthenticatedUserOnly, projectTagRoute);
app.use('/projectcategories', restrictToAuthenticatedUserOnly, projectCategoryRoute);
app.use('/milestones', restrictToAuthenticatedUserOnly, milestoneRouter);
app.use('/projectcollaborators', restrictToAuthenticatedUserOnly, projectCollaboratorRouter);
app.use('/emailtemplates', restrictToAuthenticatedUserOnly, emailTemplatesRouter);
app.use('/meetings', restrictToAuthenticatedUserOnly, meetingsRouter);
app.use('/meetingattendees', restrictToAuthenticatedUserOnly, meetingAttendeeRouter);
app.use('/notes', restrictToAuthenticatedUserOnly, notesRouter);
app.use('/reminders', restrictToAuthenticatedUserOnly, reminderRouter);
app.use('/fileattachments', restrictToAuthenticatedUserOnly, fileattachmentRouter);
app.use('/menuitems', restrictToAuthenticatedUserOnly, menuItemRouter);


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}...`);
});

