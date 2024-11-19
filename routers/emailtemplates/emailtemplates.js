const Router = require('express');
const EmailTemplateController = require('../../controllers/emailtemplates/emailtemplates.js');

const router = Router();

router.route('/create').post(EmailTemplateController.handleCreateEmailTemplate);
router.route('/get/:templateId').get(EmailTemplateController.handleGetEmailTemplate);
router.route('/update/:templateId').patch(EmailTemplateController.handleUpdateEmailTemplate);
router.route('/delete/:templateId').delete(EmailTemplateController.handleDeleteEmailTemplate);

module.exports = router;
