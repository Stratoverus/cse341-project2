const router = require('express').Router();

router.use('/', require('./swagger'))
router.use('/tasklist', require('./tasklist'));
router.use('/users', require('./users'))
router.get('/', (req, res) => {
    //#swagger.tags=["Landing Page"] 
    res.send('Yes, this API is working.');
});




module.exports = router;