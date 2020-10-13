const UserModel = require("../models/user");

function registerNew(req, res) {
    res.render("authentication/register");
}

async function registerCreate(req, res) {
    const { email, password } = req.body;
    try{
            const user = await UserModel.create({ email, password });
            req.session.user = user;
            res.redirect("/dashboard");
    }
    catch(err){
        console.log(err)
    }


}

function logout(req, res) {
    req.session.destroy(() => {
        res.redirect("/");
    });
}

function loginNew(req, res) {
    res.render("authentication/login");
}

async function loginCreate(req, res) {
    //code to go here
    // res.json(req.body);
    const { email, password, rememberMe } = req.body;
    const user = await UserModel.findOne({ email });
    // console.log(user)
    console.log(req.body)
    if (!user) {
        return res.render("authentication/login", { error: "Invalid email & password" });
    }

    const valid = await user.verifyPassword(password);
    if (!valid) {
        return res.render("authentication/login", { error: "Invalid email & password" });
    }
    if (rememberMe == "on"){
        req.session.cookie.maxAge = 600000
        //req.session.cookie.expires = 
    } else {
        req.session.cookie.maxAge = 5000
    }

    req.session.user = user;
    res.redirect("/dashboard");
}

module.exports = {
    registerNew,
    registerCreate,
    logout,
    loginNew,
    loginCreate
}