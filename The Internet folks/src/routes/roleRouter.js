const router = require('express').Router();
const role = require('../controllers/role');


router.post('/' , role.update_role);
router.get('/' , role.get_role);

module.exports = router;