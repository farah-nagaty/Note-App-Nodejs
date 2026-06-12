const Note = require("../models/Note.js");
const User = require("../models/User.js");

const { noteSchema } = require("./validation/noteValidation.js");

const postNoteController = async (req, res) => {
    try {
        //Joi => Get Data From Frontend & Validation
        const { error, value } = noteSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            return res.status(400).json({
                msg: error.details.map((err) => err.message)
            });
            //Value = req.body
            const content = value.content;
            //Get Id from Token
            const userId = req.user;
            //Create New Note to Insert DB
            const newNote = await Note.create({
                content,
                user: userId
            })
            //Response
            res.status(201).json({ msg: "Done Created New Note" });
        }
    }
    catch (error) {
        res.status(500).json({ msg: "Server Error" });
        }
    };

    module.exports = { postNoteController };