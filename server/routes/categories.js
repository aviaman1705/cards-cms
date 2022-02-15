const express = require("express");
const _ = require("lodash");
const { Category, validateCategory } = require("../models/category");
const { User, Faveorite } = require("../models/user");
const auth = require("../middleware/auth");
const router = express.Router();

//create category
router.post("/", auth, async (req, res) => {
  const { error } = validateCategory(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let category = new Category({
    title: req.body.title,
  });

  category = await category.save();
  res.send(category);
});

//get category
router.get("/:id", async (req, res) => {
  const category = await Category.findOne({
    _id: req.params.id,
  });

  if (!category) {
    return res
      .status(404)
      .send("The category with the given ID was not found.");
  }

  res.send(category);
});

//get categoris
router.get("/", async (req, res) => {
  const categories = await Category.find({});

  if (!categories) {
    return res.status(404).send("The is no categories.");
  }
  res.send(categories);
});

//edit category
router.put("/:id", auth, async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let category = await Category.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      useFindAndModify: false,
    }
  );

  if (!category) {
    return res
      .status(404)
      .send("The category with the given ID was not found.");
  }

  category = await Category.findOne({ _id: req.params.id });
  res.send(category);
});

//delete category
router.delete("/:id", auth, async (req, res) => {
  const category = await Category.findOneAndRemove({
    _id: req.params.id,
  });

  if (!category) {
    return res
      .status(404)
      .send("The category with the given ID was not found.");
  } else {
    res.status(200).send("The category was successfully deleted");
  }
});

module.exports = router;
