const express = require('express'); 
const z = require("zod");
const Student= require("../models/student.model");

const studentRegister = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.number().min(10),
    designation: z.string(),
    bankname: z.string(),
    UPItransactionid: z.number().min(12),
  })

  const studentLogin =  async (req, res) => {
    try {
      const studentData = studentRegister.parse(req.body);
  
      const existingStudent = await Student.findOne({ email: studentData.email });
      if (existingStudent) {
        throw new Error("This email is already taken");
      }
  
      const { name, email, phone, designation, bankname, UPItransactionid } = studentData;
  
      const createStudent = await Student.create({
        name,
        email,
        phone,
        designation,
        bankname,
        UPItransactionid,
      });
  
      await createStudent.save();
      res.status(200).json({ message: "User registered successfully" });
  
    } catch (error) {
      console.error(error);
      res.status(404).json({ message: "Failed to register" });
    }
  };

  
  
  module.exports = {
    studentLogin
  };