const Role = require("../models/role");

exports.createrole = async (req, res) => {
  try {
    const { name } = req.body;

    // Validate the role name
    if (!["Community Admin", "Community Member"].includes(name)) {
      return res.status(400).send({ error: "Invalid role name" });
    }

    // Check if the role already exists
    const existingRole = await Role.findOne({ where: { name } });
    if (existingRole) {
      return res.status400.send({ error: "Role already exists" });
    }

    // Create the new role
    const role = await Role.create({ name });
    res.status(201).send({ status: true, content: { data: role } });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).send({ status: true, content: { data: roles } });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
