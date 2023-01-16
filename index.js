const express = require("express");

require("dotenv").config();

const { connect } = require("./config/db")

const { userController } = require("./router/users.route");
const { postController } = require("./router/post.route");
const { authentication } = require("./middleware/authentication")



const app = express();

app.use(express.json());

const PORT = process.env.port || 8080;



app.get("/", (req, res) => {
    res.send("welcome");
});

app.use("/users", userController);
app.use(authentication)
app.use("/posts", postController);





app.listen(PORT, async () => {
    try {
        await connect
        console.log("connecting to db successfully");
    }
    catch (err) {
        console.log("error connecting to db");
        console.log(err);
    }
    console.log(`The port is listing in ${PORT}`);
});