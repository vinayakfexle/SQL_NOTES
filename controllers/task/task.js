const { Task, User, Project } = require('../../models/models.js');

async function handleCreateTask(req, res){
    try{
        const { 
            projectId, 
            taskName, 
            description, 
            assignedTo, 
            status, 
            dueDate, 
            priority, 
            templateId
        } = req.body;

        if (!projectId || !taskName || !description || !assignedTo || !status || !dueDate || !priority || !templateId){
            return res.status(400).json("bad request, Please provide all required values..!");
        }

        const project = await Project.findOne({ where: { projectId } });
        if (!project) res.status(400).json({ 
            "success": false, 
            "error": `project doesn't exist with id : ${projectId}` 
        });

        const user = await User.findOne({ where: { userId: assignedTo } });
        if (!user) res.status(400).json({ 
            "success": false, 
            "error": `user doesn't exist with id : ${assignedTo}`
        });

        const newTask = {
            'projectId': projectId, 
            'taskName': taskName, 
            'description': description, 
            'assignedTo': assignedTo, 
            'status': status, 
            'dueDate': dueDate, 
            'priority': priority, 
            'templateId': templateId 
        };

        const result = await Task.create(newTask);

        res.status(200).json({
            "success": true,
            result
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


async function handleGetTask(req, res){
    try{
        const taskId = req.params.taskId;

        if(!taskId) return res.status(404).json({ "error": "taskId not found!" });

        const task = await Task.findByPk(taskId);
        if(!task) return res.status(404).json({
            "success": false, 
            "message": `task not found with id ${taskId}`
        });

        return res.status(200).json({
            "success": true,
            task
        });
    }
    catch(error){
        console.log("error in controller/task/task.js:", error);
        return res.status(500).json({"success": false, "error": error});
    } 
}


async function handleUpdateTask(req, res){
    try{
        if (!req.params.taskId) res.status(404).json({ "error": "taskId not found!" });
        await Task.update(req.body, { where: { taskId: req.params.taskId } });
        res.status(200).json({
            "success": true,
            "message": "Task Updated successfully"
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({ "error": error });
    }

}


async function handleDeleteTask(req, res){
    try{
        const taskId = req.params.taskId;

        if (!taskId) res.status(404).json({ "error": "taskId not found!" });

        const task = await Task.findOne({ where: { taskId } });
        if(!task) res.status(404).json({
            "success": false, 
            "message": `task not found with id ${taskId}`
        });

        await Task.destroy({ where: { taskId } });

        return res.status(200).json({
            "success": true,
            "message": "task deleted successfully"
        });
    }
    catch(error){
        console.log("error in controller/task/task.js:", error);
        res.status(500).json({"success": false, "error": error});
    }
}


module.exports = {
    handleCreateTask,
    handleUpdateTask,
    handleGetTask,
    handleDeleteTask
}