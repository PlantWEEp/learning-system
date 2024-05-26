const z = require("zod");
const Admin = require("../models/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6) 
});

const adminLoginz = z.object({
  email: z.string().email(),
  password: z.string(),
  role: z.string(),
});

const passwordUpdate = z.object({
  email: z.string().email(),
  password: z.string().min(6),
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
    res.status(400).json({ message: "Failed to register" });
  }
};

// admin login
const adminLogin = async (req, res) => {
  try {
    const adminLog = req.body;  
 

    const { email, password } = adminLog;
 

    const adminUser = await Admin.findOne({ email });
 

    if (!adminUser) {
      return res.status(401).json({ error: "Invalid email" });
    }

    const passwordMatch = await bcrypt.compare(password, adminUser.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const token = jwt.sign(
      {
        userId: adminUser._id,
        userEmail: adminUser.email,
        userRole: adminUser.role,
      },
      process.env.JWT_KEY
    ); 
    const roleToken = jwt.verify(token, process.env.JWT_KEY);
 
    res.status(200).json({ token });
  } catch (error) { 
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//logout
const adminLogout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) { 
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//admin detailes
const adminProfile = async (req, res) => {
  try {
    const adminId = req.user.userId; 
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.json(admin);
  } catch (error) { 
    res.status(500).json({ error: "Internal server error" });
  }
};

//update password
const updatePassword = async (req, res) => {
  try {
    const updatePasswordData = passwordUpdate.safeParse(req.body);
    const id = req.params.id;

    if (updatePasswordData) {
      const { password, email } = updatePasswordData.data;

      const verifyEmail = await Admin.findOne({ email });

      if (!verifyEmail) {
        res.status(400).json({
          message: "Invalid Email id",
          errors: updatePasswordData.error,
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      // Update the user's password in the database
      await Admin.findByIdAndUpdate(id, { password: hashedPassword });

      res.status(200).json({ message: "Password updated successfully" });
    } else {
      res.status(400).json({
        message: "Invalid data for password update",
        errors: updatePasswordData.error,
      });
    }
  } catch (error) { 
    res
      .status(500)
      .json({ message: "Internal Server Error updating password" });
  }
};

module.exports = {
  adminLogin,
  adminRegister,
  adminLogout,
  updatePassword,
  adminProfile,
};
