const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { User, RolePermission, UserPermission }  = require('../models/models.js');
require('dotenv').config();

const secret = process.env.PASS_SEC;

async function restrictToAuthenticatedUserOnly(req, res, next) {
    try{
        const reqMethodAndPermission = {
            "GET": "read_permission",
            "POST": "creat_permission",
            "PUT": "update_permission",
            "PATCH": "update_permission",
            "DELETE": "delete_permission"
        }

        // authentication starts here 
        const authToken = req.headers.authorization?.split(" ")[1];
        
        if (!authToken) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const payload = await jwt.verify(authToken, secret);
        if (!payload) {
            return res.status(401).json({ error: "You must be Logged In" });
        }
        
        const email = payload.email;

        console.log("email:", email);
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        console.log("user:", JSON.stringify(user));



        if (!user){
            return res.status(401).json({ error: "You must be Logged In" });
        }
        // authentication end's here 


        // authorization start's here
        console.log(user.roleId);
        const rolepermissions = await RolePermission.findOne({ 
            where: { 
                role_id: user.roleId
            } 
        });

        let permission;
        if (reqMethodAndPermission[req.method]) {
            permission = reqMethodAndPermission[req.method];
            
            if (rolepermissions[permission]){
                req['userId'] = user.roleId;
                next();
                return;
            }

            console.log('access not found on user role!');
            
            console.log('checking user permission');
            const userpermissions = await UserPermission.findOne({ 
                where: { 
                    user_id: user.userId
                } 
            });
            console.log(userpermissions[permission]);

            if (!userpermissions || !userpermissions[permission]){
                console.log('user do not have required permissions!');
                return res.status(401).json({ error: "access denied"});
            }
        } 
        else {
            console.log('Method not supported or no permission defined');
            return res.status(401).json({ error: "Method not supported"});
        }

        req['userId'] = user.roleId;
        next();
    } catch (error) {
        console.error('error in middleware/auth.js', error);
        return res.status(401).json({ error: "You must be Logged In" });
    }
}


module.exports = restrictToAuthenticatedUserOnly;
