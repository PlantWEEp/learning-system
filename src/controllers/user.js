const express = require('express'); 
const z = require("zod");
const User = require("../models/admin.model");

const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

// const registerUser = async (req, res) => {
//   try {
//     console.log("hello get route");
//     res.send("GET request to the user route");
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Internal Server Error");
//   }
// };

const adminLogin =  async (req, res) => {
  try {
    const userData = registerSchema.parse(req.body);

    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("This email is already taken");
    }

    const { name, email, password } = userData;

    const createUser = await User.create({
      name,
      password,
      email
    });

    await createUser.save();
    res.status(200).json({ message: "User registered successfully" });

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to register" });
  }
};

module.exports = {
  adminLogin
};