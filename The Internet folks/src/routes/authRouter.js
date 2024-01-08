const router = require('express').Router();
const auth = require('../controllers/auth');


router.post('/signin' , auth.sign_in);
router.post('/signup' , auth.sign_up);
router.get('/me' , auth.me);

module.exports = router;