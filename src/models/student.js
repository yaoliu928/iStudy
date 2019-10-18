const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required:true,
        // minlength:10
    },
    lastName: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true,
        validate: {
            validator:email => !Joi.validate(email, Joi.string().email()).error,
            msg:'Invalid email format'
        }
    },
    courses: [
        {type: String, ref:'Course'}
    ]
});

const Model = mongoose.model('Student',schema);

module.exports = Model;