const { ProjectTag, Project, Tag } = require('../../models/models');

async function handleCreateProjectTag(req, res){
    try{
        const { projectId, tagId } = req.body;
        
        if (!projectId || !tagId) return res.status(404).json({ "success": false, "error": "please provide all required data"});

        const project = Project.findOne({ where: { projectId } });
        if (!project) return res.status(404).json({ "success": false, "error": `project not found with id ${projectId}` });

        const task = Tag.findOne({ where: { tagId } });
        if (!task) return res.status(404).json({ "success": false, "error": `tag not found with id ${tagId}` });

        const newTag = await ProjectTag.create({ projectId, tagId });
        console.log(newTag);

        return res.status(200).json({ "success": true, newTag });
    }
    catch(e){
        console.log("error:", e);
        return res.status(200).json({ "success": false, "error": e});
    }
}

async function handleDeleteProjectTag(req, res){
    try{
        const { projectId, tagId } = req.query;
        await ProjectTag.destroy({where: { projectId, tagId }});
        return res.status(200).json({ "success": true, "message": "projecttag deleted successfully"});
    }
    catch(e){
        console.log("error:", e);
        return res.status(500).json({ "success": false, "error": e});
    }
}


module.exports = {
    handleCreateProjectTag,
    handleDeleteProjectTag
}