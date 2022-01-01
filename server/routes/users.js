const express = require("express");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const { User, Faveorite, validate, validateCards } = require("../models/user");
const { Card } = require("../models/card");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");
const router = express.Router();

const getCards = async (cardsArray) => {
  const cards = await Card.find({ bizNumber: { $in: cardsArray } });
  return cards;
};

//delete user faveorite acrd
router.delete("/deleteFaveorite/:id", auth, async (req, res) => {
  const faveoriteCard = await Faveorite.findOneAndRemove(
    {
      card_id: mongoose.Types.ObjectId(req.params.id),
      user_id: mongoose.Types.ObjectId(req.user._id),
    },
    { useFindAndModify: false }
  );

  if (!faveoriteCard)
    return res.status(404).send("The card with the given ID was not found.");
  res.send(faveoriteCard);
});

//get users cards
router.get("/cards", auth, async (req, res) => {
  if (!req.query.numbers) res.status(400).send("Missing numbers data");

  let data = {};
  data.cards = req.query.numbers.split(",");

  const cards = await getCards(data.cards);
  res.send(cards);
});

//update users cards
router.patch("/cards", auth, async (req, res) => {
  const { error } = validateCards(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const cards = await getCards(req.body.cards);
  if (cards.length != req.body.cards.length)
    res.status(400).send("Card numbers don't match");

  let user = await User.findById(req.user._id);
  user.cards = req.body.cards;
  user = await user.save();
  res.send(user);
});

//get user details
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

//get users cards
router.get("/mecards", auth, async (req, res) => {
  const cards = await Card.find({ user_id: req.user._id });
  res.send(cards);
});

//get user favorites cards
router.get("/favorites", auth, async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send("User does'nt exists.");

  const favorites = await Faveorite.find({ user_id: user._id });
  let cards;

  if (!favorites) {
    cards = await Card.find({ user_id: req.user._id });
  } else {
    let favoritesIds = favorites.map((card) => card.card_id);
    cards = await Card.find({
      _id: { $in: favoritesIds },
    });
  }

  if (!cards) return res.status(404).send("The is no cards.");
  res.send(cards);
});

//create user
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(
    _.pick(req.body, ["name", "email", "password", "biz", "cards"])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ["_id", "name", "email"]));
});

//create faveorite card
router.post("/addFaveoriteCard", auth, async (req, res) => {
  const card = await Card.findOne({ bizNumber: req.body.bizNumber });
  if (!card) res.status(400).send("Card doesn't exists");

  let user = await User.findById(req.user._id);
  if (!user) res.status(400).send("user doesn't exists");

  let faveorite = new Faveorite({
    bizNumber: card.bizNumber,
    card_id: card._id,
    user_id: req.user._id,
  });

  faveorite = await faveorite.save();

  let faveoriteCard = await Card.findOne({
    _id: card._id,
  });

  res.send(faveoriteCard);
});

module.exports = router;
