const { FileAttachment, Note, Project, User } = require('../../models/models.js');

async function handleCreateFileAttachment(req, res) {
    try{
        const {projectId, noteId, fileName, fileType, filePath, uploadedBy} = req.body;
        
        if(!projectId || !noteId || !fileName || !fileType || !filePath || !uploadedBy){
            return res.status(404).json({ "success": false,"error": "invalid payload data"});
        }
        
        const user = await User.findOne({ where: {userId: uploadedBy} });
        if(!user) return res.status(404).json({
            "success": false, 
            "error": "invalid uploadedBy attribute value"
        });

        const note = await Note.findOne({ where: {noteId} });
        if(!note) return res.status(404).json({
            "success": false, 
            "error": "invalid noteId"
        });

        const project = await Project.findOne({ where: {projectId} });
        if(!project) return res.status(404).json({
            "success": false, 
            "error": "invalid ProjectId"
        });

        const fileattachment = await FileAttachment.create({
            projectId, noteId, fileName, fileType, filePath, uploadedBy
        });

        if(!fileattachment) return res.status(404).json({
            "success": false, 
            "error": "invalid payload data"
        });
        
        return res.status(200).json({"success": true, fileattachment});
    }
    catch(e){
        console.log("error:", e);
        return res.status(500).json({"success": false, "error": e?.message});
    }
}

async function handleGetFileAttachment(req, res) {
    try{
        const fileId = req.params.fileId;
        const fileattachment = await FileAttachment.findOne({ where: { fileId } });
        if (!fileattachment) return res.status(404).json({ 
            "success": false, 
            "error": `fileattachment not found with Id: ${fileId}!`
        });

        return res.status(200).json({
            "success": true, 
            fileattachment
        });
    }
    catch(e){
        console.log("error:", e);
        return res.status(500).json({
            "success": false, 
            "error": e?.message
        });
    }
}

async function handleUpdateFileAttachment(req, res) {
    try{
        const reqBody = req.body;
        const fileId = req.params.fileId;
        if(Object.keys(reqBody).length === 0){
            return res.status(404).json({ 
                "success": false, 
                "error": "invalid payload data"
            });
        }
        const fileattachment = await FileAttachment.findOne({ where: { fileId } });
        if(!fileattachment){
            return res.status(404).json({ 
                "success": false, 
                "error": `fileattachment not found with Id: ${fileId}`
            });
        }

        await FileAttachment.update(reqBody, { where: { fileId } });
        return res.status(200).json({
            "success": true, 
            "message":"fileattachment updated successfully"
        });
    }
    catch(e){
        console.log("error:", e);
        return res.status(500).json({
            "success": false, 
            "error": e?.message
        });
    }
}

async function handleDeleteFileAttachment(req, res) {
    try{
        const fileId = req.params.fileId;
        const fileattachment = await FileAttachment.findOne({ where: { fileId } });
        if (!fileattachment) return res.status(404).json({ 
            "success": false, 
            "error": `note not found with Id: ${fileId}!`
        });

        await FileAttachment.destroy({ where: { fileId } });

        return res.status(200).json({
            "success": true, 
            "message": "fileAttachment deleted successfully"
        });
    }
    catch(e){
        console.log("error:", e);
        return res.status(500).json({
            "success": false, 
            "error": e?.message
        });
    }
}


module.exports = {
    handleCreateFileAttachment,
    handleGetFileAttachment,
    handleUpdateFileAttachment,
    handleDeleteFileAttachment
};
