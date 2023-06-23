const express = require("express");
const {Student,validate}=require('../models/studentModel')

const router = express.Router();


// const categories = [
//     { id: 1, name: "Web" },
//     { id: 2, name: "Mobile" },
//     { id: 3, name: "Photography" },
//   ];

router.get("/", async (req, res) => {
  let students = await Student.find();
  res.send(students);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);
  const student = new Student({
    // id: categories.length + 1,
    name: req.body.name,
    isEnrolled:req.body.isEnrolled,
    Phone:req.body.Phone
  });
  // categories.push(category);
  await student.save();
  res.send(student);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name ,     Phone: req.body.Phone ,
    isEnrolled: req.body.isEnrolled },

    { new: true }
  );

  // const category = categories.find(c => c.id === parseInt(req.params.id));
  if (!student)
    return res.status(404).send("the category with given id was not found");
  // category.name = req.body.name;
  res.send(student);
});

router.delete("/:id", async (req, res) => {
  const student = await Student.findByIdAndRemove(req.params.id);
  if (!student)
    return res.status(404).send("the category with given id was not found");
  res.send(student);
});

router.get("/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student)
    return res.status(404).send("the category with given id was not found");
  res.send(student);
});

module.exports = router;
