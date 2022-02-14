const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const _ = require("lodash");

const citySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
});

const City = mongoose.model("City", citySchema);

function validateCity(city) {
  const schema = Joi.object({
    title: Joi.string().min(2).max(255).required(),
  });

  return schema.validate(city);
}

exports.City = City;
exports.validateCity = validateCity;
