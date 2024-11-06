const { Project } = require('../../models/models');


async function handleCreateProject(req, res){
    try {
        const { 
            userId, projectName, description, status, deadline, categoryId, priority, isArchived 
        } = req.body;

        if (!userId || !projectName || !description || !status || !deadline || !categoryId || !priority || !isArchived ){
            return res.status(404).json({"error": "please provide all required data"});
        }

        const project = {
            "userId": userId, 
            "projectName": projectName, 
            "description": description, 
            "status": status, 
            "deadline": deadline, 
            "categoryId": categoryId, 
            "priority": priority, 
            "isArchived": isArchived 
        }

        
    }
    catch(err){
        console.log("error in controllers/project/project.js:", err);
        return res.status("400").json({ "error": err });
    }


}

async function handleUpdateProject(req, res){
    console.log("update project");
    return res.status(200).json({"success": true});
}


module.exports = {
    handleCreateProject, 
    handleUpdateProject
}
