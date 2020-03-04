const router = require('express').Router();
const User = require('./user-model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secrets = require('../data/secrets.js');
const auth = require('../data/auth-middleware.js');
const userAuth = require('../data/creator-middleware.js');

function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
    name: user.name,
    user_type: user.user_type
  };

  const options = {
    expiresIn: '2h'
  };

  const token = jwt.sign(payload, secrets.jwtSecret, options);
  //console.log(token);
  return token;
}

router.get('/', auth, (req, res) => {
  User.find()
    .then(users => {
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(400).json({ message: 'No users exist' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Error getting users from database' });
    });
}); //getting users from database that requires token

router.post('/register', (req, res) => {
  const newUser = req.body;

  if (newUser.username && newUser.password && newUser.user_type) {
    const hash = bcrypt.hashSync(newUser.password, 12);
    newUser.password = hash;

    User.addUser(newUser)
      .then(addedUser => {
        const aToken = generateToken(newUser);
        res.status(201).json({
          message: 'User added',
          username: addedUser.username,
          name: addedUser.name,
          userid: addedUser.id,
          user_type: addedUser.user_type,
          token: aToken
        });
      })
      .catch(err => {
        res.status(500).json({ message: 'user could not be added' });
      });
  } else {
    res.status(400).json({ message: 'please enter all required credentials' });
  }
}); //register user and return info and token

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    User.findUserName({ username })
      .first()
      .then(foundUser => {
        if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
          let aToken = generateToken(foundUser);
          res.status(200).json({
            message: `Welcome ${foundUser.name}`,
            name: foundUser.name,
            username: foundUser.username,
            user_type: foundUser.user_type,
            userid: foundUser.id,
            token: aToken
          });
        } else {
          res.status(400).json({ message: 'invalid user credentials' });
        }
      })
      .catch(err => {
        res.status(500).json({
          errorMessage: err,
          message: 'error getting response from database'
        });
      });
  }
}); //logging in a user and returning some user info along with the token for auth

//find a specific user

router.get('/singleuser/:id', auth, (req, res) => {
  const userId = req.params.id;
  // console.log(userId, 'before find');
  User.findById(userId)
    .then(found => {
      //console.log(found, 'then function');
      if (found) {
        res.status(200).json({
          message: `success`,
          name: found.name,
          username: found.username,
          user_type: found.user_type
        });
      } else {
        res
          .status(401)
          .json({ message: `user with id of ${userId} does not exist` });
      }
    })
    .catch(err => {
      //console.log('in catch ');
      res
        .status(500)
        .json({ errorMessage: 'error getting user from database', error: err });
    });
});

//edit user -- what information may they need back?
router.put('/edituser/:id', auth, (req, res) => {
  const userId = req.params.id;
  const userInfo = req.body;

  User.findById(userId)
    .then(userExist => {
      if (userExist) {
        const userType = userExist.user_type;
        userInfo.user_type = userType;
        User.editUser(userInfo, userId)
          .then(edited => {
            res.status(201).json({
              message: `successfully updated information`
            });
          })
          .catch(err => {
            res.status(500).json({ errorMessage: 'error editing user' });
          });
      } else {
        res.status(401).json({ message: 'user does not exist' });
      }
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: 'error getting users from database',
        error: err
      });
    });
});

router.delete('/deleteuser/:id', auth, (req, res) => {
  const userId = req.params.id;

  User.findById(userId)
    .then(exists => {
      if (exists) {
        User.deleteUser(userId)
          .then(deleted => {
            res.status(200).json({ message: 'user successfully deleted' });
          })
          .catch(err => {
            res
              .status(500)
              .json({ errorMessage: 'error deleting user from database' });
          });
      } else {
        res.status(400).json({ message: 'user does not exist' });
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'error fetching from database' });
    });
});

module.exports = router;
