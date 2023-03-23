const mongoose = require('mongoose')
const Schema = mongoose.Schema

const myschema2 = new Schema({
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

const schemas2 = mongoose.model('AjMessages', myschema2)

module.exports = schemas2