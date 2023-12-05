const mongoose = require("mongoose")
const { Schema, model } = mongoose

const userSchema = new Schema({
    username: String,
    count: Number,
    log: []
})

const userModel = model("userModel", userSchema)

module.exports = { userModel }