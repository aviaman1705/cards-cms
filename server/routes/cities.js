const express = require("express");
const _ = require("lodash");
const { City, validateCity } = require("../models/city");
const { User, Faveorite } = require("../models/user");
const auth = require("../middleware/auth");
const router = express.Router();

//create city
router.post("/", auth, async (req, res) => {
  const { error } = validateCity(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let city = new City({
    title: req.body.title,
  });

  city = await city.save();
  res.send(city);
});

//get city
router.get("/:id", auth, async (req, res) => {
  const city = await City.findOne({
    _id: req.params.id,
  });

  if (!city)
    return res.status(404).send("The city with the given ID was not found.");
  res.send(city);
});

//get cities
router.get("/", auth, async (req, res) => {
  const cities = await City.find({});

  if (!cities) return res.status(404).send("The is no cities.");
  res.send(cities);
});

//edit city
router.put("/:id", auth, async (req, res) => {
  const { error } = validateCity(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let city = await City.findOneAndUpdate({ _id: req.params.id }, req.body, {
    useFindAndModify: false,
  });

  if (!city) {
    return res.status(404).send("The city with the given ID was not found.");
  }

  city = await City.findOne({ _id: req.params.id });
  res.send(city);
});

//delete city
router.delete("/:id", auth, async (req, res) => {
  const city = await City.findOneAndRemove({
    _id: req.params.id,
  });

  if (!city) {
    return res.status(404).send("The city with the given ID was not found.");
  } else {
    res.status(200).send("The city was successfully deleted");
  }
});

module.exports = router;
