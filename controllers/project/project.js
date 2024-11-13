const { where } = require('sequelize');
const { Project, ProjectCategory, Task, User } = require('../../models/models');

async function handleGetProject(req, res) {
    try {
        const projectId = req.params.projectId;
        console.log("projectId:", projectId);

        const project = await Project.findOne({
            where: { projectId },
            // include: [
            //     { 
            //         model: Task
            //     },
            //     { 
            //         model: User, 
            //         attributes: { exclude: ['passwordHash', 'forgetpassword'] }
            //     },
            // ] 
        });

        return res.status(200).json({
            "success": true,
            project
        });
    }
    catch (error) {
        console.log("error in controllers/project/project.js:", error);
        return res.status(400).json({ "error": error.message });
    }
}


async function handleCreateProject(req, res){
    try {
        const { userId, projectName, description, deadline, categoryId } = req.body;

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
    try{
        const projectId = req.params.projectId;
        const data = req.body;

        if (!projectId) return res.status(404).json("bad request! project Id not found.");

        let project = await Project.findOne({ where: { projectId: projectId } });
        if (!project) return res.status(404).json("please provide valid user Id...");

        let data_to_update = {}
        for (let field in data){
            if (data[field]){
                data_to_update[field] = data[field];
            }
        }

        const result = await Project.update( data_to_update, { where: { projectId: projectId } });

        project = await Project.findOne(
            { where: { projectId: projectId },
            
        });

        return res.status(200).json({
            "success":true,
            project
        });
    }

    catch(err){
        console.log(err);
        return res.status(404).json({"success":false, "error":"update failed, please check your data..."});
    }
}


module.exports = {
    handleCreateProject, 
    handleUpdateProject,
    handleGetProject
}

