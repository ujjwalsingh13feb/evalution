const { Router } = require("express");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

require("dotenv").config();

const { UserModel } = require(".././model/users.model");

const userController = Router();

// FOR SIGNUP CODE

userController.post('/register', async (req, res) => {
    const { name, email, password, gender } = req.body;
    if (password) {

        bcrypt.hash(password, 5, async function (err, hash) {
            if (err) {
                res.send("Something went wrong  Please try again!!");
            }
            const user = new UserModel({
                name,
                email,
                password: hash,
                gender
            })
            try {
                await user.save();
                res.send({ "msg": "Signup Successfully" });
            }
            catch (err) {
                console.log(err);
                console.log({ "msg": "Try again after sometime" });
            }
        })
    } else {
        res.send("please enter the password")
    }
})

// Login


userController.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
        return res.send("no user found with this email")
    }
    const hashed_password = user.password;

    bcrypt.compare(password, hashed_password, function (err, result) {
        if (err) {
            res.send("Something went wrong Please try again")
        }
        if (result) {
            const token = jwt.sign({
                userId: user._id
            }, process.env.key);
            res.send({ "msg": "Login successful", token: token });
        }
        else {
            res.send({ "msg": "Invalid credentials please login again" })
        }
    })
})


module.exports = { userController };