const { User } = require("../models");
const formidable = require("formidable");
const path = require("path");

const index = async (req, res) => {
  const users = await User.findAll();
  res.render("users", { users });
};

const store = async (req, res) => {
  const form = formidable({
    multiples: false,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, field, files) => {
    const filename = path.basename(files.avatar.path);

    await User.create({
      firstname: field.firstname,
      lastname: field.lastname,
      avatar: filename,
    });
    res.redirect("/usuarios");
  });
};

const create = (req, res) => {
  res.render("createusers");
};

module.exports = { index, store, create };
