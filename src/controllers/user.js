const express = require('express'); 
const z = require("zod");
const Admin = require("../models/admin.model");
const JWT_SECRET = require("../config");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6)
});
const studentLoginz = z.object({ 
  email: z.string().email(),
  password: z.string()
});

const adminLoginz =  z.object({ 
  email: z.string().email(),
  password: z.string()
});


const studentLogin = async (req, res) => {
  try { 
    res.status(200).json({ message: "User registered successfully" }); 
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// admin register 
const adminRegister = async (req, res) => {
  try {
    const userData = registerSchema.safeParse(req.body); 

    const existingUser = await Admin.findOne({ email: userData.data.email });

    if (existingUser) {
      throw new Error("This email is already taken");
    }

    const { name, email, password } = userData.data;  
    const createUser = await Admin.create({
      name,
      password,
      email
    });

    const token = jwt.sign({
      userId: createUser._id
    }, process.env.JWT_KEY);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to register" });
  }
}; 
// admin login 
const adminLogin =  async (req, res) => {
 try {
  const adminLog = adminLoginz.safeParse(req.body);

  const adminUser = await User.findOne({ email: userData.email }); 
  const passwordMatch = await bcrypt.compare({password: userData.password});

  if (!adminUser) {
  return res.status(401).json({ error: 'Authentication failed' });
  }
  if (!passwordMatch) {
  return res.status(401).json({ error: 'Authentication failed' });
  }

  const token = jwt.sign({ userId: User._id }, 'your-secret-key', {
     
  });


 } catch (error) {
  console.error(error);
  res.status(400).json({ message: "Failed to login" });
 }
};

module.exports = {
  adminLogin,studentLogin,adminRegister
};