const { Note, Project } = require('../../models/models.js');

async function handleCreateNote(req, res) {
    try{
        const {projectId, content, isPinned} = req.body;
        
        if(!projectId || !content){
            return res.status(404).json({ "success": false,"error": "invalid payload data"});
        }

        const project = await Project.findOne({ where: {projectId} });
        if(!project) return res.status(404).json({
            "success": false, 
            "error": "invalid ProjectId"
        });

        const newNote = await Note.create({ projectId, content, isPinned });

        if(!newNote) return res.status(404).json({
            "success": false, "error": 
            "payload data invalid"
        });
        
        return res.status(200).json({"success": true, newNote});
    }
    catch(e){
        console.log("error:", e);
        return res.status(500).json({"success": false, "error": e?.message});
    }
}


async function handleUpdateNote(req, res) {
    try{
        const reqBody = req.body;
        const noteId = req.params.noteId;
        if(Object.keys(reqBody).length === 0){
            return res.status(404).json({ 
                "success": false, 
                "error": "invalid payload data"
            });
        }
        const note = await Note.findOne({ where: { noteId } });
        if(!note){
            return res.status(404).json({ 
                "success": false, 
                "error": `note not found with Id: ${noteId}`
            });
        }

        await Note.update(reqBody, { where: { noteId } });
        return res.status(200).json({
            "success": true, 
            "message":"note updated successfully"
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


async function handleGetNote(req, res) {
    try{
        const noteId = req.params.noteId;
        const note = await Note.findOne({ where: { noteId } });
        if (!note) return res.status(404).json({ 
            "success": false, 
            "error": `note not found with Id: ${noteId}!`
        });

        return res.status(200).json({
            "success": true, 
            note
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


async function handleDeleteNote(req, res) {
    try{
        const noteId = req.params.noteId;
        const note = await Note.findOne({ where: { noteId } });
        if (!note) return res.status(404).json({ 
            "success": false, 
            "error": `note not found with Id: ${noteId}!`
        });

        await Note.destroy({ where: { noteId } });
        return res.status(200).json({
            "success": true, 
            "message": "Note deleted successfully"
        });
    }
    catch(e){
        console.log("error:", e);
        return res.status(500).json({"success": false, "error": e?.message});
    }
}



module.exports = {
    handleCreateNote,
    handleUpdateNote,
    handleGetNote,
    handleDeleteNote
}