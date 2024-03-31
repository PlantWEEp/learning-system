
const z = require("zod");
const Admin = require("../models/admin.model");   
const Student = require("../models/student.model")
const studentSchema = require("../models/studentRegisterSchema.model") 
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken"); 

const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6)
}); 

const adminLoginz =  z.object({ 
  email: z.string().email(),
  password: z.string()
});

//studentRegistration
  const studentRegistration = async (req, res) => {
    try { 
        const { email } = req.body; 
        
        console.log("email :",email);

        const foundStudent = await studentSchema.findOne({ email });

        console.log("foundStudent :",foundStudent);

        if (!foundStudent) {
            return res.status(400).json({ error: 'Email does not exist' });
        } 

        res.status(200).json({ message: "User registered successfully" }); 
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
  };
``
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
    
    await createUser.save()

    res.status(200).json( { message: "sucessfully register"  } );
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
      return res.status(401).json({ error: 'admin Authentication failed' });
    }

    console.log( "adminUser" , adminUser);
    
    const passwordMatch = await bcrypt.compare(password, adminUser.password); 

    if (!passwordMatch) {
      return res.status(401).json({ error: 'passwordMatch Authentication failed' });
    }
    console.log( "passwordMatch" , passwordMatch);

    const token = jwt.sign({
      userId: adminUser._id
    }, process.env.JWT_KEY);

    res.status(200).json({ token });

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to login" });
  }
};

module.exports = {
  adminLogin,studentRegistration,adminRegister
};