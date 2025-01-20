const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: { type: String, required: true, unique: true },
    userType: {
        type: String,
        required: true,
        enum: ["admin", "user"],
    },
});

module.exports = mongoose.model("User", userSchema);