const z = require("zod");
const studentSchema = require("../models/student.model");

const studentRegister = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.number().min(10),
  designation: z.string(),
  bankname: z.string(),
  UPItransactionid: z.number().min(12),
  role: z.string()
});

function generatePassword() {
  const letters = [1, 2, 3, 2, 4, "s", "e", "f", "s", "r", "g"];
  let password = '';
 
  const passwordLength = 6;
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    password += letters[randomIndex];
  }
  return password; // Return the generated password
}

const registerStudent = async (req, res) => {
  try {
    const studentData = studentRegister.parse(req.body);

    // Check if student with the same email exists
    const existingStudentByEmail = await studentSchema.findOne({
      email: studentData.email,
    });
    if (existingStudentByEmail) {
      throw new Error("Email is already registered");
    }

    // Check if student with the same phone number exists
    const existingStudentByPhone = await studentSchema.findOne({
      phone: studentData.phone,
    });
    if (existingStudentByPhone) {
      throw new Error("Phone number is already registered");
    }

    // Check if student with the same UPItransactionid exists
    const existingStudentByUPI = await studentSchema.findOne({
      UPItransactionid: studentData.UPItransactionid,
    });
    if (existingStudentByUPI) {
      throw new Error("UPItransactionid is already registered");
    }

    // Generate password
    const generatedPassword = generatePassword();

    // Create new student document with password
    const createdStudent = await studentSchema.create({
      ...studentData,
      password: generatedPassword
    });

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
}; 

module.exports = {
  registerStudent, 
};
