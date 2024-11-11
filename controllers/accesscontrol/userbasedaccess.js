const { User, UserPermission } = require('../../models/models');

async function updateUserAccess(req, res) {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: "Bad request, please provide valid data." });
    }

    if (!req.body.read_permission && req.body.create_permission && req.body.update_permission && req.body.delete_permission){
        return res.status(400).json({ error: "please add minimum one permission!"});
    }

    const newUserPermission = {
        user_id: userId,
        read_permission: req.body.read_permission || false,
        create_permission: req.body.create_permission || false,
        update_permission: req.body.update_permission || false,
        delete_permission: req.body.delete_permission || false,
    };

    try {
        const [instance, created] = await UserPermission.upsert(newUserPermission, { logging: console.log });

        console.log("instance:", instance, "created:", created);
        return res.status(200).json({ success: true, userId});
    } catch (error) {
        console.error("Error upserting user permission:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}


module.exports = updateUserAccess;