function authRedirect(req, res, next) {
    // console.log("session",req.session)
    // console.log("user",req.user)
    if (req.session && req.session.user) {
        return res.redirect("/dashboard");
    }

    return next();
}

function authorise(req, res, next) {
    if (req.session.user) {
        return next();
    }

    return res.redirect("/user/register");
}

module.exports = {
    authRedirect,
    authorise
}