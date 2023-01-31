require('dotenv').config();
const { User } = require("./models")
const bcrypt = require('bcrypt');
const { application } = require('express');

const run = async () => {
  const admin = await User.findOne({ where: {
    username: "admin"
  }});

  if(!admin) {
    const password =  await bcrypt.hash("admin", 10);
    await User.create({
      username: "admin",
      password
    });

    console.log("Created admin user");
    return;
  }

  console.log("Admin user already exists in BDD");
  process.exit();
}

run();