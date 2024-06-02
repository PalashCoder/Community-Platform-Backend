const express = require("express");
const auth = require("../middleware/auth");
const roleController = require("../controllers/roleController");

const router = new express.Router();

router.post("/", auth, roleController.createrole);
router.get("/", auth, roleController.getAllRoles);

module.exports = router;
