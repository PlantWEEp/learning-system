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

const registerStudent = async (req, res) => {
  try {
    const studentData = studentRegister.parse(req.body);
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

const updateStudentRegister = async(req,res)=>{
  const id = req.params.id;
  const newData = req.body;
  try { 
    const updatedquestion = await studentSchema.findByIdAndUpdate(
        id,
        newData,
        { new: true }
    );
    if (!updatedquestion) {
        res.status(404).json({ message: "No document found to update" });
    } else {
        res.json({ message: "Document updated successfully" });
    }
} catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ message: "Internal server error" });
}
}

const deleteStudentRegister = async(req,res)=>{
  const id = req.params.id;
  const newData = req.body;
  try { 
    const updatedquestion = await studentSchema.findByIdAndDelete(
        id,
        newData,
        { new: true }
    );
    if (!updatedquestion) {
        res.status(404).json({ message: "No document found to delete" });
    } else {
        res.json({ message: "Document deleted successfully" });
    }
} catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ message: "Internal server error" });
}
}

module.exports = {
  registerStudent, 
  updateStudentRegister,
  deleteStudentRegister
};
