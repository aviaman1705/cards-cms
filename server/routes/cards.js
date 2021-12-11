const express = require("express");
const _ = require("lodash");
const { Card, validateCard, generateBizNumber } = require("../models/card");
const { User, Faveorite } = require("../models/user");
const auth = require("../middleware/auth");
const router = express.Router();

//delete card
router.delete("/:id", auth, async (req, res) => {
  const favorities = await Faveorite.findOneAndRemove({
    card_id: req.params.id,
  });

  const card = await Card.findOneAndRemove({
    _id: req.params.id,
    user_id: req.user._id,
  });

  if (!card) {
    return res.status(404).send("The card with the given ID was not found.");
  } else {
    res.status(200).send("The card was successfully deleted");
  }
});

//edit card
router.put("/:id", auth, async (req, res) => {
  const { error } = validateCard(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let card = await Card.findOneAndUpdate(
    { _id: req.params.id, user_id: req.user._id },
    req.body
  );
  if (!card)
    return res.status(404).send("The card with the given ID was not found.");

  card = await Card.findOne({ _id: req.params.id, user_id: req.user._id });
  res.send(card);
});

//get cards without user cards
router.get("/favorites", auth, async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send("User does'nt exists.");

  const favorites = await Faveorite.find({ user_id: req.user._id });
  let cards;

  if (!favorites) {
    return res.status(404).send("The is no favorites cards.");
  } else {
    let favoritesIds = favorites.map((card) => card.card_id);

    cards = await Card.find({
      user_id: { $ne: req.user._id },
      _id: { $nin: favoritesIds },
    });
  }

  if (!cards) return res.status(404).send("The is no cards.");
  res.send(cards);
});

//get card
router.get("/:id", auth, async (req, res) => {
  const card = await Card.findOne({
    _id: req.params.id,
    user_id: req.user._id,
  });
  if (!card)
    return res.status(404).send("The card with the given ID was not found.");
  res.send(card);
});

//search cards
router.get("/search/:key", auth, async (req, res) => {
  const favorites = await Faveorite.find({ user_id: req.user._id });
  let favoritesIds = favorites.map((card) => card.card_id);

  const card = await Card.find({
    user_id: { $ne: req.user._id },
    $or: [
      { bizName: { $regex: ".*" + req.params.key + ".*", $options: "i" } },
      {
        bizDescription: { $regex: ".*" + req.params.key + ".*", $options: "i" },
      },
    ],
    _id: { $nin: favoritesIds },
  });

  if (!card)
    return res.status(404).send("The card with the given ID was not found.");
  res.send(card);
});

//create card
router.post("/", auth, async (req, res) => {
  const { error } = validateCard(req.body);
  console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  let card = new Card({
    bizName: req.body.bizName,
    bizDescription: req.body.bizDescription,
    bizAddress: req.body.bizAddress,
    bizPhone: req.body.bizPhone,
    bizImage: req.body.bizImage
      ? req.body.bizImage
      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    bizNumber: await generateBizNumber(Card),
    user_id: req.user._id,
  });

  post = await card.save();
  res.send(post);
});

module.exports = router;
