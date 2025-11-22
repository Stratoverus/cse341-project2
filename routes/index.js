const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'))
router.use('/tasklist', require('./tasklist'));
router.use('/users', require('./users'))
// router.get('/', (req, res) => {
//     //#swagger.tags=["Landing Page"] 
//     res.send('Yes, this API is working.');
// });

router.get('/login', passport.authenticate('github'), (req, res) => {})

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;