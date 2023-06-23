const express = require("express");
const {Category,validate}=require('../models/categoriesModels')
const router = express.Router();


// const categories = [

//     { id: 1, name: "Web" },
//     { id: 2, name: "Mobile" },
//     { id: 3, name: "Photography" },
//   ];

router.get("/", async (req, res) => {
  let categories = await Category.find();
  res.send(categories);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);
  const category = new Category({
    // id: categories.length + 1,
    name: req.body.name,
  });
  // categories.push(category);
  await category.save();
  res.send(category);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  // const category = categories.find(c => c.id === parseInt(req.params.id));
  if (!category)
    return res.status(404).send("the category with given id was not found");
  // category.name = req.body.name;
  res.send(category);
});

router.delete("/:id", async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);
  if (!category)
    return res.status(404).send("the category with given id was not found");
  res.send(category);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category)
    return res.status(404).send("the category with given id was not found");
  res.send(category);
});

module.exports = router;
