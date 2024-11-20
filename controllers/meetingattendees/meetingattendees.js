const { MeetingAttendee, Meeting, User } = require('../../models/models');
const { Op } = require('sequelize');

async function handleCreateMeetingAttendee(req, res){
    try{
        const { meetingId, userId } = req.body;
        if (!meetingId || !userId){
            return res.status(404).json({
                "success": false,
                "error": "invalid payload data"
            });
        }

        const meeting = await Meeting.findOne({where: { meetingId }});
        if(!meeting){
            return res.status(404).json({
                "success": false,
                "error": `meeting not found with Id: ${meetingId}`
            });
        }

        const user = await User.findOne({where: { userId }});
        if(!user){
            return res.status(404).json({
                "success": false,
                "error": `user not found with Id: ${userId}`
            });
        }

        const newMeetingAttendee = await MeetingAttendee.create({meetingId, userId});
        return res.status(200).json({
            "success": true,
            newMeetingAttendee
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


async function handleDeleteMeetingAttendee(req, res){
    try{
        const { meetingId, userId } = req.query;
        if (!meetingId) return res.status(404).json({ "success": false, "error": "please provide meetingId"});
        if (!userId) return res.status(404).json({ "success": false, "error": "please provide userId"});
        
        const meetingAttendee = await MeetingAttendee.findOne({ where: {meetingId, userId} });
        if (!meetingAttendee){
            return res.status(404).json({
                "success": false,
                "error": "meeting attendee not exist"
            });
        }

        await MeetingAttendee.destroy({ where: { meetingId, userId } });

        return res.status(200).json({
            "success": true,
            "message": "meeting attendee deleted successfully"
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


async function handleGetMeetingsByUserId(req, res) {
    try{
        const userId = req.params.userId;
        let meetings = await MeetingAttendee.findAll({ 
            attributes: ['meetingId'], 
            where: { userId } 
        });

        let meetingIds = [];
        for(let meeting of meetings){
            meetingIds.push(meeting.meetingId);
        }
        const meetingRecords = await Meeting.findAll({ 
            where: { meetingId:  meetingIds },
            meetingDate: {
                [Op.gte]: new Date()
            }
        });
        return res.status(200).json({
            "success": true,
            meetingRecords
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


async function handleGetAttendeesByMeetingId(req, res) {
    try{
        const meetingId = req.params.meetingId;
        let users = await MeetingAttendee.findAll({ 
                attributes: ['userId'] ,
                where: { meetingId }
            });

        let userIds = [];
        for(let user of users){
            userIds.push(user.userId);
        }

        const meetingAttendees = await User.findAll({ 
            attributes: ['userId', 'userName', 'email'] ,
            where: { userId:  userIds }
        });

        return res.status(200).json({
            "success": true,
            meetingAttendees
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
    handleCreateMeetingAttendee,
    handleDeleteMeetingAttendee,
    handleGetMeetingsByUserId,
    handleGetAttendeesByMeetingId
}
