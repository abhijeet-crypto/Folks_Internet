const router = require('express').Router();
const community = require('../controllers/community');


router.get('/' , community.get_community_data);
router.post('/' , community.update_community_data);
router.get('/:id/members' , community.members_of_community);
router.get('/me/owner',community.community_owner);
router.get('/me/member',community.community_member);

module.exports = router;