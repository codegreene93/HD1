const express = require('express')
const User = require('../models/userModel')
// import User from '../models/userModel';
// import { getToken, isAuth } from '../util';
const {
  getToken,
  isAuth
} = require('../util')


const router = express.Router();

router.post("/signin", async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password
  });
  if (signinUser) {
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser)

    });
  } else {
    res.status(401).send({
      msg: 'Invalid Email or Password.'
    });
  }
})


router.post('/:id', isAuth, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      const updatedUser = await user.save();
    return res.send({
        _id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: getToken(updatedUser)
      });
    } else {
      return res.status(404).json({
        message: 'User Not Found'
      });

    }
  } catch (err) {
    res.status(401).json({
      msg: 'Invalid'
    })
  }
});

router.post('/register', async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    const newUser = await user.save();
    if (newUser) {
      res.send({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: getToken(newUser)
      })
    }
  } catch (err) {
    res.status(401).send({
      msg: 'Invalid User Data.'
    });
  }
})

router.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: 'Amy',
      email: 'amy.greene029@gmail.com',
      password: 'password',
      isAdmin: true
    });

    const newUser = await user.save();
    res.send(user);
  } catch {
    res.send({
      msg: error.message
    });
  }

})
module.exports = router;
