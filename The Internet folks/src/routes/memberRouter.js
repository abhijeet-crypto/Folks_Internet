const router = require('express').Router();
const member = require('../controllers/member');


router.post('/' , member.update_members);
router.delete('/:id' , member.delete_member);

module.exports = router;