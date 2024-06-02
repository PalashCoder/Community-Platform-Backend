const express = require("express");
const memberController = require("../controllers/memberController");
const auth = require("../middleware/auth");

const router = new express.Router();

router.post("/", auth, memberController.addMember);
router.delete("/:id", auth, memberController.removeMember);

module.exports = router;
