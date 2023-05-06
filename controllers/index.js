// Require Express and apiRoutes
const router = require("express").Router();

const apiRoutes = require("./api");

router.use("/api", apiRoutes);

// Export module
module.exports = router;