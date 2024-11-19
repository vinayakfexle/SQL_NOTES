const { where } = require('sequelize');
const { Meeting, User } = require('../../models/models');

async function handleCreateMeeting(req, res){
    try{
        const {projectId, meetingTitle, agenda, meetingDate, location, createdBy} = req.body;
        if (!projectId || !meetingTitle || !agenda || !meetingDate || !location || !createdBy){
            return res.status(404).json({
                "success": false,
                "error": "invalid payload data"
            });
        }

        const user = await User.findOne({ where: { userId: createdBy } });
        if(!user){
            return res.status(404).json({
                "success": false,
                "error": `user not found with Id: ${createdBy}`
            });
        }

        const newMeeting = await Meeting.create({ projectId, meetingTitle, agenda, meetingDate, location, createdBy });
        return res.status(200).json({
            "success": true,
            newMeeting
        });
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            "success": false,
            "error": e?.message
        });
    }
}


async function handleGetMeeting(req, res){
    try{
        const meetingId = req.params.meetingId;
        const meeting = await Meeting.findOne( { where: { meetingId } });
        if (!meeting){
            return res.status(404).json({
                "success": false,
                "error": `meeting not found with Id: ${meetingId}`
            });
        }
        return res.status(200).json({
            "success": true,
            meeting
        });
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            "success": false,
            "error": e?.message
        });
    }
}


async function handleUpdateMeeting(req, res){
    try{
        const meetingId = req.params.meetingId;
        if(Object.keys(req.body).length === 0){
            return res.status(404).json({ 
                "success": false,
                "error": "invalid payload data"
            });
        }

        const meeting = await Meeting.findOne({ where: { meetingId } });
        if(!meeting){
            return res.status(404).json({ 
                "success": false, 
                "error": `meeting not found with Id: ${meetingId}`
            });
        }

        await Meeting.update(req.body, { where: { meetingId }});
        return res.status(200).json({
            "success": true, 
            "message": "meeting updated successfully"
        });
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            "success": false,
            "error": e?.message
        });
    }
}


async function handleDeleteMeeting(req, res){
    try{
        const meetingId = req.params.meetingId;
        const meeting = await Meeting.findOne({ where: { meetingId } });
        if(!meeting){
            return res.status(404).json({ 
                "success": false, 
                "error": `meeting not found with Id: ${meetingId}`
            });
        }
        
        await Meeting.destroy({where: { meetingId }});
        return res.status(200).json({
            "success": true, 
            "message": "meeting deleted successfully"
        });
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            "success": false,
            "error": e?.message
        });
    }
}



module.exports = {
    handleCreateMeeting,
    handleGetMeeting,
    handleUpdateMeeting,
    handleDeleteMeeting
}