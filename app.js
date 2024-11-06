const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3002;

const restrictToAuthorisedUserOnly = require('./middleware/auth');
const userRoute = require('./routers/user/userRouter');
const auth = require('./routers/user/auth');
const user = require('./routers/user/userRouter');
const project = require('./routers/project/project');

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routers
app.use('/users/auth', auth);
app.use('/users', restrictToAuthorisedUserOnly, user);
app.use('/project', restrictToAuthorisedUserOnly, project);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}...`);
});
