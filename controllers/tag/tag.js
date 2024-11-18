const { where } = require('sequelize');
const { Tag } = require('../../models/models');

async function handleCreateTag(req, res){
    try{
        const { tagName } = req.body;
        if (!tagName) return res.status(404).json({"success": false, "error": "please provide tagName"});

        const response = await Tag.create({tagName});

        return res.status(200).json({
            "success": true, 
            "message": "tag created successfully", 
            "newTag": response.dataValues
        });
    }
    catch(e){
        console.log("error:", e);
        return res.status(500).json({"success": false, "error": e});
    }
}

async function handleUpdateTag(req, res){
    try{
        const tagId = req.params.tagId;

        const tag = Tag.findOne({ where: { tagId } });
        if(!tag) return res.status(404).json({
            "success": false, 
            "error": "invalid tag Id"
        });

        if (!req.body) return res.status(404).json({
            "success": false, 
            "error": "please provide valid data"
        });

        await Tag.update(req.body, {where: { tagId } });
        return res.status(200).json({
            "success": true, 
            "message": "tag updated successfully",
        });
    }
    catch(e){
        console.log("error:", e);
        return res.status(500).json({"success": false, "error": e});
    }
}

async function handleGetTag(req, res){
    try{
        const tagId = req.params.tagId;

        const tag = await Tag.findOne({ where: { tagId } });
        if(!tag) return res.status(404).json({ "success": false, "error": "tag doesn't exist" });

        return res.status(200).json({ "success": true, tag });
    }
    catch(e){
        console.log("error:", e);
        return res.status(500).json({"success": false, "error": e});
    }
}


async function handleDeleteTag(req, res){
    try{
        const tagId = req.params.tagId;

        const tag = await Tag.findOne({ where: { tagId } });
        if(!tag) return res.status(404).json({ "success": false, "error": "tag doesn't exist" });

        await Tag.destroy({ where: { tagId } });

        return res.status(200).json({ "success": true, "message": "tag deleted successfully"});
    }
    catch(e){
        console.log("error:", e);
        return res.status(500).json({"success": false, "error": e});
    }
}


module.exports = {
    handleCreateTag,
    handleUpdateTag,
    handleGetTag,
    handleDeleteTag
};