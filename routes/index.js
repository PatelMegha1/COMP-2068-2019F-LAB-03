var express = require('express');
var router = express.Router();
const User = require('../model/user');
const passport = require('passport');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Megha Patel' });
});
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Hello World' });
});
router.get('/project', function(req, res, next) {
  res.render('project', { title: 'Hello World' });
});
router.get('/service', function(req, res, next) {
  res.render('service', { title: 'Hello World' });
});
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Hello World' });
});


router.get('/login', function(req, res, next) {
  res.render('Auth/login', { error: req.flash('error')});
});

router.post('/login',
passport.authenticate('local', { successRedirect: '/',
                                 failureRedirect: '/registration',
                                 failureFlash: true })
);
 



router.get('/registration', function(req, res, next) {
  res.render('Auth/registration', { });
});

router.post('/registration', (req, res, next) => {
  User.register(
    new User ({ username: req.body.username}),
    req.body.password, // Password for hasing
    function(err, account) {
      if (err) {
        // If there's an error, render the register page

        console.log(err);
        return res.render('Auth/registration', { account: account });
      }

      // Login if successful
      passport.authenticate('local')(req, res, function() {
        res.redirect('/login');
      });
    }
    );
  });
  
  module.exports = router;
