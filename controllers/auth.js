const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async function (req, res) {
  const candidate = await User.findOne({email: req.body.email});

  if(candidate) {
    //User exists
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);

    if(passwordResult){
      //generation token, Password is true

      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
      }, keys.jwt, {expiresIn: 3600});

      res.status(200).json({
        token: `Bearer ${token}`
      })
    } else {
      //Password is not true
      res.status(401).json({
        message: "Password is not true, try again"
      })
    }
  } else {
    //User don't exist, error
    res.status(404).json({
      message: "User with this email didn't found"
    })
  }
};

module.exports.register = async function (req, res) {
  const candidate = await User.findOne({email : req.body.email});

  if(candidate) {
    //User exists, error
    res.status(409).json({
      message: 'This email already exists, create another'
    })
  } else {
    //Create User
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;

    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt)
    });

    try {
      await user.save();
      res.status(201).json(user)
    } catch(err) {
      errorHandler(res, err)
    }
  }
};
