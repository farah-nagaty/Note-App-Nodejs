const express = require("express");
const router = express.Router();

const { postNoteController } = require("../controllers/noteController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

router.post("/note", authMiddleware, postNoteController);

module.exports = router;