const Joi = require("joi");


const noteSchema = Joi.object({
    content: Joi.string().min(6).required()
});

module.exports = {
    noteSchema
};