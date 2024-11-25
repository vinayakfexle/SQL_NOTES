const { Reminder, Task, Project } = require('../../models/models.js');

async function handleCreateRemainder(req, res){
    try{
        const { projectId, taskId, reminderDate, message, isSent } = req.body;

        if (!projectId || !taskId || !reminderDate || !message){
            return res.status(400).json("bad request, Please provide all required values..!");
        }

        const project = await Project.findOne({ where: { projectId } });
        if (!project) res.status(400).json({ 
            "success": false, 
            "error": `project doesn't exist with id : ${projectId}` 
        });

        const task = await Task.findOne({ where: { taskId } });
        if (!task) res.status(400).json({ 
            "success": false, 
            "error": `task doesn't exist with id : ${taskId}`
        });

        const newReminder = await Reminder.create({ projectId, taskId, reminderDate, message, isSent});

        res.status(200).json({
            "success": true,
            newReminder
        });
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            "success": false,
            "error": error
        });
    }
}


async function handleGetReminder(req, res) {
    try{
        const reminderId = req.params.reminderId;
        const reminder = await Reminder.findByPk(reminderId);
        if(!reminder) return res.status(404).json({
            "success": false, 
            "message": `reminder not found with id ${reminderId}`
        });

        return res.status(200).json({
            "success": true,
            reminder
        });
    }
    catch(error){
        console.log("error in controller/task/task.js:", error);
        return res.status(500).json({"success": false, "error": error});
    } 
}


async function handleUpdateReminder(req, res) {
    try{
        const reminderId = req.params.reminderId;
        
        const reminder = await Reminder.findOne({ where: { reminderId } });
        if(!reminder){
            return res.status(404).json({
                "success": false,
                "error": `reminder not found with Id: ${reminderId}`
            });
        }

        await Reminder.update(req.body, { where: { reminderId } });
        res.status(200).json({
            "success": true,
            "message": "reminder Updated successfully"
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({ "error": error });
    }
}


async function handleDeleteReminder(req, res) {
    try{
        const reminderId = req.params.reminderId;
        const reminder = await Reminder.findOne({ where: { reminderId } });
        if(!reminder) res.status(404).json({
            "success": false, 
            "message": `reminder not found with id ${reminderId}`
        });

        await Reminder.destroy({ where: { reminderId } });

        return res.status(200).json({
            "success": true,
            "message": "reminder deleted successfully"
        });
    }
    catch(error){
        console.log("error:", error);
        res.status(500).json({
            "success": false, 
            "error": error?.message
        });
    }
}


module.exports = {
    handleCreateRemainder,
    handleGetReminder,
    handleUpdateReminder,
    handleDeleteReminder
}