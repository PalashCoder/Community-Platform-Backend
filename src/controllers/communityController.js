const Community = require("../models/community");
const Member = require("../models/member");
const Role = require("../models/role");
const User = require("../models/user");
const validator = require("validator");

exports.createCommunity = async (req, res) => {
  try {
    const { name, slug } = req.body;
    if (!name || !slug) {
      return res.status(400).send({ error: "Invalid input" });
    }

    const community = await Community.create({
      name,
      slug,
      owner: req.user.id,
    });

    const adminRole = await Role.findOne({
      where: { name: "Community Admin" },
    });
    await Member.create({
      community: community.id,
      user: req.user.id,
      role: adminRole.id,
    });

    res.status(201).send({ status: true, content: { data: community } });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getAllCommunities = async (req, res) => {
  try {
    const communities = await Community.findAll();
    res.status(200).send({ status: true, content: { data: communities } });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getCommunityMembers = async (req, res) => {
  try {
    const { id } = req.params;
    const members = await Member.findAll({
      where: { community: id },
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: Role, attributes: ["name"] },
      ],
    });
    res.status(200).send({ status: true, content: { data: members } });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
