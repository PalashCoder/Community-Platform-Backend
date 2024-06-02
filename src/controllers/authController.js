const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const validator = require("validator");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password || !validator.isEmail(email)) {
      return res.status(400).send({ error: "Invalid input" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).send({ status: true, content: { data: { user, token } } });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).send({ status: true, content: { data: { user, token } } });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getMe = async (req, res) => {
  res.send({ status: true, content: { data: req.user } });
};
