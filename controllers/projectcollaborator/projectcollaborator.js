const { where } = require('sequelize');
const { ProjectCollaborator, User, Project } = require('../../models/models.js');

async function handleCreateProjectCollaborator(req, res) {
    try {
        const { projectId, userId } = req.body;

        if (!projectId || !userId || typeof projectId !== 'number' || typeof userId !== 'number') {
            return res.status(400).json({
                success: false,
                error: "Invalid payload data: 'projectId' and 'userId' must be numbers"
            });
        }

        const project = await Project.findOne({ where: { projectId } });
        if (!project) {
            return res.status(404).json({
                success: false,
                error: "Project not found with the provided projectId"
            });
        }

        const user = await User.findOne({ where: { userId } });
        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found with the provided userId"
            });
        }

        const projectCollaborator = await ProjectCollaborator.create({ projectId, userId });

        return res.status(201).json({
            success: true,
            message: "Project collaborator created successfully",
            projectCollaborator
        });
    } catch (e) {
        console.error("Error:", e);
        return res.status(500).json({
            success: false,
            error: e?.message || "An unexpected error occurred"
        });
    }
}


async function handleUpdateProjectCollaborator(req, res) {
    try{
        const collaboratorId = req.params.collaboratorId;
        if (Object.keys(req.body).length === 0){
            res.status(404).json({
                "success": false,
                "error": "Invalid payload data"
            });
        }

        const collaborator = await ProjectCollaborator.findOne({where: {collaboratorId}});
        if(!collaborator){
            return res.status(404).json({
                "success": false,
                "error": "collaborator not found with collaboratorId"
            });
        }

        await ProjectCollaborator.update(req.body, {where: { collaboratorId }});
        return res.status(200).json({
            "success": true,
            "message": "collaborator updated successfully"
        });
    } catch (e) {
        console.error("Error:", e);
        return res.status(500).json({
            success: false,
            error: e?.message || "An unexpected error occurred"
        });
    }
}


async function handleGetProjectCollaborator(req, res) {
    try{
        const collaboratorId = req.params.collaboratorId;
        const collaborator = await ProjectCollaborator.findOne({where: {collaboratorId}});
        console.log("collaborator:", collaborator);
        if(!collaborator){
            return res.status(404).json({
                "success": false,
                "error": "Collaborator not found with collaboratorId"
            });
        }

        return res.status(200).json({
            "success": true,
            collaborator
        });
    } catch (e) {
        console.error("Error:", e);
        return res.status(500).json({
            success: false,
            error: e?.message || "An unexpected error occurred"
        });
    }
}


async function handleDeleteProjectCollaborator(req, res) {
    try{
        const collaboratorId = req.params.collaboratorId;
        const collaborator = await ProjectCollaborator.findOne({where: {collaboratorId}});
        if(!collaborator){
            return res.status(404).json({
                "success": false,
                "error": "Collaborator not found with collaboratorId"
            });
        }

        await ProjectCollaborator.destroy({ where: { collaboratorId } })

        return res.status(200).json({
            "success": true,
            "message": "collaborator deleted successfully"
        });
        

    } catch (e) {
        console.error("Error:", e);
        return res.status(500).json({
            success: false,
            error: e?.message || "An unexpected error occurred"
        });
    }
}


module.exports = {
    handleCreateProjectCollaborator,
    handleUpdateProjectCollaborator,
    handleGetProjectCollaborator,
    handleDeleteProjectCollaborator
};
