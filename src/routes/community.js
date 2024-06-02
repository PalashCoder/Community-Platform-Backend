const express = require("express");
const communityController = require("../controllers/communityController");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/", auth, communityController.createCommunity);
router.get("/", auth, communityController.getAllCommunities);
router.get("/:id/members", auth, communityController.getCommunityMembers);

module.exports = router;
