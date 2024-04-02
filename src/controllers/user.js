const z = require("zod");
const Admin = require("../models/admin.model");  
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

const adminLoginz = z.object({
  email: z.string().email(),
  password: z.string(),
}); 
 
// admin register  
const adminRegister = async (req, res) => {
  try {
    const userData = registerSchema.safeParse(req.body);

    const existingUser = await Admin.findOne({ email: userData.data.email });

    if (existingUser) {
      throw new Error("This email is already taken");
    }

    const salt = await bcrypt.genSalt(10);  
    const hashedPassword = await bcrypt.hash(userData.data.password, salt); 

    const { name, email } = userData.data;
    const createUser = await Admin.create({
      name,
      password: hashedPassword,  
      email,
    });

    await createUser.save();

    res.status(200).json({ message: "Successfully registered" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to register" });
  }
}; 

// admin login
const adminLogin = async (req, res) => {
  try {
    const adminLog = adminLoginz.safeParse(req.body);

    const { email, password } = adminLog.data;

    const adminUser = await Admin.findOne({ email });

    if (!adminUser) {
      return res.status(401).json({ error: "admin Authentication failed" });
    }  
    
    const passwordMatch = await bcrypt.compare(password, adminUser.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: "passwordMatch Authentication failed" });
    } 

    const token = jwt.sign(
      {
        userId: adminUser._id,
      },
      process.env.JWT_KEY
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to login" });
  }
};

module.exports = {
  adminLogin, 
  adminRegister,
};