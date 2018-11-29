const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// router.post('/', async (req, res) => {
//   console.log(req.body, ' this is session')

//   try {

//     const user = await User.create(req.body);

//     req.session.logged = true;
//     req.session.username = req.body.username;


//     res.json({
//       status: 200,
//       data: 'login successful'
//     });



//   } catch(err){
//     console.log(err);
//     res.send(err);
//   }
// });



// ROUTE LEADING FROM HOME PAGE TO REGISTER PAGE
// router.get("/register", (req, res) => {
//   res.render("register.ejs")
// })

// REGISTER ROUTE
router.post('/register', (req, res, next) => {
  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(12));
  const userDbEntry = {};
  userDbEntry.username = req.body.username;
  userDbEntry.password = passwordHash;
  User.create(userDbEntry, (err, user) => {
      req.session.userId = user._id;
      req.session.logged   = true;
      res.json({
        status: 200,
        data: 'register successful'
      });
  });
});


// LOGIN ROUTE
router.post('/login', async (req, res, next) => {
  console.log(req.body)
  try{
      await User.findOne({username: req.body.username}, (err, user) => {
      if(user){
          if(bcrypt.compareSync(req.body.password, user.password)){
              req.session.message  = 'Successfully logged in!';
              req.session.userId = user._id;
              req.session.logged   = true;

              req.session.user = user;

              res.json({
                status: 200,
                data: user
              });
          } else {
              req.session.message = 'Username or password are incorrect';
              res.json({
                status: 500,
                data: 'login unsuccessful'
              });
          }
      } else {
          req.session.message = 'Username or password are incorrect';
          res.json({
            status: 500,
            data: 'login unsuccessful'
          });
      }
  });
  } catch(err){
      next(err);
  }
});

// LOGOUT ROUTE
router.get('/logout', (req, res, next) => {
  if (req.session) {
    // delete session object
    req.session.destroy((err) => {
      if(err) {
        return next(err);
      } else {
        return res.json({
          status: 200,
          data: 'logout succesful'
        });
      }
    });
  }
});

module.exports = router;