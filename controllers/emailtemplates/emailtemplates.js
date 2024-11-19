const { json } = require('body-parser');
const { EmailTemplate } = require('../../models/models');
const { where } = require('sequelize');

async function handleCreateEmailTemplate(req, res){
    try{
        const { templateName, subject, body} = req.body;
        if (!templateName || !subject || !body){
            return res.status(404).json({
                "success": false,
                "error": "invalid payload data"
            });
        }
        
        const newTemplate = await EmailTemplate.create({ templateName, subject, body });
        console.log(newTemplate);
        return res.status(200).json({
            "success": true,
            newTemplate
        });
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            "success": false,
            "error": e?.message
        })
    }
}


async function handleGetEmailTemplate(req, res){
    try{
        const templateId = req.params.templateId;
        const template = await EmailTemplate.findOne({ where: { templateId } });
        if (!template) return res.status(404).json({ "success": false, "error": "template not found!" });
        return res.status(200).json({"success": true, template}); 
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            "success": false,
            "error": e?.message
        })
    }
}


async function handleUpdateEmailTemplate(req, res){
    try{
        const templateId = req.params.templateId;
        if(Object.keys(req.body).length === 0){
            return res.status(404).json({ 
                "success": false,
                "error": "invalid payload data"
            });
        }

        await EmailTemplate.update(req.body, { where: { templateId } });
        return res.status(200).json({
            "success": true, 
            "message":"milestone updated successfully"
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

async function handleDeleteEmailTemplate(req, res){
    try{
        const templateId = req.params.templateId;
        const template = await EmailTemplate.findOne({where: { templateId }});
        if(!template){
            return res.status(404).json({
                "success": false,
                "error": `template not found with template: ${templateId}`
            });
        }
        await template.destroy;
        return res.status(200).json({
            "success": false,
            "message": `template deleted with template: ${templateId}`
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
    handleCreateEmailTemplate,
    handleGetEmailTemplate,
    handleUpdateEmailTemplate,
    handleDeleteEmailTemplate
}