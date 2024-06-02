const Community = require("../models/community");
const Member = require("../models/member");
const Role = require("../models/role");
const User = require("../models/user");
const validator = require("validator");

exports.createCommunity = async (req, res) => {
  try {
    const { name, slug } = req.body;

    // Validate input
    if (!name || !slug) {
      return res.status(400).send({ error: "Invalid input" });
    }
    if (!validator.isSlug(slug)) {
      return res.status(400).send({ error: "Invalid slug format" });
    }

    // Check if slug is already in use
    const existingCommunity = await Community.findOne({ where: { slug } });
    if (existingCommunity) {
      return res.status(400).send({ error: "Slug already in use" });
    }

    // Create community
    const community = await Community.create({
      name,
      slug,
      owner: req.user.id,
    });

    // Find the Community Admin role,,, if the role created before then it will work
    const adminRole = await Role.findOne({
      where: { name: "Community Admin" },
      logging: console.log,
      validate: {
        isIn: [["Community Admin"]],
      },
    });
    console.log(adminRole);
    if (!adminRole) {
      return res.status(500).send({ error: "Community Admin role not found" });
    }

    //Creating a myself a member
    await Member.create({
      community: community.id,
      user: req.user.id,
      role: adminRole.id,
    });
    res.status(201).send({ status: true, content: { data: community } });
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      return res
        .status(400)
        .send({ error: "Validation error", details: error.errors });
    }
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

exports.getCommunityIOwned = async (req, res) => {
  try {
    const communities = await Community.findAll({
      where: { owner: req.user.id },
    });
    res.status(200).send({ status: true, content: { data: communities } });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getCommunityIMember = async (req, res) => {
  try {
    const members = await Member.findAll({
      where: { user: req.user.id },
      include: [
        {
          model: Community,
          attributes: ["id", "name", "slug", "owner"],
        },
        {
          model: Role,
          attributes: ["name"],
        },
      ],
    });
    const communities = members.map((member) => ({
      community: member.community,
      role: member.role.name,
    }));
    res.status(200).send({ status: true, content: { data: communities } });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
