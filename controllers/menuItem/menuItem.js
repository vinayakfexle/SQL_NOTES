const { MenuItem } = require('../../models/models.js');

async function handleCreateMenuItem(req, res) {
    try{
        const {name, path} = req.body;
        
        if(!name || !path ){
            return res.status(404).json({ 
                "success": false,
                "error": "invalid payload data"
            });
        }

        const menuitem = await MenuItem.create({ name, path });

        if(!menuitem) return res.status(404).json({
            "success": false, 
            "error": "invalid payload data"
        });
        
        return res.status(200).json({"success": true, menuitem});
    }
    catch(e){
        console.log("error:", e);
        return res.status(500).json({
            "success": false, 
            "error": e?.message
        });
    }
}


async function handleGetMenuItem(req, res) {
    try{
        const menuItemId = req.params.menuItemId;
        const menuitem = await MenuItem.findOne({ where: { menuItemId } });
        if (!menuitem) return res.status(404).json({ 
            "success": false, 
            "error": `menuItem not found with Id: ${menuItemId}!`
        });

        return res.status(200).json({
            "success": true, 
            menuitem
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

async function handleUpdateMenuItem(req, res) {
    try{
        const reqBody = req.body;
        const menuItemId = req.params.menuItemId;
        if(Object.keys(reqBody).length === 0){
            return res.status(404).json({ 
                "success": false, 
                "error": "invalid payload data"
            });
        }
        const menuitem = await MenuItem.findOne({ where: { menuItemId } });
        if(!menuitem){
            return res.status(404).json({ 
                "success": false, 
                "error": `menuItem not found with Id: ${menuItemId}`
            });
        }

        await MenuItem.update(reqBody, { where: { menuItemId } });
        return res.status(200).json({
            "success": true, 
            "message":"menuitem updated successfully"
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


async function handleDeleteMenuItem(req, res) {
    try{
        const menuItemId = req.params.menuItemId;
        const menuitem = await MenuItem.findOne({ where: { menuItemId } });
        if (!menuitem) return res.status(404).json({ 
            "success": false, 
            "error": `menuitem not found with Id: ${menuItemId}!`
        });

        await MenuItem.destroy({ where: { menuItemId } });

        return res.status(200).json({
            "success": true, 
            "message": "menuitem deleted successfully"
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
    handleCreateMenuItem,
    handleGetMenuItem,
    handleUpdateMenuItem,
    handleDeleteMenuItem
}