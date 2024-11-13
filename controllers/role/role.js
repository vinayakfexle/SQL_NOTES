const { Utils, where } = require('sequelize');
const { User, Role } = require('../../models/models');


async function creatRole(req, res){
    try{
        const { roleName } = req.body;
        if(!roleName) return res.status(404).json({
            "error": "bad request, Please provide valid data..!"
        });

        newRole = new Role({"roleName": roleName});
        await newRole.save();
    }
    catch(error){
        console.log(error);
        res.status(500).json({"errer": error}); 
    }
}


async function deleteRole(req, res){
    try{
        const { roleName } = req.body;
        if(!roleName) return res.status(404).json({
            "error": "bad request, Please provide valid data..!"
        });

        const result = await Role.delete({ where: { roleName:roleName } });
        console.log(result);
    }
    catch(error){
        console.log(error);
        res.status(500).json({"errer": error});
    }
}


module.exports = {
    creatRole, 
    deleteRole
} 


