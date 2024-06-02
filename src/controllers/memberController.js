const Member = require("../models/member");
const Community = require("../models/community");
const Role = require("../models/role");

exports.addMember = async (req, res) => {
  try {
    const { community, user, role } = req.body;
    const communityInstance = await Community.findOne({
      where: { id: community, owner: req.user.id },
    });
    if (!communityInstance) {
      return res.status(403).send({ error: "NOT_ALLOWED_ACCESS" });
    }
    const newMember = await Member.create({ community, user, role });
    res.status(201).send({ status: true, content: { data: newMember } });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.removeMember = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findOne({ where: { id } });
    const community = await Community.findOne({
      where: { id: member.community, owner: req.user.id },
    });
    if (!community) {
      return res.status(403).send({ error: "NOT_ALLOWED_ACCESS" });
    }
    await Member.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
