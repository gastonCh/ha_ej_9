const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const { User } = require("../models");
const formidable = require("formidable");
const path = require("path");

const index = async (req, res) => {
  const users = await User.findAll();
  res.render("users", { users });
};

const storeSupabase = async (req, res) =>{

  const sbClient = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY,
  );

  const form = formidable({
    multiples: false,
    keepExtensions: true,
  });

  form.parse(req, async (err, field, files) => {
    
    const filename = path.basename(files.avatar.path);
    
    const ext = path.extname(files.avatar.path);

    const newFileName = `img_${Date.now()}${ext}`;

    const { data, error } = await sbClient.storage.from('avatars').upload(`public/${newFileName}`, fs.createReadStream(files.avatar.path), {
      cacheControl:'3600',
      upsert:false,
      contentType:files.avatar.type
    });

    await User.create({
      firstname: field.firstname,
      lastname: field.lastname,
      avatar: newFileName,
    });
    res.redirect("/usuarios");
  });
}

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

module.exports = { index, store, storeSupabase, create };
