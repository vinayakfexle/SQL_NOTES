const { Utils, where } = require('sequelize');
const { User, Role } = require('../../models/models');


async function handleCreateRole(req, res){
    try{
        const { roleName } = req.body;
        if(!roleName) return res.status(404).json({
            "error": "bad request, Please provide valid data..!"
        });

        newRole = await new Role({"roleName": roleName});
        await newRole.save();

        return res.status(200).json({"success": true, "message": "role created successfully"}); 
    }
    catch(error){
        console.log(error);
        return res.status(500).json({"errer": error}); 
    }
}


async function handleDeleteRole(req, res){
    try{
        const roleId = req.params.roleId;
        if(!roleId) return res.status(404).json({"error": "bad request, Please provide roleId."});

        const result = await Role.destroy({ where: { roleId } });
        console.log(result);
        return res.status(200).json({"success": true, "message": "role deleted successfully"});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({"errer": error});
    }
}


module.exports = {
    handleCreateRole, 
    handleDeleteRole
} 


