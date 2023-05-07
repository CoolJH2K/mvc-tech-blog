// Require Express and User class
const router = require("express").Router();
const {User} = require("../../models");

// CREATE new account
router.post("/", async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Determines if a user is logged in
router.post("login", async (req, res) => {
    try {
        const userData = await User.findOne(
            {
                where: {
                    email: req.body.email
                }
            }
        );

        // If a valid username or password is not entered
        if (!userData) {
            res.status(400).json({message: "Incorrect email or password, please try again"});
            return;
        }

        // Checks if a user's password is valid
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
        res.status(400).json({message: "Incorrect email or password, please try again"});
        return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            
            res.json(
                {
                    user: userData,
                    message: "You are now logged in!"
                }
            );
        })
    } catch (err) {
        res.status(400).json(err);
    }
});

// Function to log a user out
router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// Export router
module.exports = router;