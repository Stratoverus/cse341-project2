const router = require('express').Router();

router.use('/', require('./swagger'))
router.use('/tasklist', require('./tasklist'));
router.get('/', (req, res) => { res.send('Yes, this API is working.');});




module.exports = router;