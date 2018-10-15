const express = require('express');
const mongoose = require('mongoose');
const app = express();

const router = express.Router();
const User = require('../models/user');

router.route('/users')
  .get((req, res) => {
    User.find((err, users) => {
      if (err)
        user.forEach()
        console.log(users)
      res.json(users);
    });
  })
  // .post((req, res) => {
  //   const { body } = req
  //   console.log("******** got to post *******")
  //   const user = new User();
  //   console.log(body)
  //   for (const key in body) {
  //     if (body.hasOwnProperty(key)) {
  //       user[key] = body[key];
  //     }
  //   }
  //   console.log("before save")
  //   user.save((err, user) => {
  //     console.log("inside save")
  //     if (err)
  //       res.send(err);
  //     res.json({
  //       message: "User Saved",
  //       user
  //     });
  //   });
  // });

router.route('/user/find/:userid')
  .get((req, res) => {
    User.findById(req.params.userid, (err, user) => {
      if (err)
        res.send(err);
      res.json(user);
    });
  });

router.route('/user/update/:userid')
  .put((req, res) => {
    User.findById(req.params.userid, (err, user) => {
      if (err)
        res.send(err);
      user.firstName = req.body.firstName ? req.body.firstName : user.firstName;
      user.lastName = req.body.lastName ? req.body.lastName : user.lastName;
      user.email = req.body.email ? req.body.email : user.email;
      user.birthDate = req.body.birthDate ? req.body.birthDate : user.birthDate;
      user.age = req.body.age ? req.body.age : user.age;
      user.sign = req.body.sign ? req.body.sign : user.sign;
      user.gender = req.body.gender ? req.body.gender : user.gender;
      user.interests = req.body.interests ? req.body.interests : user.interests;
      user.bio = req.body.bio ? req.body.bio : user.bio;

      user.save((err) => {
        if (err)
          res.send(err);
        res.json({
          message: "User updated"
        });
      });
    });
  });
  
router.route('/user/delete/:userid')
  .delete((req, res) => {
    User.remove({
      _id: req.params.userid
    }, (err, user) => {
      if (err)
        res.send(err);

      res.json({
        message: 'User deleted'
      });
    });
  });

module.exports = router;
