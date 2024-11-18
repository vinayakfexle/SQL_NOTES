const { ProjectCategory } = require('../../models/models');

async function handleCreateProjectCategory(req, res){
    try{
        if (!req.body || !req.body.categoryName) return res.status(404).json({ "success": false,"error": "invalid payload data"});
        const newProjectCategory = await ProjectCategory.create(req.body);
        return res.status(200).json({"success": true, newProjectCategory});
    }
    catch(e){
        console.log("error:", e);
        res.status(500).json({"success": false, "error": e});
    }
}


async function handleUpdateProjectCategory(req, res){
    try{
        const { categoryId } = req.params;
        if (!req.body || !req.body.categoryName) return res.status(404).json({ "success": false,"error": "invalid payload data"});

        const projectCategory = await ProjectCategory.findOne({ where: { categoryId } });
        if (!projectCategory) return res.status(404).json({ "success": false, "error": "project category not found!"});

        await ProjectCategory.update(req.body, { where: { categoryId } });
        return res.status(200).json({"success": true, "message": "projectcategory updated successfully"});
    }
    catch(e){
        console.log("error:", e);
        res.status(500).json({"success": false, "error": e});
    }
}


async function handleGetProjectCategory(req, res){
    try{
        const { categoryId } = req.params;
        const projectCategory = await ProjectCategory.findOne({ where: { categoryId } });
        if (!projectCategory) return res.status(404).json({ "success": false, "error": "project category not found!"});
        return res.status(200).json({"success": true, projectCategory});
    }
    catch(e){
        console.log("error:", e);
        res.status(500).json({"success": false, "error": e});
    }
}

async function handleDeleteProjectCategory(req, res){
    try{
        const { categoryId } = req.params;
        await ProjectCategory.destroy({ where: { categoryId } });
        return res.status(200).json({"success": true, "message": "project category deleted successfully"});
    }
    catch(e){
        console.log("error:", e);
        res.status(500).json({"success": false, "error": e});
    }
}


module.exports = {
    handleCreateProjectCategory,
    handleUpdateProjectCategory,
    handleGetProjectCategory,
    handleDeleteProjectCategory
}