// Require User.js and Project.js
const User = require("./User");
const Project = require("./Project");

// Connect User to Project
User.hasMany(Project, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});

// Connect Project to User
Project.belongsTo(User, {
    foreignKey: "user_id"
});

// Export modules
module.exports = {User, Project};