// Require Express, userRoutes, and projectRoutes
const router = require("express").Router();
const userRoutes = require("./userRoutes");
const projectRoutes = require("./projectRoutes");

// Set up routers
router.use("/users", userRoutes);
router.use("/projects", projectRoutes);

// Export routers
module.exports = router;