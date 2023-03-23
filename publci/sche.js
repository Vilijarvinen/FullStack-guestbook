const mongoose = require('mongoose')
const Schema = mongoose.Schema

const myschema = new Schema({
    id: {
        type: String,
        required: [true, 'Id is required'],
        trim: true,
        unique: true,
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
    },
    country: {
        type: String,
        required: [true, 'Country is required'],
        trim: true,
    },
    date: {
        type: Date,
        required: [true, 'Date is required'],
        trim: true,
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true,
    },
})

const schemas = mongoose.model('Messages', myschema)

module.exports = schemas