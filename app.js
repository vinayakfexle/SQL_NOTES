const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3002;

const restrictToAuthenticatedUserOnly = require('./middleware/auth');
const authRoute = require('./routers/user/auth');
const userRoute = require('./routers/user/userRouter');
const projectRoute = require('./routers/project/project.js');
const userBasedAccessRoute = require('./routers/accesscontrol/userbasedaccess');
const roleRoute = require('./routers/role/role.js');
const taskRoute = require('./routers/task/task.js');

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routers
app.use('/users/auth', authRoute);
app.use('/users', restrictToAuthenticatedUserOnly,  userRoute);
app.use('/projects', restrictToAuthenticatedUserOnly, projectRoute);
app.use('/roles', restrictToAuthenticatedUserOnly, roleRoute);
app.use('/userbasedaccess', restrictToAuthenticatedUserOnly, userBasedAccessRoute);



app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}...`);
});

