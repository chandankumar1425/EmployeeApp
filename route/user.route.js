const express = require("express")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {UserModel} = require("../model/user.model")
const UserRouter = express.Router()

UserRouter.post("/signup", async (req, res) => {
    const {  name,email, password } = req.body;
    try {
      bcrypt.hash(password, 5, async (err, hashed) => {
        if (err) {
          console.log(err);
        } else {
          const user = new UserModel({ email, password: hashed, name });
          await user.save();
          res.send("Registered Sucessfully");
        }
      });
    } catch (error) {
      res.send("Error in registering user");
      console.log(error);
    }
  });
  UserRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserModel.find({ email });
  
      if (user.length > 0) {
        bcrypt.compare(password, user[0].password, (err, result) => {
          if (result) {
            const token = jwt.sign(
              {
                userID: user[0]._id,
              },
              "chandan"
            );
            res.send({ msg: "login successful", token: token });
          } else {
            res.send("wrong credentials");
          }
        });
      } else {
        res.send("wrong credentials");
      }
    } catch (error) {
      res.send("error");
      console.log(error);
    }
  });



  module.exports ={UserRouter }