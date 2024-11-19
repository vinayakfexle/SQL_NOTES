const { where } = require("sequelize");
const { Milestone, Project} = require("../../models/models.js");

async function handleCreateMilestone(req, res){
    try{
        const {projectId, title, description, dueDate, isCompleted} = req.body;
        
        
        if(!projectId || !title || !description || !dueDate){
            return res.status(404).json({ "success": false,"error": "invalid payload data"});
        }

        const project = await Project.findOne({ where: {projectId} });
        if(!project) return res.status(404).json({"success": false, "error": "invalid ProjectId"});
        console.log("project:", project);

        const milestone = await Milestone.create({ projectId, title, description, dueDate, isCompleted });
        if(!milestone) return res.status(404).json({"success": false, "error": "payload data invalid"});
        return res.status(200).json({"success": true, milestone});
    }
    catch(e){
        console.log("error:", e);
        return res.status(500).json({"success": false, "error": e?.message});
    }
}


async function handleUpdateMilestone(req, res){
    try{
        const reqBody = req.body;
        const milestoneId = req.params.milestoneId;
        if(Object.keys(reqBody).length === 0){
            return res.status(404).json({ 
                "success": false, 
                "error": "invalid payload data"
            });
        }
        const milestone = await Milestone.findOne({ where: { milestoneId } });
        if(!milestone){
            return res.status(404).json({ 
                "success": false, 
                "error": `milestone not found with Id: ${milestoneId}`
            });
        }

        await Milestone.update(reqBody, { where: { milestoneId } });
        return res.status(200).json({"success": true, "message":"milestone updated successfully"});
    }
    catch(e){
        console.log("error:", e);
        return res.status(500).json({"success": false, "error": e?.message});
    }
}


async function handleGetMilestone(req, res){
    try{
        const milestoneId = req.params.milestoneId;
        const milestone = await Milestone.findOne({ where: { milestoneId } });
        if (!milestone) return res.status(404).json({ "success": false, "error": "milestone not found!" });
        return res.status(200).json({"success": true, milestone});
    }
    catch(e){
        console.log("error:", e);
        return res.status(500).json({"success": false, "error": e?.message});
    }
}


async function handleDeleteMilestone(req, res){
    try{
        const milestoneId = req.params.milestoneId;
        const milestone = await Milestone.findOne({ where: { milestoneId } });
        if (!milestone) return res.status(404).json({ "success": false, "error": "milestone not found!" });
        await Milestone.destroy({ where: { milestoneId } });
        return res.status(200).json({"success": true, "message": "milestone deleted successfully"});
    }
    catch(e){
        console.log("error:", e);
        return res.status(500).json({"success": false, "error": e?.message});
    }
}


module.exports = {
    handleCreateMilestone,
    handleUpdateMilestone,
    handleGetMilestone,
    handleDeleteMilestone
}
