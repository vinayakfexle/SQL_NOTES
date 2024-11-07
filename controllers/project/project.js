const { Project, ProjectCategory } = require('../../models/models');


async function handleCreateProject(req, res){
    try {
        const { 
            userId, projectName, description, deadline, categoryId 
        } = req.body;

        if (!userId || !projectName || !description || !deadline || !categoryId){
            return res.status(404).json({"error": "please provide all required data"});
        }

        // Check if the provided categoryId exists in projectcategories
        const category = await ProjectCategory.findOne({ where: { categoryId } });
        if (!category) {
            return res.status(404).json({ "error": "Category does not exist" });
        }

        // Check if any project is already exists with the same name 
        const project = await Project.findOne({ where: { projectName } });
        if (project) {
            return res.status(404).json({ "error": "project already exist" });
        }

        const projectData = {
            "userId": userId, 
            "projectName": projectName, 
            "description": description,
            "deadline": deadline, 
            "categoryId": categoryId
        }

        const newProject = await Project.create(projectData);
        await newProject.save();
        return res.status(200).json({ "success": true, newProject});
    }
    catch(err){
        console.log("error in controllers/project/project.js:", err);
        return res.status(400).json({ "error": err });
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