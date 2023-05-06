// Create withAuth function
const withAuth = (req, res, next) => {
    // If user is not logged in
    if (!req.session.loggedIn) {
        res.redirect("/login");
    // If user is logged in
    } else {
        next();
    }
};

// Export module
module.exports = withAuth;