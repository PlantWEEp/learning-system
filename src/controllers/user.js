const z = require("zod");
const User = require("../models/admin.model");

const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

const registerUser = async (req, res) => {
  try { 
    const userData = registerSchema.parse(req.body);

    if (!userData) {
        throw new Error("User data is empty");
    } 
    const existingUser = await User.findOne({ email: userData.email });
    if(existingUser){
        throw new Error("This email is already taken");
    }

    const createUser = await User.create({
      name,
      password,
      email
    }) 
    await createUser.save()
    res.status(200).json({ message: "User registered successfully" });

  } catch (error) {
    console.error(error);  
    res.status(400).json({ message: "Failed to register" });  
  }
};

module.exports = { registerUser };
